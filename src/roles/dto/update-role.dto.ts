import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiProperty({ description: 'Role name', example: 'Admin' })
  name: string;
}
