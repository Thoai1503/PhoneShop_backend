export declare class RateLimiterService {
    private readonly store;
    isAllowed(key: string, limit?: number, ttl?: number): boolean;
    clear(key?: string): void;
}
