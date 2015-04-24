// jshint bitwise:true, curly:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, noempty:true, nonew:true, onevar:true, plusplus:true, quotmark:double, strict:true, undef:true, unused:strict, node:true

"use strict";

/// Usage: node test-node.js [unmin]
///
/// Add "unmin" to test the unminified code.
///

var all_tests_pass = true,
    fs = require("fs"),
    p = require("path"),
    my_lzma,
    lzma_norm = require("../src/lzma_worker" + (process.argv[2] === "unmin" ? "" : "-min") + ".js").LZMA,
    lzma_sep = {
        decompress: require("../src/lzma-d" + (process.argv[2] === "unmin" ? "" : "-min") + ".js").LZMA.decompress,
        compress:   require("../src/lzma-c" + (process.argv[2] === "unmin" ? "" : "-min") + ".js").LZMA.compress,
    },
    path_to_files = "files";

function announce(str)
{
    var stars = "****",
        i;
    
    for (i = str.length - 1; i >= 0; i -= 1) {
        stars += "*";
    }
    
    console.log(stars);
    console.log("* "+ str + " *");
    console.log(stars);
}

function display_result(str, pass)
{
    ///NOTE: \u001B[32m makes green text.
    ///      \u001B[31m makes red text.
    ///      \u001B[0m  resets the text color.
    console.log("\u001B[3" + (pass ? "2" : "1") + "m" + str + "\u001B[0m");
}

function progress(percent)
{
    if (process.stdout.isTTY) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        if (percent > 0 && percent < 1) {
            process.stdout.write((percent * 100).toFixed(2) + "%");
        }
    }
}

function decompression_test(compressed_file, correct_filename, next)
{
    fs.readFile(correct_filename, function (err, correct_buffer)
    {
        
        if (err) {
            console.log("Cannot open " + correct_filename);
            throw new Error(err);
        }
        
        fs.readFile(compressed_file, function (err, buffer)
        {
            var deco_start;
            
            if (err) {
                throw err;
            }
            
            deco_start = (new Date()).getTime();
            try {
                my_lzma.decompress(buffer, function (result)
                {
                    var deco_speed = (new Date()).getTime() - deco_start,
                        correct_result,
                        is_correct;
                    
                    console.log("Decompressed size:", result.length);
                    
                    if (typeof result === "string") {
                        correct_result = correct_buffer.toString();
                        is_correct = correct_result === result
                    } else {
                        is_correct = correct_buffer.equals(new Buffer(result))
                    }
                    
                    if (is_correct) {
                        display_result("Test passed", true);
                    } else {
                        display_result("ERROR: files do not match!", false);
                        console.log();
                        all_tests_pass = false;
                    }
                    
                    console.log("Decompression time:", deco_speed);
                    
                    console.log();
                    next();
                }, progress);
            } catch (e) {
                if (p.basename(correct_filename) === "error-" + e.message) {
                    display_result("Test passed", true);
                    console.log("threw correct error: " + e.message);
                } else {
                    display_result("ERROR: " + e.message, false);
                    all_tests_pass = false;
                }
                console.log();
                next();
            }
        });
    });
}

function compression_test(file, next)
{
    fs.readFile(file, function (err, content)
    {
        var comp_start = (new Date()).getTime(),
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
        
        //console.log(content)
        match = p.basename(file, p.extname(file)).match(/^level[ _](\d)/i);
        
        if (match) {
            compression_mode = Number(match[1]) || 1;
        }
        console.log("     Initial size:", content.length);
        my_lzma.compress(buf || content, compression_mode, function ondone(compressed_result)
        {
            var comp_speed = (new Date()).getTime() - comp_start,
                deco_start;
            
            console.log("  Compressed size:", compressed_result.length);
            fs.writeFileSync("file.lzma", new Buffer(compressed_result))
            deco_start = (new Date()).getTime();
            my_lzma.decompress(compressed_result, function (decompressed_result)
            {
                var deco_speed = (new Date()).getTime() - deco_start;
                console.log("Decompressed size:", decompressed_result.length);
                var dbuf = new Buffer(decompressed_result);
                
                if (typeof content === "string" ? content === decompressed_result : content.equals(dbuf)) {
                //if (content === result) {
                    display_result("Test passed", true);
                } else {
                    display_result("ERROR: files do not match!", false);
                    //console.log();
                    all_tests_pass = false;
                    //console.log(JSON.stringify(content.toJSON()))
                    //console.log(content.toString())
                    //console.log(" --- ");
                    //console.log(dbuf.toString())
                    //console.log(JSON.stringify(dbuf.toJSON()))
                    //process.exit();
                }
                
                console.log("  Compression time:", comp_speed);
                console.log("Decompression time:", deco_speed);
                
                console.log();
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
            
            console.log(file);
            
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

(function ()
{
    if (!(new Buffer(0)).equals) {
        Buffer.prototype.equals = function equals(b)
        {
            var i;
            //console.log("comparing")
            //console.log(this)
            //console.log(b)
            //console.log(this.toJSON())
            //console.log(b.toJSON())
            if (!Buffer.isBuffer(b)) {
                return;
            }
            if (this.length !== b.length) {
                console.log("BAD LENGTH:", this.length, "!==", b.length)
                return false;
            }
            
            for (i = this.length - 1; i >= 0; --i) {
                if (this[i] !== b[i]) {
                    console.log("BAD VAL:", this[i], "!==", b[i])
                    return false;
                }
            }
            
            return true;
        };
    }
}());


path_to_files = p.join(__dirname, path_to_files);

my_lzma = lzma_norm;

announce("Testing lzma_worker" + (process.argv[2] === "unmin" ? "" : "-min") + ".js");
run_tests(function (tests_passed_norm)
{
    if (!tests_passed_norm) {
        /// Fail.
        process.exit(1);
    }
    
    if (process.argv[2] === "nosep" || process.argv[3] === "nosep") {
        process.exit();
    }
    
    console.log("");
    announce("Testing lzma-c" + (process.argv[2] === "unmin" ? "" : "-min") + ".js and lzma-d" + (process.argv[2] === "unmin" ? "" : "-min") + ".js");
    my_lzma = lzma_sep;
    
    run_tests(function (tests_passed_sep)
    {
        if (!tests_passed_sep) {
            /// Fail.
            process.exit(1);
        }
    });
});
