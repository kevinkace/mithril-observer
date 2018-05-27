const stream = require("mithril-stream");

function Observer() {
    this.dirty = false;
    this.streams = [];
}

Observer.prototype.observable = function observable(...values) {
    let returnValues = [];

    values.forEach((value) => {
        returnValues.push(stream(value));
    });

    stream.merge(streams).map(() => {
        dirty = true;
    });

    return returnValues.length === 1 ? returnValues.pop() : returnValues;
};

Observer.prototype.onbeforeremove = function onbeforeremove() {
    if(dirty) {
        dirty = false;

        return true;
    }

    return false;
};
