import React from 'react'
import VendorsCard from './VendorsCard'

function VendorsGrid() {
    return (
        <div className='inline-grid grid-cols-4 justify-center items-center gap-4'>
            {Array(8).fill(0).map((i, index) => {
                return (
                    <VendorsCard index={index} />
                )
            })}
        </div>
    )
}

export default VendorsGrid