import { Controller, Get, Query } from '@nestjs/common';
import { OmdbService } from '../../services/omdb/omdb.service';

@Controller('omdb')
export class OmdbController {
  constructor(private readonly omdbService: OmdbService) {}

  @Get('search')
  async search(@Query('q') query: string, @Query('page') page: string) {
    return this.omdbService.searchMovies(query, parseInt(page, 10) || 1);
  }
}