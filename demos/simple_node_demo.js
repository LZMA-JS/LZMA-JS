/// Usage: $ node simple_node_demo.js [text]

///NOTE: You can install LZMA.JS via npm with this command: $ npm install lzma
///      Then you can load the code with the following code: var my_lzma = require("lzma").LZMA();
var my_lzma = require("../src/lzma.js").LZMA(),
    compress_me = (process.argv[2] || "Hello, world."),
    compression_mode = 1;

/// First, let's compress it.
my_lzma.compress(compress_me, compression_mode, function (result) {
    console.log("Compressed: " + result);
    
    /// Now, let's try to decompress it to make sure it works both ways.
    my_lzma.decompress(result, function (result) {
        console.log("Decompressed: " + result);
    }, function (percent) {
        /// Decompressing progress code goes here.
        console.log("Decompressing: " + (percent * 100) + "%");
    });
}, function (percent) {
    /// Compressing progress code goes here.
    console.log("Compressing: " + (percent * 100) + "%");
});
