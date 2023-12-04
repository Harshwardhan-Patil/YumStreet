const debounce = (callbackFunction, delay = 1000) => {
    let timeOut;
    return (...args) => {
        clearTimeout(timeOut);
        timeOut = setTimeout(async () => {
            callbackFunction(...args);
        }, delay)
    }
}

export default debounce;