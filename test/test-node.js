"use strict";

var all_tests_pass = true,
    fs = require("fs"),
    path = require("path"),
    my_lzma = require("../src/lzma.js").LZMA(),
    
    compression_mode = process.argv[2] || 1,
    path_to_files = "files";

function display_result(str, pass) {
    ///NOTE: \033[32m makes green text.
    ///      \033[31m makes red text.
    ///      \033[0m  resets the text color.
    console.log("\u001B[3" + (pass ? "2" : "1") + "m" + str + "\u001B[0m");
}

function decompression_test(content, correct_filename, next)
{
    console.log("TODO: test against " + correct_filename)
    next();
}

function compression_test(content, next)
{
    var comp_start = (new Date).getTime();
    console.log("     Initial size:", content.length);
    my_lzma.compress(content, compression_mode, function (result) {
        var comp_speed = (new Date).getTime() - comp_start,
            deco_start;
        console.log("  Compressed size:", result.length);
        
        deco_start = (new Date).getTime();
        my_lzma.decompress(result, function (result) {
            var deco_speed = (new Date).getTime() - deco_start;
            console.log("Decompressed size:", result.length);
            
            if (content !== result) {
                display_result("ERROR: files do not match!", false);
                console.log();
                all_tests_pass = false;
            } else {
                display_result("Test passed", true);
            }
            
            console.log("  Compression time:", comp_speed);
            console.log("Decompression time:", deco_speed);
            
            console.log();
            next();
        });
    });
}

fs.readdir(path_to_files, function (err, files) {
    var file_count = files.length,
        run_test;
    
    if (err) {
        throw err;
    }
    
    (function run_test(i) {
        var file;
        if (i >= file_count) {
            if (all_tests_pass) {
                display_result("All tests completed sucessfully", true);
            } else {
                display_result("An error was detected!", false);
            }
            return;
        }
        file = files[i];
        
        ///TODO: Preform a decompress test on *.lzma files.
        console.log("File:", file);
        fs.readFile(path.join(path_to_files, file), "utf8", function (err, content) {
            if (err) {
                throw err;
            }
            
            if (file.slice(-5) === ".lzma") {
                /// Preform a decompress test on *.lzma files.
                decompression_test(content, path.join(path_to_files, file.slice(0, -5)), function next()
                {
                    run_test(i + 1);
                });
            } else {
                /// Preform a compression/decompression test.
                compression_test(content, function next()
                {
                    run_test(i + 1);
                });
            }
        });
    }(0));
});
