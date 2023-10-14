import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty()
  username: string;
}
