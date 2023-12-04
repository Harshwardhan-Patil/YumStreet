import backgroundImage from '@/assets/Temp/Hero-bg.avif';
import HomeLayout from '@/components/Layout/HomeLayout';
import SearchVendors from '@/components/Search/SearchVendors';
import VendorsGrid from '@/components/StreetVendors/VendorsGrid';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChooseLocation, ChooseFood, Delivery } from '@/assets/illustration';
import WorkingGuide, { IllustrationAndInfo } from '@/components/common/WorkingGuide';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import useScrollTop from '@/hooks/useScrollTop';
import { useNearByVendorQuery, useTrendingVendorQuery } from '@/lib/helpers/useVendorQuery';
import { useSelector } from 'react-redux';
import VendorGridSkeleton from '@/components/Skeleton/VendorGridSkeleton';
import { Toaster } from '@/components/ui/toaster';
import useUserLocation from '@/hooks/useUserLocation';
import { SortByEnum } from '@/constants/constants';

const background = {
  backgroundImage: `linear-gradient(0deg, rgba(0,0,0,.4) 0%, rgba(37,40,43,0.2) 100%),
      url(${backgroundImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};




function Home() {
  const { city } = useSelector(state => state.location);
  useScrollTop();

  return (
    <HomeLayout>
      <>
        <Toaster />
        <div
          style={background}
          className="relative flex h-[60vh] flex-col items-center justify-center text-primary-foreground"
        >
          {/* <Logo className={'w-[200px] absolute top-5 '} /> */}
          <div className="absolute z-10 left-1/2 top-2/3 flex w-full translate-x-[-50%] translate-y-[-50%] transform flex-col items-center justify-center">
            <h1 className="mb-8 text-4xl">
              Discover the best street food & drinks in <span>{city ? city : "Your location"}</span>
            </h1>
            <SearchVendors />
          </div>
        </div>
        <NearByStreetVendors />
        <TopStreetVendors />
        <HowItWorks />
      </>
    </HomeLayout>
  );
}

function NearByStreetVendors() {
  const { location } = useUserLocation();
  const { city } = useSelector(state => state.location);
  const { data, isLoading } = useNearByVendorQuery(location);
  return (
    isLoading
      ? <VendorGridSkeleton length={10} />
      : data?.vendors?.length > 0 && <section className='m-section'>
        <div className='mb-6'>
          <h2 className='text-2xl font-semibold'>Near By Street Vendors</h2>
        </div>
        <VendorsGrid vendors={data?.vendors} />
        <ViewAllButton link={`/${city}?sort-by=${SortByEnum.nearBy.key}`} />
      </section>
  )
}


function TopStreetVendors() {
  const { city } = useSelector(state => state.location);
  const { data, isLoading } = useTrendingVendorQuery({ city });

  return (
    isLoading
      ? <VendorGridSkeleton length={10} />
      : data?.vendors.length > 0 && <section className='m-section'>
        <div className='mb-6'>
          <h2 className='text-2xl font-semibold text-primary/90'>Top Street Vendors in <span className='font-bold'>{city}</span></h2>
        </div>
        <VendorsGrid vendors={data?.vendors} />
        <ViewAllButton link={`/${city}?sort-by=${SortByEnum.popularity.key}`} />
      </section>
  )
}


function HowItWorks() {
  return (
    <WorkingGuide
      subInfo={"Explore following these steps will help you to find a food you love easily"}
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

function ViewAllButton({ link }) {
  return (
    <div className='flex justify-center items-center mt-4'>
      <Button className='bg-red-500 hover:bg-red-600'>
        <Link to={link} className='w-full flex justify-between gap-2 items-center  group'>
          <span>View All</span>
          <ArrowRightIcon className='mt-0.5 w-[20px] group-hover:translate-x-1.5 transition' />
        </Link>
      </Button>
    </div>
  )
}

export default Home;
