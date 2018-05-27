const Observer = require("../index.js");

test("Observer should be a fn", () => {
    expect(typeof Observer).toBe("function");
});

test("new Observer has observable()", () => {
    const observer = new Observer();

    expect(typeof observer.observe).toBe("function");
});

test("new Observer has onbeforeupdate", () => {
    const observer = new Observer();

    expect(typeof observer.onbeforeupdate).toBe("function");
});

test("new Observer.observe() returns a stream", () => {
    const observer = new Observer();

    const value = observer.observe(3)

    expect(value()).toBe(3);
});

test("new Observer.observe(value1, value2) returns an array of streams", () => {
    const observer = new Observer();

    let value1, value2;

    [ value1, value2 ] = observer.observe(3, 4);

    expect([ value1(), value2() ]).toEqual([ 3, 4 ]);
});
