import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { UserAddressDTO } from '../../api/dto/user-address.dto.js';

@Injectable()
export class UserAddressRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async create(item: UserAddressDTO): Promise<number> {
    if (item.is_default) {
      await this.prisma.user_addresses.updateMany({
        where: { user_id: item.user_id, is_default: true },
        data: { is_default: false },
      });
    }

    const result = await this.prisma.user_addresses.create({
      data: {
        user_id: item.user_id,
        full_name: item.full_name,
        phone: item.phone,
        province_id: Number(item.province_id),
        district_id: Number(item.district_id),
        ward_id: Number(item.ward_id),
        address_detail: item.address_detail,
        address_type: item.address_type,
        is_default: item.is_default,
      },
    });

    if (!result) return 0;
    return 1;
  }

  async update(id: number, item: UserAddressDTO): Promise<boolean> {
    const current = await this.prisma.user_addresses.findUnique({
      where: { id },
    });
    if (!current) {
      throw new Error('Address not found');
    }

    if (item.is_default) {
      await this.prisma.user_addresses.updateMany({
        where: { user_id: current.user_id, is_default: true },
        data: { is_default: false },
      });
    }

    const result = await this.prisma.user_addresses.update({
      where: { id },
      data: {
        // user_id: item.user_id,
        users: {
          connect: {
            id: Number(current.user_id),
          },
        },

        full_name: current.full_name,
        phone: current.phone,
        //  province_id: Number(item.province_id),
        provinces: {
          connect: { id: Number(current.province_id) },
        },
        //  district_id: Number(item.district_id),
        districts: {
          connect: { id: Number(current.district_id) },
        },
        //  district_id: Number(item.district_id),
        // district_id: Number(item.district_id),
        //ward_id: Number(item.ward_id),
        wards: {
          connect: { id: Number(current.ward_id) },
        },
        address_detail: current.address_detail,
        address_type: current.address_type,
        is_default: true,
        updated_at: new Date(),
      },
    });

    return !!result;
  }

  async findByUserId(userId: number): Promise<any[]> {
    return this.prisma.user_addresses.findMany({
      where: {
        user_id: userId,
      },
      include: {
        users: true,
        provinces: true,
        districts: true,
        wards: true,
      },
    });
  }
}
