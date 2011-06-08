var LZMA = require("../src/lzma.js").LZMA();

var compress_me = "Hello, world."

/// First, let's compress it.
LZMA.compress(compress_me, 1, function (result) {
    console.log("Compressed: " + result);
    
    /// Now, let's try to decompress it to make sure it works both ways.
    LZMA.decompress(result, function (result) {
        console.log("Decompressed: " + result);
    }, function (progress) {
        /// Decompressing progress code goes here.
        console.log("Decompressing: " + (progress * 100) + "%");
    });
}, function (progress) {
    /// Compressing progress code goes here.
    console.log("Compressing: " + (progress * 100) + "%");
});