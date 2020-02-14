import {
    action_compress,
    compress,
    LZMA
} from './lzma_worker.js';

export {
    compress,
    LZMA
};

LZMA["compress"] = compress;
LZMA.prototype["compress"] = compress;

if (typeof self != "undefined" && 'importScripts' in self) {
    addEventListener("message", function (e) {
        if (e["data"]["action"] == action_compress) {
            LZMA.compress(e["data"]["data"], e["data"]["mode"], e["data"]["cbn"]);
        }
    })
}
