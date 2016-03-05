var lzma = require(".."); /// Use "lzma" after installing via `npm i lzma`.
var compression_level = process.argv[3] || 1;
var compressed = lzma.compress(process.argv[2] || "Hello, world.", compression_level);
var decompressed = lzma.decompress(compressed);
console.log(compressed);
console.log(decompressed);
