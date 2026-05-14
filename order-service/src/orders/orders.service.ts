import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {

  getOrders() {

    return [
      {
        id: 1,
        product: 'Laptop',
        amount: 50000,
      },

      {
        id: 2,
        product: 'Phone',
        amount: 25000,
      },
    ];
  }
}