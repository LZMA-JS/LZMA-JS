import {
    action_decompress,
    decompress
} from './lzma_worker.js';

export {
    decompress
};

export function LZMA() {}

LZMA["decompress"] = decompress;
LZMA.prototype["decompress"] = decompress;

if (typeof self != "undefined" && 'importScripts' in self) {
    addEventListener("message", function (e) {
        if (e["data"]["action"] == action_decompress) {
            LZMA.decompress(e["data"]["data"], e["data"]["cbn"]);
        }
    })
}
