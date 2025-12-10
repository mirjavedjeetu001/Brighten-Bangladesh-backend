import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MagazinesService } from './magazines.service';
import { CreateMagazineDto, UpdateMagazineDto } from './dto/magazine.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { UserRole } from '../users/entities/user.entity';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Magazines')
@Controller('magazines')
export class MagazinesController {
  constructor(private readonly magazinesService: MagazinesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new magazine (Admin only)' })
  @ApiResponse({ status: 201, description: 'Magazine created successfully' })
  create(@Body() createMagazineDto: CreateMagazineDto) {
    return this.magazinesService.create(createMagazineDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all magazines' })
  @ApiResponse({ status: 200, description: 'List of magazines' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.magazinesService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get magazine by ID' })
  @ApiResponse({ status: 200, description: 'Magazine found' })
  @ApiResponse({ status: 404, description: 'Magazine not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.magazinesService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update magazine (Admin only)' })
  @ApiResponse({ status: 200, description: 'Magazine updated successfully' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMagazineDto: UpdateMagazineDto) {
    return this.magazinesService.update(id, updateMagazineDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete magazine (Admin only)' })
  @ApiResponse({ status: 200, description: 'Magazine deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.magazinesService.remove(id);
  }
}
