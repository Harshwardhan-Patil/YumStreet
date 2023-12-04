export const user = 'USER';
export const vendor = 'VENDOR';
export const YumStreet = {
    EMAIL: 'yumstreet@gmail.com',
    PHONE: '+916991160955',
    TITLE: 'YumStreet'
}

export const CURRENCY_INR = '₹';

export const SortByEnum = {
    popularity: { key: 'popularity', format: 'Popularity' },
    nearBy: { key: 'nearBy', format: 'Near by' },
    rating: { key: 'rating', format: 'Rating' },
    deliveryTime: { key: 'deliveryTime', format: 'Delivery Time' },
    costLowToHigh: { key: 'costLowToHigh', format: 'Cost: Low to High' },
    costHighToLow: { key: 'costHighToLow', format: 'Cost: High to Low' }
};


export const SortByCategoriesKeys = Object.keys(SortByEnum);
export const SortByCategoriesValues = Object.values(SortByEnum);

const TimeSlots = [];

for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
        const hourFormatted = (hour % 12 || 12).toString().padStart(2, '0');
        const minuteFormatted = minute.toString().padStart(2, '0');
        const period = hour < 12 ? 'AM' : 'PM';

        const timeLabel = `${hourFormatted}:${minuteFormatted} ${period}`;

        TimeSlots.push({
            id: `${hourFormatted}-${minuteFormatted}-${period}`,
            value: timeLabel,
        });
    }
}

export { TimeSlots };

export const OrderTypes = [
    {
        value: 'YUMSTREET_DELIVERY',
        text: 'Yumstreet Delivery'
    },
    {
        value: 'SELF_DELIVERY',
        text: 'Self Delivery'
    },
    {
        value: 'PICKUP',
        text: 'Pickup'

    }
];

export const OrderStatusEnum = {
    PENDING: {
        id: 'PENDING',
        text: 'Pending',
        color: '#f37520',
    },
    PREPARING: {
        id: 'PREPARING',
        text: 'Preparing',
        color: '#fbb23c'
    },
    READY: {
        id: 'READY',
        text: 'Ready',
        color: 'rgb(0, 189, 0)'
    },
    PICKED_UP: {
        id: 'PICKED_UP',
        text: 'Picked Up',
        color: '#0071bd'
    },
    CANCELLED: {
        id: 'CANCELLED',
        text: 'Cancelled',
        color: '#d01141'
    },
    DELIVERED: {
        id: 'DELIVERED',
        text: 'Delivered',
        color: '#00a89d'
    },
};

export const EventEnum = {
    CONNECTED_EVENT: 'connected',
    DISCONNECT_EVENT: 'disconnect',
    SOCKET_ERROR_EVENT: 'socketError',
    ORDER_PLACED_EVENT: 'orderPlaced',
};

export const tabs = [
    {
        id: 'sort-by',
        name: "sort by"
    },
    {
        id: 'cuisines',
        name: "cuisines"
    },
    {
        id: 'ratings',
        name: "rating"
    },
    {
        id: 'cost-per-person',
        name: "cost per person"
    },
]


export const ratings = [0, 3.5, 4.0, 4.5]

export const costsPerPerson = [
    {
        min: 300,
        max: 600,
        name: `300 ${CURRENCY_INR}-600 ${CURRENCY_INR}`,
    },
    {
        min: 600,
        max: 1000,
        name: `Greater than 600 ${CURRENCY_INR}`,
    },
    {
        min: 0,
        max: 300,
        name: `Less than 300 ${CURRENCY_INR}`,
    },
]


