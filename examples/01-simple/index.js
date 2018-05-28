const viewCount = [];

m.mount(document.getElementById("mount"), {
    oninit : (vnode) => {
        vnode.state.count = observer(vnode, 0);
    },
    view : (vnode) => {
        // track everytime view() is called
        viewCount.unshift(Date.now());

        return [,
            m("div", vnode.state.count()),
            m("button", {
                onclick : () => {
                    vnode.state.count(vnode.state.count() - 1);
                }
            }, "Dec"),
            m("button", {
                onclick : () => {
                    vnode.state.count(vnode.state.count() + 1);
                }
            }, "Inc"),
            m.trust("<br>"),
            m("button", {
                onclick : () => {
                    console.log("clicked");
                }
            }, "console.log"),
            m("div", "timestamp everytime view() has been called:"),
            m("pre", viewCount.join("\n"))
        ];
    }
});
