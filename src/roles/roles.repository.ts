import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesRepository {
  constructor(
    @InjectRepository(Role)
    private readonly repo: Repository<Role>,
  ) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.repo.create(createRoleDto);
    return this.repo.save(role);
  }

  async findAllRoles(): Promise<Role[]> {
    return this.repo.find();
  }

  async findRoleById(id: number): Promise<Role | null> {
    return this.repo.findOneBy({ id });
  }

  async updateRole(
    id: number,
    updateRoleDto: UpdateRoleDto,
  ): Promise<Role | null> {
    const role = await this.repo.findOneBy({ id });
    if (!role) return null;

    Object.assign(role, updateRoleDto);
    return this.repo.save(role);
  }

  async removeRole(id: number): Promise<Role | null> {
    const role = await this.repo.findOneBy({ id });
    if (!role) return null;

    await this.repo.remove(role);
    return role;
  }
}
