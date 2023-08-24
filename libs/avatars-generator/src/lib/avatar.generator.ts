import { optimize } from 'svgo';
import { Avatar } from './avatars/avatar';
import { GeneratorOptions } from './generator.options';

export class AvatarGenerator {
  generate(avatar: Avatar, config: GeneratorOptions): string {
    const svg = avatar.create(config);
    const optimizedSvg = optimize(svg, {});
    return optimizedSvg.data;
  }
}
