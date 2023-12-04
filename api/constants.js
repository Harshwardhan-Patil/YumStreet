export const UserRolesEnum = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  VENDOR: 'VENDOR',
};

export const AvailableUserRoles = Object.values(UserRolesEnum);

export const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_ERROR: 500,
};

export const OrderStatusEnum = {
  PENDING: 'PENDING',
  PREPARING: 'PREPARING',
  READY: 'READY',
  PICKED_UP: 'PICKED_UP',
  CANCELLED: 'CANCELLED',
  DELIVERED: 'DELIVERED',
};

export const AvailableOrderStatuses = Object.values(OrderStatusEnum);

export const OrderTypesEnum = {
  YUMSTREET_DELIVERY: 'YUMSTREET_DELIVERY',
  SELF_DELIVERY: 'SELF_DELIVERY',
  PICKUP: 'PICKUP',
};

export const AvailableOrderTypes = Object.values(OrderTypesEnum);

export const FILE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

export const MAX_FILE_SIZE = 1024 * 1024;

export const VENDOR_IMAGE_FIELDS = [
  { name: 'images', maxCount: 5 },
  { name: 'license', maxCount: 1 },
];

export const EventEnum = {
  CONNECTED_EVENT: 'connected',
  DISCONNECT_EVENT: 'disconnect',
  SOCKET_ERROR_EVENT: 'socketError',
  ORDER_PLACED_EVENT: 'orderPlaced',
};

export const MAXIMUM_DELIVERY_DISTANCE = 8; //  in kilometer

export const SortByEnum = {
  popularity: 'popularity',
  nearBy: 'nearBy',
  rating: 'rating',
  deliveryTime: 'deliveryTime',
  costLowToHigh: 'costLowToHigh',
  costHighToLow: 'costHighToLow',
};
