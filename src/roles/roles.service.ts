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
    const role = await this.rolesRepo
      .createRole(createRoleDto)
      .catch((error: unknown) => {
        const errorMessage =
          error instanceof Error ? error.stack : String(error);
        this.logger.error('Failed to create role', errorMessage);
        throw new InternalServerErrorException('Failed to create role');
      });

    return role.toDto();
  }

  async findAll(): Promise<GetRoleDto[]> {
    const roles = await this.rolesRepo
      .findAllRoles()
      .catch((error: unknown) => {
        const errorMessage =
          error instanceof Error ? error.stack : String(error);
        this.logger.error('Failed to retrieve roles', errorMessage);
        throw new InternalServerErrorException('Failed to retrieve roles');
      });

    return Role.toDtoList(roles);
  }

  async findOne(id: number): Promise<GetRoleDto> {
    const role = await this.rolesRepo
      .findRoleById(id)
      .catch((error: unknown) => {
        const errorMessage =
          error instanceof Error ? error.stack : String(error);
        this.logger.error(`Failed to retrieve role ID ${id}`, errorMessage);
        throw new InternalServerErrorException('Failed to retrieve role');
      });

    if (!role) throw new NotFoundException(`Role with id ${id} not found`);
    return role.toDto();
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<GetRoleDto> {
    const role = await this.rolesRepo
      .updateRole(id, updateRoleDto)
      .catch((error: unknown) => {
        const errorMessage =
          error instanceof Error ? error.stack : String(error);
        this.logger.error(`Failed to update role ID ${id}`, errorMessage);
        throw new InternalServerErrorException('Failed to update role');
      });

    if (!role) throw new NotFoundException(`Role with id ${id} not found`);
    return role.toDto();
  }

  async remove(id: number): Promise<GetRoleDto> {
    const role = await this.rolesRepo.removeRole(id).catch((error: unknown) => {
      const errorMessage = error instanceof Error ? error.stack : String(error);
      this.logger.error(`Failed to delete role ID ${id}`, errorMessage);
      throw new InternalServerErrorException('Failed to delete role');
    });

    if (!role) throw new NotFoundException(`Role with id ${id} not found`);
    return role.toDto();
  }
}
