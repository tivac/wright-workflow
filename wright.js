const wright = require("wright");
const rollup = require("rollup");

const rollupConfig = require("./rollup.config.js");

const compile = async () => {
    const bundle = await rollup.rollup(rollupConfig);

    console.log(bundle);
    
    const { code } = await bundle.generate(rollupConfig.output);
    
    return code;
};

wright({
    debug: true,

    serve : "/dist",
    run: "console.log",

    execute : "npx rollup --config --watch",

    js: {
        watch: "src/**/*.js",
        // compile,
        path : "./dist/bundle.js",
    },
    css: {
        watch: "src/**/*.css",
        // compile,
        path : "./dist/bundle.css",
    },
})
