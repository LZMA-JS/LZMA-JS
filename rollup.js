const rollup = require("rollup");
const terser = require("rollup-plugin-terser").terser;
const umdFooter = "var LZMA_WORKER = this.LZMA;";
const umdModuleName = "LZMA";

["codec", "comp", "decomp"].forEach(function (name) {
    rollup.rollup({
        input: `src/es/lzma-${name}.js`,
    }).then(function (bundle) {
        bundle.write({
            format: "umd",
            file: `dist/js/lzma-${name}.js`,
            footer: umdFooter,
            name: umdModuleName,
        })
    }).catch(console.error)

    rollup.rollup({
        input: `src/es/lzma-${name}.js`,
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
        bundle.write({
            format: "umd",
            file: `dist/js/lzma-${name}.min.js`,
            footer: umdFooter,
            name: umdModuleName,
            sourceMap: true
        })

        bundle.write({
            format: "es",
            file: `dist/es/lzma-${name}.min.js`,
            sourceMap: true
        })
    }).catch(console.error)
})
