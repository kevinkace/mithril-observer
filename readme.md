# Mithril Observer

*until a better name can be decided upon*

## What is this?

A small library to be used with [Mitrhil](https://github.com/MithrilJS/mithril.js/) and [Mithril stream()](https://mithril.js.org/stream.html), to prevent calling a component's `view()` except when warrented.

## How do I use it?

The API is dead simple, a single function call to instantiate values, and to add an `onbeforeupdate()` function.

```js
const component = {
    oninit : (vnode) => {
        vnode.state.value = observer(vnode, "my value");
    },
    view () =>
        // renderValue() is slow and processor intensive, so only call when warrented
        m("div", renderValue(vnode.state.value()))
}
```

### [More examples](examples)

## How does this work?

By default Mithril will call a component's `view()` for every redraw, either when triggered by certain event handlers, or by calling `m.redraw()` directly. A component can opt-out of calling it's `view()` by using a [lifecycle method](https://mithril.js.org/hyperscript.html#lifecycle-methods) - `onbeforeupdate()`. When this method returns `false`, the `view()` will not be called.

Mithril Observer does 2 things:

1. Adds `onbeforeupdate` to the component (the component vnode is first argument).
1. Creates and returns streams from from additional arguments.
