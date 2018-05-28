const observer = require("../index.js");

// gen fake vnode obj
function mockVnode() {
    return { state : {} };
}

test("observer should be a fn", () => {
    expect(typeof observer).toBe("function");
});

test("observer() should throw on no params", () => {
    let err;

    try {
        observer();
    } catch(e) {
        err = e;
    }

    expect(err).toEqual(new Error("Required parameter: vnode"));
});

test("observer() should throw on 1 param", () => {
    let err;

    try {
        observer({});
    } catch(e) {
        err = e;
    }

    expect(err).toEqual(new Error("Required parameter: values"));
});

test("observer() returns a stream, number", () => {
    const value = observer(mockVnode(), 3);

    expect(value()).toBe(3);
});

test("observer() returns a stream, object", () => {
    const mockData = { test : "something" };
    const value = observer(mockVnode(), mockData);

    expect(value()).toEqual(mockData);
});

test("observer() returns a multiple streams", () => {
    const mockData1 = { test : "something" };
    const mockData2 = 3;
    const values = observer(mockVnode(), mockData1, mockData2);

    expect(values.map((value) => value())).toEqual([ mockData1, mockData2]);
});

test("observer() adds onbeforeupdate() to vnode", () => {
    const vnode = mockVnode();
    const value = observer(vnode, 3)

    expect(typeof vnode.state.onbeforeupdate).toBe("function");
});

// test("new observer.observe(value1, value2) returns an array of streams", () => {
//     const observer = new observer();

//     let value1, value2;

//     [ value1, value2 ] = observer.observe(3, 4);

//     expect([ value1(), value2() ]).toEqual([ 3, 4 ]);
// });
