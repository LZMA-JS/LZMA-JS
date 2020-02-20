import { decompress, action_decompress } from "./lzma-algo";

export { decompress };

export function LZMA() {}
LZMA["decompress"] = decompress;
LZMA.prototype["decompress"] = decompress;

export var LZMA_WORKER = LZMA;

if (typeof self != "undefined" && 'importScripts' in self) {
    addEventListener("message", function (e) {
        if (e["data"]["action"] == action_decompress) {
            decompress(e["data"]["data"], e["data"]["cbn"]);
        }
    });
}
