import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { RolesRepository } from './roles.repository';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { NotFoundException } from '@nestjs/common';

describe('RolesService', () => {
  let service: RolesService;
  let repo: Record<keyof RolesRepository, jest.Mock>;

  beforeEach(async () => {
    repo = {
      createRole: jest.fn(),
      findAllRoles: jest.fn(),
      findRoleById: jest.fn(),
      updateRole: jest.fn(),
      removeRole: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesService, { provide: RolesRepository, useValue: repo }],
    }).compile();

    service = module.get<RolesService>(RolesService);
  });

  describe('create', () => {
    it('should create a role and return GetRoleDto', async () => {
      const createDto: CreateRoleDto = { name: 'Admin' };
      const role = new Role();
      role.id = 1;
      role.name = 'Admin';
      role.toDto = jest.fn().mockReturnValue({ id: 1, name: 'Admin' });

      repo.createRole.mockResolvedValue(role);

      const result = await service.create(createDto);
      expect(result).toEqual({ id: 1, name: 'Admin' });
      expect(repo.createRole).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return array of GetRoleDto', async () => {
      const role1 = new Role();
      role1.id = 1;
      role1.name = 'Admin';
      role1.toDto = jest.fn().mockReturnValue({ id: 1, name: 'Admin' });

      const role2 = new Role();
      role2.id = 2;
      role2.name = 'User';
      role2.toDto = jest.fn().mockReturnValue({ id: 2, name: 'User' });

      repo.findAllRoles.mockResolvedValue([role1, role2]);

      const result = await service.findAll();
      expect(result).toEqual([
        { id: 1, name: 'Admin' },
        { id: 2, name: 'User' },
      ]);
    });
  });

  describe('findOne', () => {
    it('should return GetRoleDto if found', async () => {
      const role = new Role();
      role.id = 1;
      role.name = 'Admin';
      role.toDto = jest.fn().mockReturnValue({ id: 1, name: 'Admin' });

      repo.findRoleById.mockResolvedValue(role);

      const result = await service.findOne(1);
      expect(result).toEqual({ id: 1, name: 'Admin' });
    });

    it('should throw NotFoundException if not found', async () => {
      repo.findRoleById.mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update role and return GetRoleDto', async () => {
      const updateDto: UpdateRoleDto = { name: 'SuperAdmin' };
      const role = new Role();
      role.id = 1;
      role.name = 'SuperAdmin';
      role.toDto = jest.fn().mockReturnValue({ id: 1, name: 'SuperAdmin' });

      repo.updateRole.mockResolvedValue(role);

      const result = await service.update(1, updateDto);
      expect(result).toEqual({ id: 1, name: 'SuperAdmin' });
    });

    it('should throw NotFoundException if role not found', async () => {
      const updateDto: UpdateRoleDto = { name: 'SuperAdmin' };
      repo.updateRole.mockResolvedValue(null);

      await expect(service.update(1, updateDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove role and return GetRoleDto', async () => {
      const role = new Role();
      role.id = 1;
      role.name = 'Admin';
      role.toDto = jest.fn().mockReturnValue({ id: 1, name: 'Admin' });

      repo.removeRole.mockResolvedValue(role);

      const result = await service.remove(1);
      expect(result).toEqual({ id: 1, name: 'Admin' });
    });

    it('should throw NotFoundException if role not found', async () => {
      repo.removeRole.mockResolvedValue(null);
      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
