import { Routes, Route } from 'react-router-dom';
import { route, user } from '@/constants/index.js';
import { Home, AboutUs, ContactUs, OrderHistory, PartnerWithUs, VendorExplorer, VendorMenu, VendorReviews, Reviews, Address } from '@/views';
import { useSelector } from 'react-redux';
import { lazy } from 'react';

const PrivateRoutes = lazy(() => import("./PrivateRoutes"));
const PublicRoutes = lazy(() => import("./PublicRoutes"));
const VendorProfileRoute = lazy(() => import("./VendorProfileRoute"));

function AppRouter() {
  const { isAuth, role } = useSelector((state) => state.auth);
  return (
    <Routes>
      <Route exact path={route.HOME} element={<Home />} />
      <Route exact path={route.ABOUT_US} element={<AboutUs />} />
      <Route exact path={route.CONTACT_US} element={<ContactUs />} />

      <Route element={<PublicRoutes role={role} />}>
        {/* <Route exact path={route.LOGIN} element={<Login />} />
        <Route exact path={route.REGISTER} element={<Register />} /> */}
        <Route exact path={route.PARTNER_WITH_US} element={<PartnerWithUs />} />
      </Route>


      <Route path={route.USER_PROFILE} element={<PrivateRoutes role={user} />}>
        <Route path={route.USER_REVIEWS} element={<Reviews />} />
        <Route path={route.USER_ORDER_HISTORY} element={<OrderHistory />} />
        <Route path={route.USER_ADDRESS} element={<Address />} />
      </Route>

      <Route exact path={route.SEARCH_FILTERS} element={<VendorExplorer />} />
      <Route exact path={route.VIEW_VENDOR_PROFILE} element={<VendorProfileRoute />}>
        <Route exact path={route.VIEW_VENDOR_MENU} element={<VendorMenu />} />
        <Route exact path={route.VIEW_VENDOR_REVIEWS} element={<VendorReviews />} />
      </Route>

    </Routes>
  );
}

export default AppRouter;
