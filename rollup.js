const rollup = require("rollup");

const umdFooter = "var LZMA_WORKER = this.LZMA;";
const umdModuleName = "LZMA";

["codec", "comp", "decomp"].forEach(function (name) {
    rollup.rollup({
        entry: `src/es/lzma-${name}.js`,
    }).then(function (bundle) {
        bundle.write({
            format: "umd",
            dest: `dist/js/lzma-${name}.js`,
            footer: umdFooter,
            moduleName: umdModuleName,
        })
    }).catch(console.error)

    rollup.rollup({
        entry: `src/es/lzma-${name}.js`,
        plugins: []
    }).then(function (bundle) {
        bundle.write({
            format: "umd",
            dest: `dist/js/lzma-${name}.min.js`,
            footer: umdFooter,
            moduleName: umdModuleName,
            sourceMap: true
        })

        bundle.write({
            format: "es",
            dest: `dist/es/lzma-${name}.min.js`,
            sourceMap: true
        })
    }).catch(console.error)
})
