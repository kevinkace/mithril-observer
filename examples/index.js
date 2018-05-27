const redraws = [];
console.log("test");


m.mount(document.getElementById("mount"), {
    oninit : (vnode) => {
        const ob = new Observer(vnode);

        window.ob = ob;

        vnode.state.count = ob.serve(0);
    },
    view : (vnode) => {
        // track everytime view() is called
        redraws.push(Date.now());

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
                    console.log(vnode);
                    console.log("clicked");
                }
            }, "console.log"),
            m("pre", redraws.reverse().join("\n"))
        ];
    }
});
