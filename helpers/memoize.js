const memoize = (fn) => {
    const cache = new Map();
    return async function (...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = await fn(...args);
        cache.set(key, result);
        return result;
    };
}

export default memoize;