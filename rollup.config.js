import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default [{
    // dist
        input  : "./index.js",
        output : {
            format : "iife",
            file   : "./dist/mithril-observer.js",
            name   : "observer",
            globals : {
                "mithril-stream" : "m.stream"
            }
        }
    }, {
    // examples
        input  : "./index.js",
        output : {
            format : "iife",
            file   : "./examples/mithril-observer.js",
            name   : "observer",
            globals : {
                "mithril-stream" : "m.stream"
            }
        }
    }, {
    // test
        input  : "./index.js",
        output : {
            format : "cjs",
            file   : "./test/mithril-observer.js"
        },
        plugins: [
            nodeResolve({
              jsnext : true
            }),

            commonjs({
              include   : 'node_modules/**',
              sourceMap : false

            //   namedExports: { './module.js': ['foo', 'bar' ] }
            })
          ]
}];
