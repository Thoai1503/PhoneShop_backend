// src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { CatalogSaveChangesService } from './catalog-save-changes.service.js';
import { PrismaService } from './prisma.service.js';

@Global()
@Module({
  providers: [PrismaService, CatalogSaveChangesService],
  exports: [PrismaService, CatalogSaveChangesService],
})
export class PrismaModule {}
