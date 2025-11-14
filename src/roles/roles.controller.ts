import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { GetRoleDto } from './dto/get-role.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  @ApiCreatedResponse({
    description: 'Role successfully created',
    type: GetRoleDto,
  })
  create(@Body() createRoleDto: CreateRoleDto) {
    const role = this.rolesService.create(createRoleDto);
    return { message: 'Role successfully created', data: role };
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiOkResponse({
    description: 'List of roles',
    type: GetRoleDto,
    isArray: true,
  })
  findAll() {
    const roles = this.rolesService.findAll();
    return { message: 'Roles retrieved successfully', data: roles };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a role by id' })
  @ApiOkResponse({
    description: 'Role retrieved successfully',
    type: GetRoleDto,
  })
  findOne(@Param('id') id: string) {
    const role = this.rolesService.findOne(+id);
    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    return { message: 'Role retrieved successfully', data: role };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a role by id' })
  @ApiOkResponse({ description: 'Role updated successfully', type: GetRoleDto })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    const role = this.rolesService.update(+id, updateRoleDto);
    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    return { message: 'Role updated successfully', data: role };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a role by id' })
  @ApiOkResponse({ description: 'Role deleted successfully' })
  remove(@Param('id') id: string) {
    const removed = this.rolesService.remove(+id);
    if (!removed) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    return { message: 'Role deleted successfully', data: removed };
  }
}
