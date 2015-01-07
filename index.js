//! © 2015 Nathan Rugg <nmrugg@gmail.com> | MIT

var lzma;

function load_lzma()
{
    var p = require("path");
    
    ///NOTE: We can't use .join() because it will delete the leading dot slash, which node needs.
    return require("." + p.sep + "src" + p.sep + "lzma_worker.js").LZMA;
}

lzma = load_lzma();

///NOTE: This function is for backwards compatibility's sake.
module.exports.LZMA = function LZMA()
{
    return lzma;
}

module.exports.compress   = lzma.compress;
module.exports.decompress = lzma.decompress;
