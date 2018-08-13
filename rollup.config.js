/* eslint-env node */
"use strict";

const path = require("path");

const { preprocess, processor } = require("modular-css-svelte")({
    rewrite : false,
    map     : { inline : false },
});

module.exports = {
    input : "./src/index.js",

    output : {
        file      : "./dist/bundle.js",
        format    : "iife",
        // name      : "wright-workflow",
        sourcemap : true,
        banner    : `/* eslint-disable */`,
        indent    : false,

        assetFileNames : "[name][extname]",
        chunkFileNames : "[name].js",
    },

    plugins : [
        require("rollup-plugin-node-resolve")(),

        // Process svelte components into JS
        require("rollup-plugin-svelte")({
            // Enable modular-css preprocessor for <link> tags
            preprocess,

            // Disable built-in CSS handling
            css : false,

            // Enable extra runtime debugging properties
            dev : true,
        }),

        // Handle .css includes that haven't been moved in <link> tags
        require("modular-css-rollup")({
            processor,
        }),

        require("./build/rollup-svelte-dev.js")(),
    ],
};
