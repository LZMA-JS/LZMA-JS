/// LZMA-JS
/// Nathan Rugg
/// 2013
/// MIT

///NOTE: This returns a function for backwards compatibility's sake.
module.exports.LZMA = function LZMA(worker_path)
{
    return require(worker_path || "./src/lzma_worker.js").LZMA;
}
