it('is a test of run()', function () {

    runs(function () {
        var foo = 1;
        expect(foo).toEqual(1);
    });

    runs(function () {
        var bar = 2;
        bar ++;
        expect(bar).toEqual(3);
    });

});