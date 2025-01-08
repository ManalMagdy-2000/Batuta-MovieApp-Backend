import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import * as NodeCache from 'node-cache';

@Injectable()
export class OmdbService {
  private cache = new NodeCache();

  constructor(private readonly httpService: HttpService) {}

  async searchMovies(query: string, page: number = 1): Promise<any> {
    const cacheKey = `${query}-${page}`;
    const cachedData = this.cache.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const apiKey = process.env.OMDB_API_KEY;
    const url = `https://www.omdbapi.com/?s=${query}&page=${page}&apikey=${apiKey}`;
    const response = await lastValueFrom(this.httpService.get(url));
    this.cache.set(cacheKey, response.data, 3600);
    return response.data;
  }
}