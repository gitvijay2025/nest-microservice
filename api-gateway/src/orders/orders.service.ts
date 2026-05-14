import { Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';

import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  async getOrders() {

    const response =
      await firstValueFrom(

        this.httpService.get(
          `${process.env.ORDER_SERVICE_URL}/orders`,
        ),
      );

    return response.data;
  }
}