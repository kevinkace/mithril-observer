const stream = m.stream;

function Observer(vnode) {
    this.dirty = false;
    this.streams = [];
    this.returnStreams = [];
    this.first = true;

    vnode.state.onbeforeupdate = this.onbeforeupdate;
}

Observer.prototype.serve = function serve(...values) {
    values.forEach((value) => {
        this.returnStreams.push(stream(value));
    });

    stream.merge(this.returnStreams).map(() => {
        if(this.first) {
            this.first = false;

            return;
        }

        this.dirty = true;
    });

    return this.returnStreams.length === 1 ? this.returnStreams.pop() : this.returnStreams;
};

Observer.prototype.onbeforeupdate = function onbeforeupdate() {
    if(this.dirty) {
        this.dirty = false;

        return true;
    }

    return false;
};
