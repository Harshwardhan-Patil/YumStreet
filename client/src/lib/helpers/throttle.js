export default function throttle(callbackFunction, delay = 100) {
    let shouldWait = false
    let waitingArgs
    const timeoutFunc = () => {
        if (waitingArgs == null) {
            shouldWait = false
        } else {
            waitingArgs = null
            setTimeout(timeoutFunc, delay)
        }
    }

    return (...args) => {
        if (shouldWait) {
            waitingArgs = args
            return
        }

        callbackFunction(...args)
        waitingArgs = null;
        shouldWait = true

        setTimeout(timeoutFunc, delay)
    }
}
