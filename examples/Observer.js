const stream = m.stream;

function observer(vnode, ...values) {
    let dirty = false,
        first = true;

    if(!vnode || values.length >= 1) {
        throw new Error("Required parameters");
    }

    // create array of streams of input values
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
    }

    // return single value or array based on arity
    return returnStreams.length === 1 ? returnStreams.pop() : returnStreams;
}
