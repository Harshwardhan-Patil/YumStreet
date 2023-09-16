import UserProfileLayout from "@/components/Layout/UserProfileLayout";
import { fakeUserOrderHistory } from "@/constants/constants";

function OrderHistory() {
  return (
    <main>
      <UserProfileLayout>
        <div>
          <h2 className="text-2xl text-primary font-semibold">Order History</h2>
          {/* //* Temporary  Order Card design */}
          {fakeUserOrderHistory.map((order) => (
            <OrderCard key={order.orderId} order={order} />
          ))}
        </div>
      </UserProfileLayout>
    </main>
  );
}

export default OrderHistory;

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg mb-4 p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Order #{order.orderId}</h3>
        <span className="text-gray-500">{order.date}</span>
      </div>
      <div className="mt-4">
        <ul>
          {order.items.map((item) => (
            <li
              key={item.itemId}
              className="flex justify-between items-center py-2 border-b border-gray-300"
            >
              <div className="flex items-center space-x-2">
                <img
                  src={`https://via.placeholder.com/40x40?text=${item.itemName}`}
                  alt={item.itemName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span>{item.itemName}</span>
              </div>
              <span className="text-gray-500">
                {item.quantity} x ${item.price}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-500">
          Total: ${order.totalAmount.toFixed(2)}
        </span>
        <span className="text-gray-500">{order.status}</span>
      </div>
      <div className="mt-4">
        <p className="text-gray-600">{order.feedback}</p>
      </div>
    </div>
  );
};

