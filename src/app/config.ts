const baseUrl = 'https://boa-payments-default-rtdb.firebaseio.com/users/';

export const endpoints = {
  getOrders: (userId: string, token: string) =>
    `${baseUrl}${userId}/orders.json?auth=${token}`,
};
