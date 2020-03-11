import { compress, decompress, action_compress, action_decompress } from "./lzma-algo";

export { compress, decompress };

export var LZMA = function () {};
LZMA["compress"] = compress;
LZMA["decompress"] = decompress;
LZMA.prototype["compress"] = compress;
LZMA.prototype["decompress"] = decompress;

export var LZMA_WORKER = LZMA;

if (typeof self != "undefined" && 'importScripts' in self) {
    addEventListener("message", function (e) {
        if (e["data"]["action"] == action_compress) {
            compress(e.data["data"], e["data"]["mode"], e["data"]["cbn"]);
        } else if (e["data"]["action"] == action_decompress) {
            decompress(e["data"]["data"], e["data"]["cbn"]);
        }
    });
}