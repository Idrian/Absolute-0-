describe('getDiv', function() {
    var d = document.querySelector('.main');

    it('Should exist', function() {
        expect(d.nodeName).toBe('body');
    });
});