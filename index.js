module.exports = (handler, timeout) => {
    let timer;
    const promise = handler instanceof Promise ? handler : new Promise(handler);
    const rejected = new Promise((resolve, reject) => {
        timer = setTimeout(reject, timeout, new Error('timeout broken'));
    });

    return Promise.race([ promise, rejected ]).catch((error) => {
        clearTimeout(timer);
        return Promise.reject(error);
    });
};
