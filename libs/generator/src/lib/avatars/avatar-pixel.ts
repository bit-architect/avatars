import { GeneratorOptions } from '../generator.options';
import { getRandomColor, hashCode } from '../utils';
import { Avatar } from './avatar';
import { createId } from '@paralleldrive/cuid2';

const ELEMENTS = 64;
const SIZE = 80;

export class AvatarPixel extends Avatar {
  create(options: GeneratorOptions): string {
    const pixelColors = this.generateColors(options.name, options.colors);
    const maskId = createId();

    return `
    <svg
      viewBox="0 0 ${SIZE} ${SIZE}"
      fill="none"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="${options.size}"
      height="${options.size}"
    >
      <title>${options.name}</title>
      ${this.createMask(maskId, SIZE, options.isSquare)}
      <g mask="url(#${maskId})">
        ${this.generateRects(pixelColors)}

      </g>
    </svg>
    `;
  }

  private generateColors(name: string, colors: string[]) {
    const numFromName = hashCode(name);
    const range = colors && colors.length;

    const colorList = Array.from({ length: ELEMENTS }, (_, i) =>
      getRandomColor(numFromName % (i + 1), colors, range)
    );

    return colorList;
  }

  private generateRects(colors: string[]) {
    const rects: string[] = [];
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        rects.push(
          `<rect x="${x * 10}" y="${y * 10}" width="10" height="10" fill="${
            colors[y * 8 + x]
          }" />`
        );
      }
    }
    return rects.join('');
  }
}
