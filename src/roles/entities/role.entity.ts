import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { GetRoleDto } from '../dto/get-role.dto';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  toDto(): GetRoleDto {
    return { id: this.id, name: this.name };
  }

  static toDtoList(roles: Role[]): GetRoleDto[] {
    return roles.map((r) => r.toDto());
  }
}
