const viewCount = [];

function randInt() {
    const max = 20;
    return Math.floor(Math.random() * max);
}

function fibonacci(num) {
    var result = 0;
    if (num < 2) {
        result = num;
    } else {
        result = fibonacci(num-1) + fibonacci(num-2);
    }

    return result;
}

const fibTable = {
    oninit : (vnode) => {
        const data = [];

        for (let i = 0; i < 100; i++) {
            data.push(randInt());
        }

        vnode.state.dataStreams = observer(vnode, ...data);
    },
    view : (vnode) => {
        // track everytime view() is called
        viewCount.unshift(Date.now());

        return [
            m("button", { onclick : () => {
                vnode.state.dataStreams.forEach((dataStream) => {
                    dataStream(randInt());
                })
            }}, "get new values and calculate fibonnaci"),
            m("div", "timestamp everytime number-table view() has been called:"),
            m("pre", viewCount.join("\n")),
            m("table",
                m("tr",
                    m("th", "number"),
                    m("th", "fibonacci")
                ),
                m("tbody",
                    vnode.state.dataStreams.map((dataStream) =>
                        m("tr",
                            m("td", dataStream()),
                            m("td", fibonacci(dataStream()))
                        )
                    )
                )
            )
        ]
    }
};

m.mount(document.getElementById("mount"), {
    view : (vnode) => [
        m("button", {
            onclick : () => {
                vnode.state.show = !vnode.state.show;
            }
        }, "show/hide"),
        m("div", { style : { display : vnode.state.show ? "block" : "none" }},
            m(fibTable)
        )
    ]
});
