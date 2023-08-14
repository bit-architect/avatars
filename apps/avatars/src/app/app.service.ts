import {
  Avatar,
  AvatarBauhaus,
  GeneratorOptions,
} from '@bit-architect/avatars-generator';
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
        avatarBuilder = new AvatarBauhaus();
        break;
      case 'marble':
        avatarBuilder = new AvatarBauhaus();
        break;
      case 'pixel':
        avatarBuilder = new AvatarBauhaus();
        break;
      case 'ring':
        avatarBuilder = new AvatarBauhaus();
        break;
      case 'sunset':
        avatarBuilder = new AvatarBauhaus();
        break;
      default:
        throw new BadRequestException(
          `Avatar type "${type}" is not supported. Supported types are: ${availableTypes.join(
            ', '
          )}.`
        );
    }

    const avatar = avatarBuilder.generate(options);
    return avatar;
  }
}
