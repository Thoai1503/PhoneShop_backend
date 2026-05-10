import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import request from 'supertest';
import { ProvinceController } from '../src/api/controller/province.controller.js';
import { OrderController } from '../src/api/controller/order.controller.js';
import { ProvinceService } from '../src/application/service/province.service.js';
import { OrderService } from '../src/application/service/order.service.js';

describe('Response Format Compatibility (e2e)', () => {
  let app: INestApplication;

  const provinceServiceMock = {
    findAll: jest.fn(async () => [
      { id: 1, name: 'Hanoi', code: 'HN', status: 1 },
      { id: 2, name: 'HCM', code: 'HCM', status: 1 },
    ]),
  };

  const orderServiceMock = {
    findAll: jest.fn(async () => [
      {
        id: 101,
        user_id: 1,
        discount: 0,
        total: 100,
        status: 1,
        user: { phone: '0901111111' },
      },
      {
        id: 102,
        user_id: 2,
        discount: 0,
        total: 120,
        status: 1,
        user: { phone: '0912222222' },
      },
    ]),
    getByUserId: jest.fn(async () => [
      { id: 101, user_id: 1, discount: 0, total: 100, status: 1 },
    ]),
    findById: jest.fn(async (id: number) => ({
      id,
      user_id: 1,
      discount: 0,
      total: 100,
      status: 1,
    })),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ProvinceController, OrderController],
      providers: [
        {
          provide: ProvinceService,
          useValue: provinceServiceMock,
        },
        {
          provide: OrderService,
          useValue: orderServiceMock,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('returns legacy response by default', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/province')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].name).toBe('Hanoi');
  });

  it('returns standardized envelope when x-response-format=standard', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/province')
      .set('x-response-format', 'standard')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.statusCode).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data[0].name).toBe('Hanoi');
  });

  it('keeps order paging shape and supports standard mode', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/order?page=1&search=090')
      .set('x-response-format', 'standard')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.page).toBe(1);
    expect(Array.isArray(response.body.data.list)).toBe(true);
    expect(response.body.data.list.length).toBe(1);
  });

  it('still returns legacy list for user orders when no format header', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/order/user/1')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].id).toBe(101);
  });
});
