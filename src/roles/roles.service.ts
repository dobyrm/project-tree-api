import {
  Injectable,
  Logger,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { RolesRepository } from './roles.repository';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { GetRoleDto } from './dto/get-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);

  constructor(private readonly rolesRepo: RolesRepository) {}
  async create(createRoleDto: CreateRoleDto): Promise<GetRoleDto> {
    try {
      const role = await this.rolesRepo.createRole(createRoleDto);
      return role.toDto();
    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error(String(error));
      this.logger.error('Failed to create role', err.stack);
      throw new InternalServerErrorException('Failed to create role');
    }
  }

  async findAll(): Promise<GetRoleDto[]> {
    try {
      const roles = await this.rolesRepo.findAllRoles();
      return Role.toDtoList(roles);
    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error(String(error));
      this.logger.error('Failed to retrieve roles', err.stack);
      throw new InternalServerErrorException('Failed to retrieve roles');
    }
  }

  async findOne(id: number): Promise<GetRoleDto> {
    try {
      const role = await this.rolesRepo.findRoleById(id);
      if (!role) throw new NotFoundException(`Role with id ${id} not found`);
      return role.toDto();
    } catch (error: unknown) {
      if (error instanceof NotFoundException) throw error;
      const err = error instanceof Error ? error : new Error(String(error));
      this.logger.error(`Failed to retrieve role ID ${id}`, err.stack);
      throw new InternalServerErrorException('Failed to retrieve role');
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<GetRoleDto> {
    try {
      const role = await this.rolesRepo.updateRole(id, updateRoleDto);
      if (!role) throw new NotFoundException(`Role with id ${id} not found`);
      return role.toDto();
    } catch (error: unknown) {
      if (error instanceof NotFoundException) throw error;
      const err = error instanceof Error ? error : new Error(String(error));
      this.logger.error(`Failed to update role ID ${id}`, err.stack);
      throw new InternalServerErrorException('Failed to update role');
    }
  }

  async remove(id: number): Promise<GetRoleDto> {
    try {
      const role = await this.rolesRepo.removeRole(id);
      if (!role) throw new NotFoundException(`Role with id ${id} not found`);
      return role.toDto();
    } catch (error: unknown) {
      if (error instanceof NotFoundException) throw error;
      const err = error instanceof Error ? error : new Error(String(error));
      this.logger.error(`Failed to delete role ID ${id}`, err.stack);
      throw new InternalServerErrorException('Failed to delete role');
    }
  }
}
