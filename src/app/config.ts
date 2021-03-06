const baseUrl = 'https://boa-payments-default-rtdb.firebaseio.com/users/';

export const endpoints = {
  getCategories: (userId: string, token: string) =>
    `${baseUrl}${userId}/categories.json?auth=${token}`,
  getEntities: (userId: string, token: string) =>
    `${baseUrl}${userId}/entities.json?auth=${token}`,
  getOrders: (userId: string, token: string) =>
    `${baseUrl}${userId}/orders.json?auth=${token}`,
  updateOrder: (userId: string, token: string, orderId: string) =>
    `${baseUrl}${userId}/orders/${orderId}.json?auth=${token}`,
  getPayments: (userId: string, token: string) =>
    `${baseUrl}${userId}/payments.json?auth=${token}`,
};
