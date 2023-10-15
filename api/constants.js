export const UserRolesEnum = {
  ADMIN: 'ADMIN',
  USER: 'USER',
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
  CANCELLED: 'CANCELLED',
  DELIVERED: 'DELIVERED',
};

export const AvailableOrderStatuses = Object.values(OrderStatusEnum);

export const FILE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

export const MAX_FILE_SIZE = 1024 * 1024;

export const VENDOR_IMAGE_FIELDS = [
  { name: 'images', maxCount: 5 },
  { name: 'license', maxCount: 1 },
];
