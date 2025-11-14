import { ApiProperty } from '@nestjs/swagger';

export class GetRoleDto {
  @ApiProperty({ description: 'Unique role ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Role name', example: 'Admin' })
  name: string;
}
