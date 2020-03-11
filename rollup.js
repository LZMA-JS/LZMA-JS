const fs = require("fs");
const rollup = require("rollup");
const replace = require("@rollup/plugin-replace");
const Terser = require("terser");
const TerserPlugin = require("rollup-plugin-terser").terser;
const umdFooter = "var LZMA = this.LZMA.LZMA; var LZMA_WORKER = LZMA;";
const umdModuleName = "LZMA";

module.exports.minify = function minify() {
    const result = Terser.minify({
        "lzma.js": fs.readFileSync("src/lzma.js", "utf8")
    },
    {
        sourceMap: {
            filename: "lzma-min.js",
            url: "lzma-min.js.map"
        }
    });
    fs.writeFileSync("src/lzma-min.js", result.code);
    fs.writeFileSync("src/lzma-min.js.map", result.map);

    return Promise.all(["lzma_worker", "lzma-c", "lzma-d"].map(function (name) {
        const replaceOpts = (function () {
            if (name === "lzma-d") {
                return {
                    "var CrcTable = ": "false &&",
                    "var g_FastPos = ": "false &&",
                    "var ProbPrices = ": "false &&",
                    "var get_mode_obj = ": "false &&",
                    delimiters: ['', '']
                }
            } else {
                return {}
            }
        })();

        return rollup.rollup({
            input: `src/${name}.mjs`,
            plugins: [replace(replaceOpts)]
        }).then(function (bundle) {
            return bundle.write({
                format: "umd",
                file: `src/${name}.js`,
                footer: umdFooter,
                name: umdModuleName,
                sourcemap: true
            })
        }).then(function () {
            return rollup.rollup({
                input: `src/${name}.mjs`,
                plugins: [
                    replace(replaceOpts),
                    TerserPlugin({
                        compress: {
                            unsafe: true,
                            unsafe_comps: true,
                            pure_getters: true
                        },
                        mangle: {
                            toplevel: true,
                            reserved: ["LZMA", "LZMA_WORKER", "compress", "decompress"],
                            properties: {
                                regex: /^(?!LZMA|(de)?compress|data|mode|cbn)/
                            }
                        }
                    })
                ]
            }).then(function (bundle) {
                return Promise.all([
                    bundle.write({
                        format: "umd",
                        file: `src/${name}-min.js`,
                        footer: umdFooter,
                        name: umdModuleName,
                        sourcemap: true
                    }),
                    bundle.write({
                        format: "esm",
                        file: `src/${name}-min.mjs`,
                        sourcemap: true
                    })
                ]);
            });
        });
    }));
}