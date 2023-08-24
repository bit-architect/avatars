import {
  Avatar,
  AvatarBauhaus,
  AvatarBeam,
  AvatarGenerator,
  AvatarMarble,
  AvatarPixel,
  AvatarRing,
  AvatarSunset,
  GeneratorOptions,
} from '@avatars/avatars-generator';
import { BadRequestException, Injectable } from '@nestjs/common';

const availableTypes = ['bauhaus', 'beam', 'marble', 'pixel', 'ring', 'sunset'];
@Injectable()
export class AppService {
  createAvatar(type: string, options: GeneratorOptions): string {
    let avatarBuilder: Avatar = null;
    switch (type) {
      case 'bauhaus':
        avatarBuilder = new AvatarBauhaus();
        break;
      case 'beam':
        avatarBuilder = new AvatarBeam();
        break;
      case 'marble':
        avatarBuilder = new AvatarMarble();
        break;
      case 'pixel':
        avatarBuilder = new AvatarPixel();
        break;
      case 'ring':
        avatarBuilder = new AvatarRing();
        break;
      case 'sunset':
        avatarBuilder = new AvatarSunset();
        break;
      default:
        throw new BadRequestException(
          `Avatar type "${type}" is not supported. Supported types are: ${availableTypes.join(
            ', '
          )}.`
        );
    }

    const avatar = new AvatarGenerator().generate(avatarBuilder, options);
    return avatar;
  }
}
