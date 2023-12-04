import { lazy } from "react";

export const Home = lazy(() => import("./Home"));
export const ContactUs = lazy(() => import("./ContactUs"));
export const AboutUs = lazy(() => import("./AboutUs"));

export const Reviews = lazy(() => import("./User/Reviews"));
export const OrderHistory = lazy(() => import("./User/OrderHistory"));
export const Register = lazy(() => import("./User/Register"));
export const Login = lazy(() => import("./User/Login"));
export const Address = lazy(() => import("./User/Address"));
export const Cart = lazy(() => import("./User/Cart"));
export const Checkout = lazy(() => import("./User/Checkout"));

export const PartnerWithUs = lazy(() => import("./PartnerWithUs"));
export const VendorExplorer = lazy(() => import("./VendorExplorer"));
export const VendorMenu = lazy(() => import("./VendorMenu"));
export const VendorReviews = lazy(() => import("./VendorReviews"));

export const VendorRegister = lazy(() => import("./Vendor/Register"));
export const VendorLogin = lazy(() => import("./Vendor/Login"));
export const VendorDashboardOrders = lazy(() => import("./Vendor/Dashboard/Orders"));
export const VendorDashboardPendingOrders = lazy(() => import("./Vendor/Dashboard/PendingOrder"));
export const VendorDashboardMenus = lazy(() => import("./Vendor/Dashboard/Menu"));
export const VendorDashboardSetting = lazy(() => import("./Vendor/Dashboard/Setting"));
