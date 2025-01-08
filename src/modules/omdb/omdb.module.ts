// src/modules/omdb/omdb.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OmdbService } from '../../services/omdb/omdb.service';

import { OmdbController } from 'src/controller/omdb/omdb.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [HttpModule, CacheModule.register()],
  controllers: [OmdbController],
  providers: [OmdbService],
})
export class OmdbModule {}