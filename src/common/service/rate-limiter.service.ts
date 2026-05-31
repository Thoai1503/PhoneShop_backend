import { Injectable } from '@nestjs/common';

@Injectable()
export class RateLimiterService {
  private readonly store = new Map<
    string,
    { count: number; resetTime: number }
  >();

  /**
   * Kiểm tra rate limit
   * @param key - IP hoặc User ID
   * @param limit - Số request tối đa
   * @param ttl - Thời gian (ms)
   * @returns true nếu được phép, false nếu bị chặn
   */
  isAllowed(key: string, limit: number = 100, ttl: number = 60000): boolean {
    const now = Date.now();
    const record = this.store.get(key);

    if (!record) {
      this.store.set(key, { count: 1, resetTime: now + ttl });
      return true;
    }

    // Reset window nếu hết thời gian
    if (now > record.resetTime) {
      this.store.set(key, { count: 1, resetTime: now + ttl });
      return true;
    }

    // Tăng counter
    if (record.count < limit) {
      record.count++;
      return true;
    }

    return false; // Đã vượt limit
  }

  // Xóa dữ liệu (dùng khi cần)
  clear(key?: string) {
    if (key) this.store.delete(key);
    else this.store.clear();
  }
}
