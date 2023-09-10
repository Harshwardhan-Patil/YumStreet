import { lazy } from "react";

export const Home = lazy(() => import("./Home"));
export const ContactUs = lazy(() => import("./ContactUs"));
export const AboutUs = lazy(() => import("./AboutUs"));
export const Profile = lazy(() => import("./User/Profile"));
export const OrderHistory = lazy(() => import("./User/OrderHistory"));
export const PartnerWithUs = lazy(() => import("./PartnerWithUs"));
export const VendorExplorer = lazy(() => import("./VendorExplorer"));
export const VendorMenu = lazy(() => import("./VendorMenu"));
export const VendorReviews = lazy(() => import("./VendorReviews"));