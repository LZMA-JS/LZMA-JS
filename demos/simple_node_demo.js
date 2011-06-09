/// Usage: $ node simple_node_demo.js [text]

var LZMA = require("../src/lzma.js").LZMA(),
    compress_me = (process.argv[2] || "Hello, world."),
    compression_mode = 1;

/// First, let's compress it.
LZMA.compress(compress_me, compression_mode, function (result) {
    console.log("Compressed: " + result);
    
    /// Now, let's try to decompress it to make sure it works both ways.
    LZMA.decompress(result, function (result) {
        console.log("Decompressed: " + result);
    }, function (percent) {
        /// Decompressing progress code goes here.
        console.log("Decompressing: " + (percent * 100) + "%");
    });
}, function (percent) {
    /// Compressing progress code goes here.
    console.log("Compressing: " + (percent * 100) + "%");
});
