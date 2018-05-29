import stream from "mithril-stream";

/**
 * This function adds an onbeforeupdate() fn to the vnode, and creates streams from each value
 * @param {vnode} vnode - the component vnode
 * @param {...*} values - the values to create streams from
 * @returns {(array|stream)} a stream of the input value, or an array of streams for each input value
 */
export default function observer(vnode, ...values) {
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

    // merge and map streams, map is run anytime a value is updated
    // set dirty state when values are updated
    stream.merge(returnStreams).map(() => {
        // opt out from first run as map runs on instatiation
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
    }

    // return single value or array based on arity
    return returnStreams.length === 1 ? returnStreams.pop() : returnStreams;
}
