import { useState } from 'react'

function Counter() {
    const [counter, setCounter] = useState(0);
    function handleDecrement() {
        if (counter <= 0) return
        setCounter(counter - 1);
    }

    function handleIncrement() {
        setCounter(counter + 1);
    }
    return (
        <div className='flex items-center gap-4 text-primary-gray rounded-md border border-green-500 px-3 py-1'>
            <div
                className={counterHandlers}
                onClick={handleDecrement}
            >-</div>
            <h2 className='font-semibold '>{counter}</h2>
            <div
                className={counterHandlers}
                onClick={handleIncrement}
            >+</div>
        </div>
    )
}

const counterHandlers = `
cursor-pointer 
text-xl
hover:text-green-500
transition
`

export default Counter