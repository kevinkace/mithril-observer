let stream;

if(typeof require) {
    stream = require("mithril-stream");
} else {
    stream = m.stream;
}

function Observer() {
    this.dirty = false;
    this.streams = [];
}

Observer.prototype.observe = function observe(...values) {
    let returnStreams = [];

    values.forEach((value) => {
        returnStreams.push(stream(value));
    });

    stream.merge(returnStreams).map(() => {
        dirty = true;
    });

    return returnStreams.length === 1 ? returnStreams.pop() : returnStreams;
};

Observer.prototype.onbeforeremove = function onbeforeremove() {
    if(dirty) {
        dirty = false;

        return true;
    }

    return false;
};

module.exports = Observer;
