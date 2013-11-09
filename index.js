/// LZMA-JS
/// Nathan Rugg
/// 2013
/// MIT

///NOTE: This returns a function for backwards compatibility's sake.
module.exports.LZMA = function LZMA()
{
    return require("./src/lzma_worker.js").LZMA;
}
