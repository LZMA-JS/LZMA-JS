var fs = require("fs"),
    path = require("path"),
    my_lzma = require("../src/lzma.js").LZMA(),
    
    compression_mode = process.argv[2] || 1,
    path_to_files = "files";

fs.readdir(path_to_files, function (err, files) {
    var all_tests_pass = true,
        file_count = files.length,
        run_test;
    
    function display_result(str, pass) {
        ///NOTE: \033[32m makes green text.
        ///      \033[31m makes red text.
        ///      \033[0m  resets the text color.
        console.log("\033[3" + (pass ? "2" : "1") + "m" + str + "\033[0m");
    }
    
    if (err) {
        throw err;
    }
    
    run_test = function (i) {
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
        fs.readFile(path.join(path_to_files, file), "utf8", function (erro, content) {
            var comp_start;
            
            if (err) {
                throw err;
            }
            
            console.log("     Initial size:", content.length);
            comp_start = (new Date).getTime();
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
                    run_test(i + 1);
                });
            });
        });
    };
    
    run_test(0);
});
