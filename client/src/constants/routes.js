//Public Routes
export const HOME = '/';
export const ABOUT_US = '/about-us';
export const CONTACT_US = '/contact-us';
export const VIEW_VENDOR_PROFILE = '/:city/:vendorName';
export const VIEW_VENDOR_MENU = 'menu'; // /:city/:vendorName/menu
export const VIEW_VENDOR_REVIEWS = 'reviews'; ///:city/:vendorName/reviews
export const SEARCH_FILTERS = '/:city/:params';
export const LOGIN = '/login';
export const LOGOUT = '/logout';
export const SIGNUP = '/signup';
export const VENDOR_LOGIN = '/vendor/login';
export const VENDOR_LOGOUT = '/vendor/logout';
export const VENDOR_SIGNUP = '/vendor/signup';
export const PARTNER_WITH_US = '/partner-with-us';

//User Routes
export const USER_PROFILE = '/user/:username';
export const USER_ORDER_HISTORY = 'order-history'; ///user/:username/order-history
export const USER_REVIEWS = 'reviews'; ///user/:username/reviews
export const USER_ADDRESS = 'addresses'; ///user/:username/addresses
export const CHECKOUT_SELECT_ADDRESS = '/checkout/select-address'; //step 1
export const CHECKOUT_PAYMENT_METHODS = '/checkout/payment-methods'; // step 2
export const CHECKOUT_REVIEW_ITEM_DELIVERY = '/checkout/review-item-delivery'; //step 3
//TODO: add review submission

//Vendor Routes
export const VENDOR_PROFILE = '/vendor/profile';
export const VENDOR_MENU_MANAGEMENT = '/vendor/menu-management';
export const VENDOR_ORDER = '/vendor/orders';
export const VENDOR_REVIEWS = '/vendor/reviews';
