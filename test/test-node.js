// jshint bitwise:true, curly:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, noempty:true, nonew:true, onevar:true, plusplus:true, quotmark:double, strict:true, undef:true, unused:strict, node:true

"use strict";

/// Usage: node test-node.js [FLAGS] [TESTS]
///
/// FLAGS:
///
/// --unmin    Test the unminified code.
/// --nosep    Don't test the seperate (de)compression modules.
/// --nolarge  Skip large files (they can take a long time).
/// --decOnly  Skip compression tests.
/// --comOnly  Skip decompression tests.
///
/// TESTS:
///
/// The basename of any file in the "tests/file" directory.
/// Any number of tests can be listed.
///

var all_tests_pass = true;
var fs = require("fs");
var p = require("path");
var params = get_params();
var my_lzma;
var lzma_norm = require("../src/lzma_worker" + (params.unmin ? "" : "-min") + ".js").LZMA;
var path_to_files = "files";
var isTTY = process.stdout.isTTY;
var total_time;

function get_hrtime(start)
{
    var diff;
    if (start) {
        diff = process.hrtime(start);
        return  (diff[0] * 1e9 + diff[1]) / 1000000;
    }
    return process.hrtime();
}

function get_params(argv)
{
    var i,
        params = {};
    
    argv = argv || process.argv;
    
    for (i = process.argv.length - 1; i >= 2; i -= 1) {
        if (process.argv[i][0] === "-") {
            params[process.argv[i].replace(/^-+/, "")] = 1;
        } else {
            if (!params.tests) {
                params.tests = [];
            }
            params.tests.push(process.argv[i]);
        }
    }
    
    return params;
}

function announce(str)
{
    var stars = "****",
        i;
    
    for (i = str.length - 1; i >= 0; i -= 1) {
        stars += "*";
    }
    
    note(stars);
    note("* "+ str + " *");
    note(stars);
}

function color(color_code, str)
{
    if (isTTY) {
        str = "\u001B[" + color_code + "m" + str + "\u001B[0m";
    }
    
    console.log(str);
}

function note(str)
{
    color(36, str);
}

function good(str)
{
    color(32, str);
}

function warn(str)
{
    color(33, str);
}

function error(str)
{
    color(31, str);
}


function display_result(str, pass)
{
    if (pass) {
        good(str)
    } else {
        error(str)
    }
}

function progress(percent)
{
    if (isTTY) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        if (percent > 0 && percent < 1) {
            process.stdout.write((percent * 100).toFixed(2) + "%");
        }
    }
}

function decompression_test(compressed_file, correct_filename, next)
{
    var basename = p.basename(compressed_file);
    
    if (params.tests && params.tests.indexOf(basename) === -1) {
        return next();
    }
    
    note(basename);
    
    if (params.nolarge && basename.indexOf("large-") === 0) {
        warn("Skipping large file.");
        return next();
    }
    if (params.comOnly) {
        warn("Skipping decompression test.");
        return next();
    }
    fs.readFile(correct_filename, function (err, correct_result)
    {
        
        if (err) {
            console.log("Cannot open " + correct_filename);
            throw new Error(err);
        }
        
        fs.readFile(compressed_file, function (err, buffer)
        {
            var deco_start,
                deco_speed;
            
            if (err) {
                throw err;
            }
            
            deco_start = get_hrtime();
            try {
                my_lzma.decompress(buffer, function (result)
                {
                    deco_speed = get_hrtime(deco_start);
                    
                    console.log("Decompressed size:", result.length + " bytes");
                    
                    if (typeof result === "string") {
                        correct_result = correct_result.toString();
                    }
                    
                    if (compare(correct_result, result)) {
                        display_result("Test passed", true);
                    } else {
                        display_result("ERROR: files do not match!", false);
                        all_tests_pass = false;
                    }
                    
                    console.log("Decompression time:", deco_speed + " ms");
                    
                    console.log("");
                    next();
                }, progress);
            } catch (e) {
                deco_speed = get_hrtime(deco_start);
                if (p.basename(correct_filename) === "error-" + e.message) {
                    display_result("Test passed", true);
                    console.log("threw correct error: " + e.message);
                } else {
                    display_result("ERROR: " + e.message, false);
                    all_tests_pass = false;
                }
                console.log("Decompression time:", deco_speed + " ms");
                console.log("");
                next();
            }
        });
    });
}

function compression_test(file, next)
{
    var basename = p.basename(file);
    
    if (params.tests && params.tests.indexOf(basename) === -1) {
        return next();
    }
    
    note(basename);
    
    var ext = p.extname(file).toLowerCase();
    if (params.nolarge && basename.indexOf("large-") === 0) {
        warn("Skipping large file.");
        return next();
    }
    if (params.decOnly) {
        warn("Skipping compression test.");
        return next();
    }
    fs.readFile(file, (ext === ".txt" ? "utf8" : null), function (err, content)
    {
        var comp_start = get_hrtime(),
            compression_mode = 1,
            match,
            buf;
        
        if (err) {
            throw err;
        }
        
        if (typeof content === "object") {
            buf = new Buffer(content.length);
            content.copy(buf);
        }
        
        match = p.basename(file, p.extname(file)).match(/^level[ _](\d)/i);
        
        if (match) {
            compression_mode = Number(match[1]) || 1;
        }
        console.log("     Initial size:", content.length + " bytes");
        my_lzma.compress(buf || content, compression_mode, function ondone(compressed_result)
        {
            var comp_speed = get_hrtime(comp_start),
                deco_start;
            
            console.log("  Compressed size:", compressed_result.length + " bytes");
            
            deco_start = get_hrtime();
            my_lzma.decompress(compressed_result, function (decompressed_result)
            {
                var deco_speed = get_hrtime(deco_start);
                console.log("Decompressed size:", decompressed_result.length + " bytes");
                
                if (typeof decompressed_result === "string") {
                    content = content.toString();
                }
                
                if (compare(content, decompressed_result)) {
                    display_result("Test passed", true);
                } else {
                    display_result("ERROR: files do not match!", false);
                    all_tests_pass = false;
                }
                
                console.log("  Compression time:", comp_speed + " ms");
                console.log("Decompression time:", deco_speed + " ms");
                
                console.log("");
                next();
            }, progress);
        }, progress);
    });
}

function run_tests(cb)
{
    fs.readdir(path_to_files, function (err, files)
    {
        var file_count = files.length;
        
        if (err) {
            throw err;
        }
        
        (function run_test(i)
        {
            var file;
            
            if (i >= file_count) {
                if (all_tests_pass) {
                    display_result("All tests completed sucessfully", true);
                } else {
                    display_result("An error was detected!", false);
                }
                
                return cb ? cb(all_tests_pass) : 0;
            }
            file = files[i];
            
            if (file.slice(-5) === ".lzma") {
                /// Preform a decompress test on *.lzma files.
                decompression_test(p.join(path_to_files, file), p.join(path_to_files, file.slice(0, -5)), function next()
                {
                    run_test(i + 1);
                });
            } else {
                /// Preform a compression/decompression test.
                compression_test(p.join(path_to_files, file), function next()
                {
                    run_test(i + 1);
                });
            }
        }(0));
    });
}

function compare(a, b)
{
    var i;
    
    if (typeof a !== typeof b) {
        error("BAD TYPES:", typeof a, "!==", typeof b)
        return false;
    }
    
    if (a.length !== b.length) {
        error("BAD LENGTH:", a.length, "!==", b.length)
        return false;
    }
    
    if (typeof a === "string") {
        return a === b;
    }
    
    if (Buffer.isBuffer(a) && !Buffer.isBuffer(b) && Array.isArray(b)) {
        b = new Buffer(b);
    } else if (Buffer.isBuffer(b) && !Buffer.isBuffer(a) && Array.isArray(a)) {
        a = new Buffer(a);
    }
    
    for (i = a.length - 1; i >= 0; --i) {
        if (a[i] !== b[i]) {
            error("BAD VAL (" + i + "):",  a[i], "!==", b[i])
            return false;
        }
    }
    
    return true;
}

function display_time()
{
    console.log("Total Time: " + get_hrtime(total_time) + " ms");
}

function help()
{
    console.log("");
    console.log("Usage: node test-node.js [FLAGS] [TESTS]");
    console.log("");
    console.log("FLAGS:");
    console.log("");
    console.log("  --unmin    Test the unminified code.");
    console.log("  --nosep    Don't test the seperate (de)compression modules.");
    console.log("  --nolarge  Skip large files (they can take a long time).");
    console.log("  --decOnly  Skip compression tests.");
    console.log("  --comOnly  Skip decompression tests.");
    console.log("");
    console.log("TESTS:");
    console.log("");
    console.log("The basename of any file in the \"tests/file\" directory.");
    console.log("Any number of tests can be listed.");
    console.log("");
    
    process.exit();
}

if (params.help) {
    help();
}

path_to_files = p.join(__dirname, path_to_files);

my_lzma = lzma_norm;

total_time = get_hrtime();

announce("Testing lzma_worker" + (params.unmin ? "" : "-min") + ".js");

run_tests(function (tests_passed_norm)
{
    if (!tests_passed_norm) {
        display_time();
        /// Fail
        process.exit(1);
    }
    
    if (params.nosep) {
        display_time();
        process.exit();
    }
    
    console.log("");
    announce("Testing lzma-c" + (params.unmin ? "" : "-min") + ".js and lzma-d" + (params.unmin ? "" : "-min") + ".js");
    
    my_lzma = {
        decompress: require("../src/lzma-d" + (params.unmin ? "" : "-min") + ".js").LZMA.decompress,
        compress:   require("../src/lzma-c" + (params.unmin ? "" : "-min") + ".js").LZMA.compress,
    };
    
    run_tests(function (tests_passed_sep)
    {
        display_time();
        if (!tests_passed_sep) {
            /// Fail
            process.exit(1);
        }
    });
});
