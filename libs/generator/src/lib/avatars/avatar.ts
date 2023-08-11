import { optimize } from 'svgo';
import { GeneratorOptions } from '../generator.options';

export abstract class Avatar {
  generate(options: GeneratorOptions): string {
    const svg = this.createSVG(options);
    const optimizedSvg = optimize(svg, {});
    return optimizedSvg.data;
  }

  abstract createSVG(options: GeneratorOptions): string;

  protected createMask(maskId: string, size: number, isSquare: boolean) {
    return `
      <mask id="${maskId}" maskUnits="userSpaceOnUse" x="0" y="0" width="${size}" height="${size}">
        <rect width="${size}" height="${size}" rx="${
      isSquare ? undefined : size * 2
    }" fill="#FFFFFF" />
      </mask>
    `;
  }
}
