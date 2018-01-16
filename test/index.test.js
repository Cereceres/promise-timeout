const assert = require('assert');
const promise = require('../index');


describe('test to promise timeout', () => {
    it('should reject the promise is timeout is broken', (done) => {
        promise((resolve) => setTimeout(resolve, 3000), 2000)
            .catch((error) => {
                assert(error.message === 'timeout broken');
                done();
            });
    });

    it('should resolve if timeout is not broken', (done) => {
        promise((resolve) => setTimeout(resolve, 1000, 'test'), 2000)
            .then((res) => {
                assert(res === 'test');
                done();
            })
            .catch(done);
    });

    it('should resolve the promise if is not rejected', (done) => {
        const p = new Promise((resolve) => setTimeout(resolve, 1000, 'test'));
        promise(p, 2000)
            .then((res) => {
                assert(res === 'test');
                done();
            })
            .catch(done);
    });

    it('should resolve the promise if is not rejected', (done) => {
        const p = new Promise((resolve) => setTimeout(resolve, 3000));
        promise(p, 2000)
            .catch((error) => {
                assert(error.message === 'timeout broken');
                done();
            });
    });
});
