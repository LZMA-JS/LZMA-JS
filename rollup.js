const rollup = require("rollup");
const uglify = require("rollup-plugin-uglify");
const minify = require("uglify-js").minify;

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
            uglify({
                compress: {
                    unsafe: true,
                    unsafe_comps: true,
                    pure_getters: true
                },
                mangle: {
                    toplevel: true,
                    except: ["LZMA", "LZMA_WORKER", "compress", "decompress"]
                },
                mangleProperties: {
                    ignore_quoted: true,
                    regex: /^(?!LZMA|(de)?compress|data|mode|cbn)/
                }
            }, minify)
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
