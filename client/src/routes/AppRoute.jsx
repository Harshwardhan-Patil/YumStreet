import { Routes, Route, Navigate } from 'react-router-dom';
import { route, user } from '@/constants/index.js';
import {
  Home, AboutUs, ContactUs, PartnerWithUs,
  VendorExplorer, VendorMenu, VendorReviews,
  Reviews, Address, OrderHistory, Cart, Checkout,
  Login, Register, VendorRegister, VendorLogin,
  VendorDashboardOrders, VendorDashboardMenus, VendorDashboardSetting, VendorDashboardPendingOrders
} from '@/views';
import { useSelector } from 'react-redux';
import { lazy } from 'react';

const VendorPrivateRoutes = lazy(() => import("./VendorPrivateRoutes"));
const UserPrivateRoutes = lazy(() => import("./UserPrivateRoutes"));
// const PublicRoutes = lazy(() => import("./PublicRoutes"));
const VendorProfileRoute = lazy(() => import("./VendorProfileRoute"));

function AppRouter() {
  const { role, isAuth } = useSelector((state) => state.auth);
  const { id: vendorId } = useSelector(state => state.vendor);
  return (
    <Routes>
      <Route exact path={route.HOME} element={<Home />} />
      <Route exact path={route.ABOUT_US} element={<AboutUs />} />
      <Route exact path={route.CONTACT_US} element={<ContactUs />} />

      {/* <Route path={'/'} element={<PublicRoutes role={role} />}>
        <Route exact path={route.REGISTER} element={<Register />} />
        <Route exact path={route.LOGIN} element={<Login />} />
        <Route exact path={route.PARTNER_WITH_US} element={<PartnerWithUs />} />
      </Route> */}

      <Route exact path={route.REGISTER} element={isAuth ? <Navigate to={route.HOME} /> : <Register />} />
      <Route exact path={route.LOGIN} element={isAuth ? <Navigate to={route.HOME} /> : <Login />} />
      <Route exact path={route.PARTNER_WITH_US} element={isAuth && vendorId ? <Navigate to={route.HOME} /> : <PartnerWithUs />} />
      <Route exact path={route.VENDOR_REGISTER} element={isAuth && role === user ? <VendorRegister /> : <Navigate to={route.LOGIN} />} />
      <Route exact path={route.VENDOR_LOGIN} element={isAuth && vendorId ? <Navigate to={route.HOME} /> : <VendorLogin />} />

      <Route path={route.USER_PROFILE} element={<UserPrivateRoutes />}>
        <Route path={route.USER_REVIEWS} element={<Reviews />} />
        <Route path={route.USER_ORDERS} element={<OrderHistory />} />
        <Route path={route.USER_ADDRESS} element={<Address />} />
      </Route>

      <Route path='/' element={<UserPrivateRoutes />}>
        <Route path={route.USER_CART} element={<Cart />} />
        <Route path={route.CHECKOUT} element={<Checkout />} />
      </Route>

      <Route path={route.VENDOR_DASHBOARD} element={<VendorPrivateRoutes />}>
        <Route path={route.VENDOR_ORDER} element={<VendorDashboardOrders />} />
        <Route path={route.VENDOR_MENU} element={<VendorDashboardMenus />} />
        <Route path={route.VENDOR_SETTINGS} element={<VendorDashboardSetting />} />
        <Route path={route.VENDOR_ORDER_PENDING} element={<VendorDashboardPendingOrders />} />
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
