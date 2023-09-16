import { lazy } from "react";

export const Home = lazy(() => import("./Home"));
export const ContactUs = lazy(() => import("./ContactUs"));
export const AboutUs = lazy(() => import("./AboutUs"));
export const Reviews = lazy(() => import("./User/Reviews"));
export const OrderHistory = lazy(() => import("./User/OrderHistory"));
export const Address = lazy(() => import("./User/Address"));
export const PartnerWithUs = lazy(() => import("./PartnerWithUs"));
export const VendorExplorer = lazy(() => import("./VendorExplorer"));
export const VendorMenu = lazy(() => import("./VendorMenu"));
export const VendorReviews = lazy(() => import("./VendorReviews"));