import { compress, action_compress } from "./lzma-algo";

export { compress };

export function LZMA() {}
LZMA["compress"] = compress;
LZMA.prototype["compress"] = compress;

export var LZMA_WORKER = LZMA;

if (typeof self != "undefined" && 'importScripts' in self) {
    addEventListener("message", function (e) {
        if (e["data"]["action"] == action_compress) {
            compress(e["data"]["data"], e["data"]["mode"], e["data"]["cbn"]);
        }
    });
}
