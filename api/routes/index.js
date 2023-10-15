//* Auth
export { default as userAuthRouter } from './auth/user.auth.js';
export { default as vendorAuthRouter } from './auth/vendor.auth.js';

//* Users
export { default as userAddressRouter } from './users/address.users.js';
export { default as userCartRouter } from './users/cart.users.js';
export { default as userOrderRouter } from './users/order.users.js';
export { default as userProfileRouter } from './users/profile.users.js';
export { default as userReviewsRouter } from './users/review.users.js';

//* Vendors
export { default as vendorAddressRouter } from './vendors/address.vendors.js';
export { default as vendorMenuItemRouter } from './vendors/menuItem.vendors.js';
export { default as vendorOrderRouter } from './vendors/order.vendors.js';
export { default as vendorProfileRouter } from './vendors/profile.vendors.js';
export { default as vendorReviewsRouter } from './vendors/review.vendors.js';

//* Public
export { default as categoriesRouter } from './public/categories.public.js';
