var uglify = require("uglify-js"),
    fs = require("fs"),
    p = require("path"),
    files = [
        "lzma_worker.js",
        "lzma.js",
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
        prop = prop.substr(1);
        if (ignore.indexOf(prop) === -1) {
            if (!props[prop]) {
                props[prop] = 1;
            } else {
                props[prop] += 1;
            }
        }
    });
    
    //console.log(props);
    //console.log(Object.keys(props).length);
    calculate_minify_value(props);
    sorted_props = sort_obj(props);
    
    //console.log(props);
    //console.log(sorted_props);
    /*
    sorted_props.forEach(function (prop)
    {
        console.log(prop, props[prop])
    });
    */
    new_names = base54_64(sorted_props);
    /*
    sorted_props.forEach(function (prop, i)
    {
        console.log(prop, props[prop], new_names[i])
    });
    */
    
    code = code.replace(prop_regex, function calc(prop)
    {
        var index,
            partial_prop = prop.substr(1);
        index = sorted_props.indexOf(partial_prop);
        //console.log(prop, index);
        if (index > -1) {
            return "." + new_names[index];
        }
        return prop;
    });
    
    return code;
}


files.forEach(function oneach(file)
{
    var full_path = p.join(__dirname, "src", file),
        min_path = p.join(__dirname, "src", p.basename(file, p.extname(file)) + "-min" + p.extname(file)),
        result,
        orig_size = filesize(full_path),
        min_size;
    
    console.log(file);
    
    result = uglify.minify(full_path, {
        mangle: {
            sort: false, /// As FALSE, the plain JS is bigger, but gzipped is smaller!
            toplevel: true,
        },
        comments: true,
        compress: {
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            loops: true,
            if_return: true,
            join_vars: true,
            pure_getters: true,
            cascade: true,
            join_vars: true,
            evaluate: true,
            comparisons: true,
            properties: true,
            negate_iife: true,
            keep_fargs: false,
            hoist_vars: false, /// As FALSE, the plain JS is bigger, but gzipped is smaller!
            hoist_funs: true, /// As TRUE, the plain JS is bigger, but gzipped is smaller!
            warnings: true,
            unsafe: true,
        },
        output: {
            comments: /^!|@preserve|@license|@cc_on/i,
        },
    });
    
    if (file === "lzma_worker.js") {
        result.code = minify_properties(result.code);
    }
    
    fs.writeFileSync(min_path, result.code);
    
    min_size = filesize(min_path);
    
    console.log("Original size: " + orig_size + " bytes");
    console.log("Minified size: " + min_size + " bytes");
    console.log("Compression:   " + (orig_size / min_size).toFixed(4) + " x smaller");
    console.log("");
});
