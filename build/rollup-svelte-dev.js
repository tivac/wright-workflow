const { createFilter } = require("rollup-pluginutils");
const dedent = require("dedent");

module.exports = (options = false) => {
    const filter = createFilter(options.include || "**/*.html", options.exclude);
    
    return {
        name : "rollup-plugin-svelte-dev",

        transform(source, id) {
            if(!filter(id)) {
                return;
            }

            console.log(id);
            console.log(source);

            const ref = JSON.stringify(id);

            const [ , , component ] = source.match(/(export default ([^;]*));/);

            console.log(component);

            const code = source.replace(/(export default ([^;]*));/, dedent(`
                import { Registry, createProxy } from "svelte-dev-helper";

                Registry.set(${ref}, {
                    rollback  : null,
                    component : $2,
                });

                //create the proxy itself
                const proxy = createProxy(${ref});

                //patch the registry record with proxy constructor
                const record = Registry.get(${ref});
                record.proxy = proxy;
                Registry.set(${ref}, record);


                export default proxy;
            `));

            console.log(code);

            return {
                code,
                map : {
                    mappings : "",
                },
            };
        }
    };
};
