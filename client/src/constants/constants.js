export const user = 'user';
export const vendor = 'vendor';
export const YumStreet = {
    EMAIL: 'yumstreet@gmail.com',
    PHONE: '+916991160955',
    TITLE: 'YumStreet'
}

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
        id: 'const-per-person',
        name: "cost per person"
    },
]


//*Temporary data
export const fakeReviews = [
    {
        id: 1,
        name: "Alice",
        numOfReviews: 15,
        rating: 4.5,
        date: "2023-08-12",
        description: "Delicious food, especially the pizza! Highly recommended."
    },
    {
        id: 2,
        name: "Bob",
        numOfReviews: 22,
        rating: 3.8,
        date: "2023-08-05",
        description: "Decent place, good service, but the desserts could be better."
    },
    {
        id: 3,
        name: "Charlie",
        numOfReviews: 10,
        rating: 4.2,
        date: "2023-07-25",
        description: "Great ambiance and friendly staff. Loved the pasta."
    },
    {
        id: 4,
        name: "David",
        numOfReviews: 5,
        rating: 4.0,
        date: "2023-07-18",
        description: "Solid menu, good options for vegetarians. Would visit again."
    },
    {
        id: 5,
        name: "Eve",
        numOfReviews: 8,
        rating: 3.5,
        date: "2023-07-10",
        description: "The service was slow, but the seafood was fresh and tasty."
    },
    {
        id: 6,
        name: "Frank",
        numOfReviews: 12,
        rating: 4.7,
        date: "2023-06-30",
        description: "Excellent steakhouse! Perfectly cooked steaks every time."
    },
    {
        id: 7,
        name: "Grace",
        numOfReviews: 18,
        rating: 4.2,
        date: "2023-06-22",
        description: "The sushi was divine, and the presentation was beautiful."
    },
    {
        id: 8,
        name: "Hannah",
        numOfReviews: 25,
        rating: 3.9,
        date: "2023-06-15",
        description: "Good value for money, but the drinks menu could be improved."
    },
    {
        id: 9,
        name: "Ian",
        numOfReviews: 9,
        rating: 4.6,
        date: "2023-06-08",
        description: "Cozy atmosphere and a lovely selection of desserts."
    },
    {
        id: 10,
        name: "Jessica",
        numOfReviews: 14,
        rating: 3.7,
        date: "2023-06-01",
        description: "Average experience, nothing extraordinary. Expected more."
    }
];

export const fakeReviewsForProfile = [
    {
        id: 1,
        vendorName: "Delicious Delights",
        vendorAddress: "123 Main Street, Cityville",
        rating: 4.5,
        date: "2023-09-01",
        description: "The food was amazing! I loved the flavors and the service was excellent."
    },
    {
        id: 2,
        vendorName: "Tasty Treats",
        vendorAddress: "456 Elm Avenue, Townsville",
        rating: 3.8,
        date: "2023-09-02",
        description: "Decent food, but the portions could be larger. The staff was friendly."
    },
    {
        id: 3,
        vendorName: "Spice Haven",
        vendorAddress: "789 Oak Road, Countryside",
        rating: 4.2,
        date: "2023-09-03",
        description: "Great variety of dishes. The spices were just right, and I'll definitely come back."
    },
    {
        id: 4,
        vendorName: "Savory Bites",
        vendorAddress: "101 Pine Street, Riverside",
        rating: 4.7,
        date: "2023-09-04",
        description: "Absolutely delicious! The food here never disappoints. Highly recommended."
    },
    {
        id: 5,
        vendorName: "Street Eats",
        vendorAddress: "222 Maple Lane, Suburbia",
        rating: 3.5,
        date: "2023-09-05",
        description: "The food was average. It could use some improvement, but it's a nice spot."
    },
    {
        id: 6,
        vendorName: "Flavor Fiesta",
        vendorAddress: "333 Cedar Street, Metroville",
        rating: 4.9,
        date: "2023-09-06",
        description: "Incredible flavors! This place never fails to impress. A must-visit."
    },
    {
        id: 7,
        vendorName: "Quick Bites",
        vendorAddress: "444 Birch Avenue, Downtown",
        rating: 3.0,
        date: "2023-09-07",
        description: "Food was served fast, but it lacked flavor. Decent for a quick meal."
    },
    {
        id: 8,
        vendorName: "Yummy Street",
        vendorAddress: "555 Willow Road, Uptown",
        rating: 4.6,
        date: "2023-09-08",
        description: "I'm a regular here. The food is consistently delicious, and the staff is friendly."
    },
    {
        id: 9,
        vendorName: "Flavorful Delights",
        vendorAddress: "666 Redwood Drive, Lakeside",
        rating: 4.4,
        date: "2023-09-09",
        description: "Great variety and taste. The ambiance could be better, though."
    },
    {
        id: 10,
        vendorName: "Street Spice",
        vendorAddress: "777 Fir Lane, Riverside",
        rating: 3.7,
        date: "2023-09-10",
        description: "Decent street food. The spice level was just right, but it's not exceptional."
    }
];

export const fakeUserOrderHistory = [
    {
        orderId: "123456",
        date: "2023-09-15",
        totalAmount: 45.99,
        items: [
            {
                itemId: "101",
                itemName: "Chicken Biriyani",
                quantity: 2,
                price: 12.99,
            },
            {
                itemId: "102",
                itemName: "Paneer Tikka",
                quantity: 1,
                price: 8.49,
            },
            {
                itemId: "103",
                itemName: "Garlic Naan",
                quantity: 3,
                price: 2.99,
            },
        ],
        deliveryAddress: {
            street: "123 Main Street",
            city: "Cityville",
            zipCode: "12345",
        },
        status: "Delivered",
        feedback: "The food was delicious!",
    },
    {
        orderId: "789012",
        date: "2023-09-10",
        totalAmount: 32.50,
        items: [
            {
                itemId: "104",
                itemName: "Pizza Margherita",
                quantity: 1,
                price: 14.99,
            },
            {
                itemId: "105",
                itemName: "Caesar Salad",
                quantity: 1,
                price: 7.99,
            },
            {
                itemId: "106",
                itemName: "Chocolate Cake",
                quantity: 2,
                price: 4.49,
            },
        ],
        deliveryAddress: {
            street: "456 Elm Avenue",
            city: "Townsville",
            zipCode: "54321",
        },
        status: "Delivered",
        feedback: "The pizza was amazing!",
    },
    {
        orderId: "345678",
        date: "2023-09-05",
        totalAmount: 22.75,
        items: [
            {
                itemId: "107",
                itemName: "Sushi Combo",
                quantity: 1,
                price: 18.75,
            },
        ],
        deliveryAddress: {
            street: "789 Oak Road",
            city: "Countryside",
            zipCode: "67890",
        },
        status: "Canceled",
        feedback: "Had to cancel due to unforeseen circumstances.",
    },
];


