import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { route, user } from '@/constants/index.js';
import { Home, AboutUs, ContactUs, Profile, OrderHistory, PartnerWithUs, VendorExplorer, VendorMenu, VendorReviews } from '@/views';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoute';
import { useSelector } from 'react-redux';

function AppRouter() {
  const { isAuth, role } = useSelector((state) => state.auth);
  return (
    <Routes>
      <Route exact path={route.HOME} element={<Home />} />
      <Route exact path={route.ABOUT_US} element={<AboutUs />} />
      <Route exact path={route.CONTACT_US} element={<ContactUs />} />

      <Route exact path={route.VIEW_VENDOR_MENU} element={<VendorMenu />} />
      <Route exact path={route.VIEW_VENDOR_REVIEWS} element={<VendorReviews />} />
      <Route exact path={route.SEARCH_FILTERS} element={<VendorExplorer />} />

      <Route element={<PublicRoutes role={role} />}>
        {/* <Route exact path={route.LOGIN} element={<Login />} />
        <Route exact path={route.REGISTER} element={<Register />} /> */}
        <Route exact path={route.PARTNER_WITH_US} element={<PartnerWithUs />} />
      </Route>

      <Route element={<PrivateRoutes role={user} />}>
        <Route path={route.USER_PROFILE} element={<Profile />} />
        <Route path={route.USER_ORDER_HISTORY} element={<OrderHistory />} />
      </Route>

      {/* <Route element={<PrivateRoutes role={vendor} />}>
        <Route path={route.USER_PROFILE} element={<Profile />} />
        <Route path={route.USER_ORDER_HISTORY} element={<OrderHistory />} />
      </Route> */}

    </Routes>
  );
}

export default AppRouter;
