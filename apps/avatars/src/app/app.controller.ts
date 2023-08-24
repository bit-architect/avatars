import { Controller, Get, Header, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { GeneratorOptions } from '@avatars/avatars-generator';

const defaultAvatarOptions: GeneratorOptions = {
  name: '',
  colors: ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'],
  size: 80,
  isSquare: false,
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:type/:name')
  @Header('Content-Type', 'image/svg+xml')
  getData(
    @Param('type') type: string,
    @Param('name') name: string,
    @Query() query: any
  ) {
    const queryOptions: Partial<GeneratorOptions> = {};

    queryOptions.name = name;
    queryOptions.size = +query.size || defaultAvatarOptions.size;

    if ('square' in query) {
      queryOptions.isSquare = true;
    }

    if ('colors' in query) {
      queryOptions.colors = query.colors
        .split(',')
        .map((color: string) => (color.startsWith('#') ? color : `#${color}`));
    }

    const options: GeneratorOptions = {
      ...defaultAvatarOptions,
      ...queryOptions,
    };

    return this.appService.createAvatar(type, options);
  }
}
