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

function calculate_minify_value(params)
{
    Object.keys(params).forEach(function oneach(param)
    {
        params[param] = param.length * params[param];
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

function minify_parameters(code)
{
    var params = {},
        ignore = ["LZMA_WORKER", "callback_num", "on_progress", "on_finish"],
        sorted_params,
        new_names,
        prop_regex = /\.([_$a-zA-Z]*[_$][_$a-zA-Z0-9]*|kFixHashSize|kNumHashDirectBytes|kMinMatchCheck|outBytesProcessed|decoder|encoder|nowPos64|outSize|alive|processedInSize|finished|inBytesProcessed|processedInSize|[Ss]tate|prevByte|Prev1IsChar|Prev2|BackPrev|PosPrev|Models|backRes|properties|processedOutSize|tempPrices|backRes|repLens|Price|Backs[0123]|NumBitLevels|Range|Stream|explicitLength|count|pos|buf|chunker|rep[0-3s]|Code|Low|data|mode|output)/g;
    
    /// We want to replace parameters that have an underscore or a dollar sign.
    code.replace(prop_regex, function calc(param)
    {
        param = param.substr(1);
        if (ignore.indexOf(param) === -1) {
            if (!params[param]) {
                params[param] = 1;
            } else {
                params[param] += 1;
            }
        }
    });
    
    //console.log(params);
    //console.log(Object.keys(params).length);
    calculate_minify_value(params);
    sorted_params = sort_obj(params);
    
    //console.log(params);
    //console.log(sorted_params);
    /*
    sorted_params.forEach(function (param)
    {
        console.log(param, params[param])
    });
    */
    new_names = base54_64(sorted_params);
    /*
    sorted_params.forEach(function (param, i)
    {
        console.log(param, params[param], new_names[i])
    });
    */
    
    code = code.replace(prop_regex, function calc(param)
    {
        var index,
            partial_param = param.substr(1);
        index = sorted_params.indexOf(partial_param);
        //console.log(param, index);
        if (index > -1) {
            return "." + new_names[index];
        }
        return param;
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
        mangle: true,
        compress: {
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            loops: true,
            if_return: true,
            join_vars: true,
        }
    });
    
    if (file === "lzma_worker.js") {
        result.code = minify_parameters(result.code);
    }
    
    fs.writeFileSync(min_path, result.code);
    
    min_size = filesize(min_path);
    
    console.log("Original size: " + orig_size + " bytes");
    console.log("Minified size: " + min_size + " bytes");
    console.log("Compression:   " + (orig_size / min_size).toFixed(4) + " x smaller");
    console.log("");
});
