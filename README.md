# promise-timeout
extends native promise to get timeout in params

# Usage 

```js
const promiseTimeout = require('promise-timeout')

promiseTimeout((resolve) => setTimeout(resolve, 3000), 2000)
    .catch((error) => {
        assert(error.message === 'timeout broken');
    });

promiseTimeout((resolve) => setTimeout(resolve, 1000), 2000)
    .then(// flow is here)

const p = new promiseTimeout((resolve) => setTimeout(resolve, 1000));
promiseTimeout(p, 2000)
    .then(// flow is here)

const p = new promiseTimeout((resolve) => setTimeout(resolve, 3000));
promiseTimeout(p, 2000)
    .catch((error) => {
        assert(error.message === 'timeout broken');
    });


```

# API

## promise-timeout(handler,timeout)-> Promise

Receive the handler what is passed to Promise class and timeout. If timeout is broken the promise is rejected.

The handler can be a promise instance.
