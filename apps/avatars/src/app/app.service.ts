import { AvatarBauhaus } from '@bit-architect/avatars-generator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { avatar: string } {
    const options = {
      name: 'asfda8s7xfzasefa',
      colors: ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'],
      size: 80,
      isSquare: false,
    };

    const avatar = new AvatarBauhaus().generate(options);
    return { avatar: avatar };
  }
}
