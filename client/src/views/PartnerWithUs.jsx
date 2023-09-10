import backgroundImage from '@/assets/Temp/partner-with-us.webp';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChooseLocation, ChooseFood, Delivery } from '@/assets/illustration';
import WorkingGuide, { IllustrationAndInfo } from '@/components/common/WorkingGuide';
import Footer from '@/components/Layout/Footer';
import { YumStreet, route } from '@/constants';
import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


const background = {
    backgroundImage: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(37,40,43,0.4) 100%),
      url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
};




function PartnerWithUs() {

    return (
        <>

            <div
                style={background}
                className="relative px-12 flex h-[60vh] flex-col items-center justify-center text-primary-foreground"
            >
                <h1 className='text-4xl mb-3'>Add your vendor to {YumStreet.TITLE}</h1>
                <div className='my-4 flex gap-5'>
                    <Link to={route.VENDOR_SIGNUP} className={link + 'bg-blue-600 hover:bg-blue-700'}>Register Your Vendor Account</Link>
                    <Link to={route.VENDOR_LOGIN} className={link + 'bg-white hover:bg-neutral-200 text-primary'}>Login to track Vendor Performance.</Link>
                </div>
                <span className='text-sm'>Need help? Please email us at <a href={`mailto:${YumStreet.EMAIL}`}>{YumStreet.EMAIL}</a></span>
                <GoBackLink />
            </div>
            <RegisterRequirements />
            <HowItWorks />
            <Footer />
        </>
    );
}

function GoBackLink() {
    const navigate = useNavigate();
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger
                    className='absolute top-5 left-5 hover:bg-neutral-700 p-1 rounded-sm'
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeftIcon className='w-6 ' />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Go Back</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

function RegisterRequirements() {
    return (
        <section>
            <div className='relative px-12 py-6 shadow-md rounded-sm w-1/2 mx-auto bg-white mt-[-4%]  z-10'>
                <h2 className='text-primary text-2xl text-center font-semibold '>Get started with online ordering</h2>
                <p className='text-center text-primary-gray'>Please keep the documents ready for a smooth signup</p>
                <div className='flex justify-between my-8'>
                    <div>
                        <p className='flex gap-2 text-primary my-4'>
                            <CheckCircleIcon className='w-6 fill-green-500' />
                            <span>FSSAI license copy</span>
                        </p>
                        <p className='flex gap-2 text-primary my-4'>
                            <CheckCircleIcon className='w-6 fill-green-500' />
                            <span>Your vendor menu</span>
                        </p>

                    </div>
                    <div>
                        <p className='flex gap-2 text-primary my-4'>
                            <CheckCircleIcon className='w-6 fill-green-500' />
                            <span>Dish images for top 5 items</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

function HowItWorks() {
    return (
        <WorkingGuide
            subInfo={"Explore following these steps will help you to partner with us easily"}
        >
            <IllustrationAndInfo
                SVGIllustration={<ChooseLocation className={'w-full h-fit object-cover'} />}
                title={"Choose Location"}
                description={"Enter you address or choose your current location"}
            />
            <IllustrationAndInfo
                SVGIllustration={<ChooseFood className={'w-full h-fit object-cover'} />}
                title={"Order Favorite Food"}
                description={"Choose your favorite food and payment method"}
            />
            <IllustrationAndInfo
                SVGIllustration={<Delivery className={'w-full h-fit object-cover'} />}
                title={"Fast Delivery"}
                description={"Get it delivered to your location"}
            />
        </WorkingGuide>
    )
}

const link = `
py-2 
px-4
rounded-sm
transition
`

export default PartnerWithUs;
