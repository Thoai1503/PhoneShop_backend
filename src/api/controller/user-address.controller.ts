import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { UserAddressService } from '../../application/service/user-address.service.js';
import { UserAddressDTO } from '../dto/user-address.dto.js';
import { respondSuccess } from '../../common/http/response.util.js';

@Controller('api/v1/useraddress')
export class UserAddressController {
  constructor(private readonly service: UserAddressService) {}

  @Post()
  async createNewAddress(
    @Req() req: Request,
    @Body() body: Omit<UserAddressDTO, 'id'>,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    const dto = new UserAddressDTO();
    dto.id = 0;
    dto.user_id = body.user_id;
    dto.full_name = body.full_name;
    dto.phone = body.phone;
    dto.province_id = body.province_id;
    dto.district_id = body.district_id;
    dto.ward_id = body.ward_id;
    dto.address_detail = body.address_detail;
    dto.address_type = 1;
    dto.is_default = body.is_default;
    dto.status = 1;

    const result = await this.service.create(dto);
    return respondSuccess(req, res, 201, result, {
      message: 'Address created',
      data: result,
    });
  }

  @Get('user/:user_id')
  async findByUserId(
    @Req() req: Request,
    @Param('user_id', ParseIntPipe) userId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    const list = await this.service.findByUserId(userId);
    return respondSuccess(req, res, 200, list);
  }

  @Put(':id')
  async updateAddress(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UserAddressDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    const dto = new UserAddressDTO();
    dto.id = body.id;
    dto.user_id = body.user_id;
    dto.full_name = body.full_name;
    dto.phone = body.phone;
    dto.province_id = body.province_id;
    dto.district_id = body.district_id;
    dto.ward_id = body.ward_id;
    dto.address_detail = body.address_detail;
    dto.address_type = 1;
    dto.is_default = body.is_default;
    dto.status = 1;

    const result = await this.service.update(id, dto);
    return respondSuccess(req, res, 200, result, {
      message: 'Address updated',
      data: result,
    });
  }
}
