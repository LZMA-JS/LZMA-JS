var uglify = require("uglify-js"),
    fs = require("fs"),
    p = require("path"),
    zlib = require("zlib"),
    files = [
        "lzma_worker.js",
        "lzma-c.js",
        "lzma-d.js",
        "lzma.js",
    ],
    minify_props_files = [
         "lzma_worker.js",
         "lzma-c.js",
         "lzma-d.js",
    ];

function filesize(path, cb)
{
    return fs.statSync(path).size;
}

function sort_obj(obj)
{
    return Object.keys(obj).sort(function sorter(a, b)
    {
        return obj[b] - obj[a];
    });
}

function calculate_minify_value(props)
{
    Object.keys(props).forEach(function oneach(prop)
    {
        props[prop] = prop.length * props[prop];
    });
}

function base54_64(arr)
{
    var chars = "_$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        i,
        len = arr.length,
        new_names = [],
        str,
        pos,
        base;
    
    for (i = 0; i < len; i += 1) {
        pos = i;
        str = "";
        base = 54;
        do {
            ///NOTE: This is not perfect. It skips the first char (_) on the last place when more than one letter.
            str += chars[pos % base];
            pos = Math.floor(pos / base);
            /// After the first character, we can use numbers.
            base = 64;
        } while (pos > 0);
        new_names[i] = str;
    }
    
    return new_names;
}

function minify_properties(code)
{
    var props = {},
        ignore = ["LZMA_WORKER", "callback_num", "on_progress", "on_finish"],
        sorted_props,
        new_names,
        prop_regex = /\.([_$a-zA-Z]*[_$][_$a-zA-Z0-9]*|kFixHashSize|kNumHashDirectBytes|kMinMatchCheck|outBytesProcessed|decoder|encoder|nowPos64|outSize|alive|processedInSize|finished|inBytesProcessed|processedInSize|[Ss]tate|prevByte|Prev1IsChar|Prev2|BackPrev|PosPrev|Models|backRes|properties|processedOutSize|tempPrices|backRes|repLens|Price|Backs[0123]|NumBitLevels|Range|Stream|explicitLength|count|pos|buf|chunker|rep[0-3s]|Code|Low|data|mode|output)/g;
    
    /// We want to replace propeters that have an underscore or a dollar sign.
    code.replace(prop_regex, function calc(prop)
    {
        prop = prop.substr(1); /// Remove the perios.
        if (ignore.indexOf(prop) === -1) {
            if (!props[prop]) {
                props[prop] = 1;
            } else {
                props[prop] += 1;
            }
        }
    });
    
    calculate_minify_value(props);
    sorted_props = sort_obj(props);
    
    new_names = base54_64(sorted_props);
    
    code = code.replace(prop_regex, function calc(prop)
    {
        var index,
            partial_prop = prop.substr(1); /// Remove the perios.
        
        index = sorted_props.indexOf(partial_prop);
        
        if (index > -1) {
            return "." + new_names[index];
        }
        return prop;
    });
    
    return code;
}


(function loop(i)
{
    var file,
        full_path,
        min_path,
        result,
        orig_size,
        min_size,
        gzmin_size,
        ext;
    
    if (i < files.length) {
        file = files[i];
        ext = p.extname(file);
        full_path = p.join(__dirname, "src", file);
        min_path = p.join(__dirname, "src", p.basename(file, ext) + "-min" + ext);
        orig_size = filesize(full_path);
        
        console.log(file);
        
        result = uglify.minify(full_path, {
            mangle: {
                sort:     false, /// As FALSE, the plain JS is bigger, but gzipped is smaller!
                toplevel: true,
            },
            compress: {
                sequences:    true,
                dead_code:    true,
                conditionals: true,
                booleans:     true,
                unused:       true,
                loops:        true,
                if_return:    true,
                join_vars:    true,
                pure_getters: true,
                cascade:      true,
                join_vars:    true,
                evaluate:     true,
                comparisons:  true,
                properties:   true,
                negate_iife:  true,
                keep_fargs:   false,
                hoist_vars:   false, /// As FALSE, the plain JS is bigger, but gzipped is smaller!
                hoist_funs:   true, /// As TRUE, the plain JS is bigger, but gzipped is smaller!
                warnings:     true,
                unsafe:       true,
            },
            output: {
                comments: /^!|@preserve|@license|@cc_on/i,
            },
        });
        
        if (minify_props_files.indexOf(file) > -1) {
            result.code = minify_properties(result.code);
        }
        
        fs.writeFileSync(min_path, result.code);
        
        min_size = filesize(min_path);
        
        console.log("Original size: " + orig_size + " bytes");
        console.log("Minified size: " + min_size + " bytes");
        console.log("Compression:   " + (orig_size / min_size).toFixed(4) + " x smaller");
        
        zlib.gzip(result.code, function(err, buffer) {
            if (err) {
                throw err;
            }
            
            gzmin_size = buffer.length;
            
            ///NOTE: We could write the file if we wanted to like this: fs.writeFileSync(p.join(__dirname, "src", p.basename(file, ext) + "-min" + ext + ".gz"), buffer);
            console.log("Gzipped size:  " + gzmin_size + " bytes");
            console.log("gzipped ratio: " + (orig_size / gzmin_size).toFixed(4) + " x smaller");
            console.log("");
            loop(i + 1);
        });
    }
}(0));
