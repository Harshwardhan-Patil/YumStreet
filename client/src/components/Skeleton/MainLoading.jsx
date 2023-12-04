import YumstreetImg from '@/assets/yumstreet.png';

function MainLoading() {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='max-w-xs max-sm:max-w-[200px]'>
                <img src={YumstreetImg} className='w-full h-full object-contain' alt="" />
            </div>
        </div>
    )
}

export default MainLoading