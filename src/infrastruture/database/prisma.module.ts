// src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { CatalogSaveChangesService } from './catalog-save-changes.service';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService, CatalogSaveChangesService],
  exports: [PrismaService, CatalogSaveChangesService],
})
export class PrismaModule {}
