import {
    action_compress,
    action_decompress,
    compress,
    decompress,
    LZMA
} from './lzma-algo.js';

export {
    compress,
    decompress,
    LZMA
}

LZMA["compress"] = compress;
LZMA["decompress"] = decompress;
LZMA.prototype["compress"] = compress;
LZMA.prototype["decompress"] = decompress;

if (typeof self != "undefined" && 'importScripts' in self) {
    addEventListener("message", function (e) {
        if (e["data"]["action"] == action_decompress) {
            LZMA.decompress(e.data["data"], e["data"]["cbn"]);
        } else if (e["data"]["action"] == action_compress) {
            LZMA.compress(e["data"]["data"], e["data"]["mode"], e["data"]["cbn"]);
        }
    })
}
