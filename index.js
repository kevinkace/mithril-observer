const stream = require("mithril-stream");

let dirty;
let streams = [];

function observable(...values) {
    let returnValues = [];

    values.forEach((value) => {
        returnValues.push(stream(value));
    });

    stream.merge(streams).map(() => {
        dirty = true;
    });

    return returnValues.length === 1 ? returnValues.pop() : returnValues;
}

function onbeforeremove() {
    if(dirty) {
        dirty = false;

        return true;
    }

    return false;
}

function observer() {
    return {}
}
