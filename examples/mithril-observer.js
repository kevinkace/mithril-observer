var observer = (function (stream) {
    'use strict';

    stream = stream && stream.hasOwnProperty('default') ? stream['default'] : stream;

    function observer(vnode, ...values) {
        let dirty = false,
            first = true;

        if(!vnode) {
            throw new Error("Required parameter: vnode");
        }

        if(values.length === 0) {
            throw new Error("Required parameter: values");
        }

        // create array of streams for input values
        const returnStreams = values.map((value) => stream(value));

        // merge and map streams, to set dirty state when values are updated
        stream.merge(returnStreams).map(() => {
            if(first) {
                first = false;

                return;
            }

            dirty = true;
        });

        // set onbeforeupdate() using dirty check
        vnode.state.onbeforeupdate = function() {
            if(!dirty) {
                return false;
            }

            dirty = false;

            return true;
        };

        // return single value or array based on arity
        return returnStreams.length === 1 ? returnStreams.pop() : returnStreams;
    }

    return observer;

}(m.stream));
