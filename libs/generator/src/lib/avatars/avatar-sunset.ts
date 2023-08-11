import { createId } from '@paralleldrive/cuid2';
import { GeneratorOptions } from '../generator.options';
import { getRandomColor, hashCode } from '../utils';
import { Avatar } from './avatar';

const ELEMENTS = 4;
const SIZE = 80;

export class AvatarSunset extends Avatar {
  override generate(options: GeneratorOptions): string {
    const sunsetColors = this.generateColors(options.name, options.colors);
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
          <path fill="url(#gradient_paint0_linear_${
            options.name
          })" d="M0 0h80v40H0z" />
          <path fill="url(#gradient_paint1_linear_${
            options.name
          })" d="M0 40h80v40H0z" />
        </g>

        <defs>
          <linearGradient
            id="gradient_paint0_linear_${options.name}"
            x1="${SIZE / 2}"
            y1="0"
            x2="${SIZE / 2}"
            y2="${SIZE / 2}"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="${sunsetColors[0]}" />
            <stop offset="1" stop-color="${sunsetColors[1]}" />
          </linearGradient>
          <linearGradient
            id="gradient_paint1_linear_${options.name}"
            x1="${SIZE / 2}"
            y1="${SIZE / 2}"
            x2="${SIZE / 2}"
            y2="${SIZE}"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="${sunsetColors[2]}" />
            <stop offset="1" stop-color="${sunsetColors[3]}" />
          </linearGradient>
        </defs>
      </svg>
    `;
  }

  private generateColors(name: string, colors: string[]) {
    const numFromName = hashCode(name);
    const range = colors && colors.length;

    const colorsList = Array.from({ length: ELEMENTS }, (_, i) =>
      getRandomColor(numFromName + i, colors, range)
    );

    return colorsList;
  }
}
