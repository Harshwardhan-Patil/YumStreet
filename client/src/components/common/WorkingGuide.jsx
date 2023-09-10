import sectionBackgroundImage from '@/assets/Temp/section-bg.avif'

const sectionBackground = {
    backgroundImage: `url(${sectionBackgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 50%',
    backgroundPosition: 'top',
    backgroundColor: 'rgba(255,255,255,0.2)'
}

function WorkingGuide({ children, subInfo }) {
    return (
        <section style={sectionBackground} className='text-center my-12 pt-10'>
            <div className='mb-6'>
                <h4 className='text-sm text-red-500 font-semibold'>Step by Step</h4>
                <h2 className='text-2xl font-bold'>How It Works</h2>
                <p>{subInfo}</p>
            </div>
            <div className='flex items-center justify-center gap-10'>
                {children}
            </div>
        </section>
    )
}

export function IllustrationAndInfo({ SVGIllustration, title, description }) {
    return (
        <div className='w-[250px] max-w-[300px] shadow-md flex justify-center px-4 min-h-[20rem] rounded-sm items-center flex-col bg-white'>
            <div className='w-44 h-44 flex items-center'>
                {SVGIllustration}
            </div>
            <div className='text-center mt-6'>
                <p className='text-black font-semibold'>{title}</p>
                <span className='text-primary text-sm'>{description}</span>
            </div>
        </div>
    )
}

export default WorkingGuide;