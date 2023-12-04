import VendorsCard from './VendorsCard'

function VendorsGrid({ vendors }) {
    return (
        <div className='inline-grid grid-cols-5 justify-center items-center gap-4'>
            {vendors?.map((vendor) => {
                return (
                    <VendorsCard key={vendor.id} vendor={vendor} />
                )
            })}
        </div>
    )
}

export default VendorsGrid