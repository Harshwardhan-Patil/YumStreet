//Public Routes
export const HOME = '/';
export const ABOUT_US = '/about-us';
export const CONTACT_US = '/contact-us';
export const VIEW_VENDOR_PROFILE = '/:city/:vendorId';
export const VIEW_VENDOR_MENU = 'menu'; // /:city/:vendorName/menu
export const VIEW_VENDOR_REVIEWS = 'reviews'; ///:city/:vendorName/reviews
export const SEARCH_FILTERS = '/:city';
export const LOGIN = '/login';
export const LOGOUT = '/logout';
export const REGISTER = '/register';
export const VENDOR_REGISTER = '/vendor/register';
export const VENDOR_LOGIN = '/vendor/login';
export const PARTNER_WITH_US = '/partner-with-us';

//User Routes
export const USER_PROFILE = '/user/:username';
export const USER_ORDERS = 'orders'; ///user/:username/order-history
export const USER_REVIEWS = 'reviews'; ///user/:username/reviews
export const USER_ADDRESS = 'addresses'; ///user/:username/addresses
export const USER_CART = '/cart'; ///user/:username/addresses
export const CHECKOUT = '/checkout'; //step 1
export const CHECKOUT_PAYMENT_METHODS = '/checkout/payment-methods'; // step 2
export const CHECKOUT_REVIEW_ITEM_DELIVERY = '/checkout/review-item-delivery'; //step 3
//TODO: add review submission

//Vendor Routes
export const VENDOR_DASHBOARD = '/vendor/dashboard';
export const VENDOR_PROFILE = '/vendor/profile';
export const VENDOR_ORDER_PENDING = 'orders/pending';
export const VENDOR_MENU = 'menu';
export const VENDOR_ORDER = 'orders';
export const VENDOR_REVIEWS = 'reviews';
export const VENDOR_SETTINGS = 'settings';

export const API = 'http://localhost:8080';
