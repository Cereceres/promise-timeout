const defaultTimeout = 3000;

module.exports = (handler = Promise.resolve(), timeout = defaultTimeout) => {
    let timer = 0;
    const promise = handler instanceof Promise ? handler : new Promise(handler);
    const rejected = new Promise((resolve, reject) => {
        timer = setTimeout(reject, timeout, new Error('timeout broken'));
    });

    return Promise.race([ promise, rejected ])
        .then((res) => {
            clearTimeout(timer);
            return res;
        })
        .catch((error) => {
            clearTimeout(timer);
            return Promise.reject(error);
        });
};
