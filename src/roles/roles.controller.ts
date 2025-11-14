import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
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
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiInternalServerErrorResponse({ description: 'Failed to create role' })
  async create(@Body() createRoleDto: CreateRoleDto) {
    const role = await this.rolesService.create(createRoleDto);
    return { message: 'Role successfully created', data: role };
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiOkResponse({
    description: 'List of roles retrieved successfully',
    type: GetRoleDto,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({ description: 'Failed to retrieve roles' })
  async findAll() {
    const roles = await this.rolesService.findAll();
    return { message: 'Roles retrieved successfully', data: roles };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a role by id' })
  @ApiOkResponse({
    description: 'Role retrieved successfully',
    type: GetRoleDto,
  })
  @ApiNotFoundResponse({ description: 'Role not found' })
  @ApiInternalServerErrorResponse({ description: 'Failed to retrieve role' })
  async findOne(@Param('id') id: string) {
    const role = await this.rolesService.findOne(+id);
    return { message: 'Role retrieved successfully', data: role };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a role by id' })
  @ApiOkResponse({ description: 'Role updated successfully', type: GetRoleDto })
  @ApiNotFoundResponse({ description: 'Role not found' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiInternalServerErrorResponse({ description: 'Failed to update role' })
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    const role = await this.rolesService.update(+id, updateRoleDto);
    return { message: 'Role updated successfully', data: role };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a role by id' })
  @ApiOkResponse({ description: 'Role deleted successfully', type: GetRoleDto })
  @ApiNotFoundResponse({ description: 'Role not found' })
  @ApiInternalServerErrorResponse({ description: 'Failed to delete role' })
  async remove(@Param('id') id: string) {
    const removed = await this.rolesService.remove(+id);
    return { message: 'Role deleted successfully', data: removed };
  }
}
