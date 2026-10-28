/**
 * Sanjus Bakesvelle — Order Store (Frontend Mock Service)
 *
 * Frontend-only in-memory order management.
 * Clearly labelled as DEMO data — not persisted to any backend.
 * Future integration point: Replace with real API calls.
 */

export const ORDER_STATUSES = [
  "Pending",
  "Confirmed",
  "Preparing",
  "Ready",
  "Out for Delivery",
  "Completed",
  "Cancelled",
];

export const PAYMENT_STATUSES = [
  "Pending",
  "Paid",
  "Refunded",
];

// Mock seed orders for demo
const seedOrders = [
  {
    id: "ORD-DEMO-001",
    customerDetails: { name: "Priya Sharma", phone: "9876543210", address: "12, Rose Garden, Thiruvallur" },
    items: [{ name: "Chocolate Truffle", quantity: 1, selectedSize: "1 kg", price: 950 }],
    customisations: "Extra sprinkles, no nut",
    subtotal: 950,
    deliveryCharge: null,
    deliveryChargeStatus: "pending-confirmation",
    fulfilmentMethod: "delivery",
    paymentMethod: "cash-on-delivery",
    paymentStatus: "Pending",
    orderStatus: "Confirmed",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    isDemo: true,
  },
  {
    id: "ORD-DEMO-002",
    customerDetails: { name: "Arun Kumar", phone: "9123456789", address: "" },
    items: [
      { name: "Princess Cake", quantity: 1, selectedSize: "0.5 kg", price: 720 },
      { name: "Dark Chocolate Truffle", quantity: 1, selectedSize: "1 kg", price: 950 },
    ],
    customisations: "Write: Happy Birthday Riya",
    subtotal: 1670,
    deliveryCharge: 0,
    deliveryChargeStatus: "confirmed",
    fulfilmentMethod: "pickup",
    paymentMethod: "in-person-cash",
    paymentStatus: "Pending",
    orderStatus: "Preparing",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    isDemo: true,
  },
];

let _orders = [...seedOrders];
let _listeners = [];

function notify() { _listeners.forEach((fn) => fn([..._orders])); }

export const orderStore = {
  subscribe(fn) {
    _listeners.push(fn);
    fn([..._orders]);
    return () => { _listeners = _listeners.filter((l) => l !== fn); };
  },

  getAll() { return [..._orders]; },

  getById(id) { return _orders.find((o) => o.id === id) ?? null; },

  create(data) {
    const order = {
      id: `ORD-${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString(),
      isDemo: true,
    };
    _orders = [order, ..._orders];
    notify();
    return order;
  },

  updateStatus(id, orderStatus) {
    _orders = _orders.map((o) => o.id === id ? { ...o, orderStatus } : o);
    notify();
  },

  updatePaymentStatus(id, paymentStatus) {
    _orders = _orders.map((o) => o.id === id ? { ...o, paymentStatus } : o);
    notify();
  },
};
