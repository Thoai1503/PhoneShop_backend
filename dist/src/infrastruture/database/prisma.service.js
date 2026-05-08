var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
function getDatabaseConfig() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        throw new Error('DATABASE_URL is required');
    }
    const parsedUrl = new URL(databaseUrl);
    const database = parsedUrl.pathname.replace(/^\//, '');
    if (!database) {
        throw new Error('DATABASE_URL must include a database name');
    }
    return {
        host: parsedUrl.hostname,
        port: parsedUrl.port ? Number(parsedUrl.port) : 3306,
        user: decodeURIComponent(parsedUrl.username),
        password: decodeURIComponent(parsedUrl.password),
        database,
    };
}
let PrismaService = class PrismaService extends PrismaClient {
    constructor() {
        const adapter = new PrismaMariaDb(getDatabaseConfig());
        super({ adapter });
    }
    async onModuleInit() {
        await this.$connect();
    }
};
PrismaService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], PrismaService);
export { PrismaService };
//# sourceMappingURL=prisma.service.js.map