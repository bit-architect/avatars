import { createId } from '@paralleldrive/cuid2';
import { GeneratorOptions } from '../generator.options';
import { getBoolean, getRandomColor, getUnit, hashCode } from '../utils';
import { Avatar } from './avatar';

const ELEMENTS = 4;
const SIZE = 80;

export class AvatarBauhaus extends Avatar {
  override create(options: GeneratorOptions): string {
    const properties = this.generateColors(options.name, options.colors);
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
          <rect width="${SIZE}" height="${SIZE}" fill="${
      properties[0].color
    }" />
          <rect
            x="${(SIZE - 60) / 2}"
            y="${(SIZE - 20) / 2}"
            width="${SIZE}"
            height="${properties[1].isSquare ? SIZE : SIZE / 8}"
            fill="${properties[1].color}"
            transform="
              translate(${properties[1].translateX} ${properties[1].translateY})
              rotate(${properties[1].rotate} ${SIZE / 2} ${SIZE / 2})
            "
          />
          <circle
            cx="${SIZE / 2}"
            cy="${SIZE / 2}"
            fill="${properties[2].color}"
            r="${SIZE / 5}"
            transform="
              translate(${properties[2].translateX} ${properties[2].translateY})
            "
          />
          <line
            x1="0"
            y1="${SIZE / 2}"
            x2="${SIZE}"
            y2="${SIZE / 2}"
            strokeWidth="2"
            stroke="${properties[3].color}"
            transform="
              translate(${properties[3].translateX} ${properties[3].translateY})
              rotate(${properties[3].rotate} ${SIZE / 2} ${SIZE / 2})
            "
          />
        </g>
      </svg>
    `;
  }

  private generateColors(name: string, colors: string[]) {
    const numFromName = hashCode(name);
    const range = colors && colors.length;

    const elementsProperties = Array.from({ length: ELEMENTS }, (_, i) => ({
      color: getRandomColor(numFromName + i, colors, range),
      translateX: getUnit(numFromName * (i + 1), SIZE / 2 - (i + 17), 1),
      translateY: getUnit(numFromName * (i + 1), SIZE / 2 - (i + 17), 2),
      rotate: getUnit(numFromName * (i + 1), 360),
      isSquare: getBoolean(numFromName, 2),
    }));

    return elementsProperties;
  }
}
