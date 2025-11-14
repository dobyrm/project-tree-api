import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  private roles: Role[] = [];
  private idCounter = 1;

  create(createRoleDto: CreateRoleDto): Role {
    const newRole: Role = { id: this.idCounter++, ...createRoleDto };
    this.roles.push(newRole);
    return newRole;
  }

  findAll(): Role[] {
    return this.roles;
  }

  findOne(id: number): Role | null {
    return this.roles.find((role) => role.id === id) || null;
  }

  update(id: number, updateRoleDto: UpdateRoleDto): Role | null {
    const roleIndex = this.roles.findIndex((role) => role.id === id);
    if (roleIndex === -1) return null;

    this.roles[roleIndex] = { ...this.roles[roleIndex], ...updateRoleDto };
    return this.roles[roleIndex];
  }

  remove(id: number): Role | null {
    const roleIndex = this.roles.findIndex((role) => role.id === id);
    if (roleIndex === -1) return null;

    const removed = this.roles.splice(roleIndex, 1);
    return removed[0];
  }
}
