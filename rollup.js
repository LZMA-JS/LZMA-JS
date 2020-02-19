const rollup = require("rollup");
const terser = require("rollup-plugin-terser").terser;
const umdFooter = "var LZMA = this.LZMA.LZMA; var LZMA_WORKER = LZMA;";
const umdModuleName = "LZMA";

module.exports.minify = function minify() {
    return Promise.all(["lzma", "lzma_worker", "lzma-c", "lzma-d"].map(function (name) {
        return rollup.rollup({
            input: `src/${name}.mjs`,
        }).then(function (bundle) {
            return bundle.write({
                format: "umd",
                file: `src/${name}.js`,
                footer: umdFooter,
                name: umdModuleName,
            })
        }).then(function () {
            return rollup.rollup({
                input: `src/${name}.mjs`,
                plugins: [
                    terser({
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
                        sourceMap: true
                    }),
                    bundle.write({
                        format: "esm",
                        file: `src/${name}-min.mjs`,
                        sourceMap: true
                    })
                ]);
            })
        })
    }))
}