import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NavigationMenuService } from './navigation-menu.service';
import { CreateNavigationMenuDto, UpdateNavigationMenuDto, ReorderMenuDto } from './dto/navigation-menu.dto';

@ApiTags('navigation-menus')
@Controller('cms/navigation-menus')
export class NavigationMenuController {
  constructor(private readonly menuService: NavigationMenuService) {}

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get('all')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findAllAdmin() {
    return this.menuService.findAllAdmin();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createDto: CreateNavigationMenuDto, @Request() req) {
    return this.menuService.create(createDto, req.user);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateDto: UpdateNavigationMenuDto, @Request() req) {
    return this.menuService.update(+id, updateDto, req.user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string, @Request() req) {
    return this.menuService.remove(+id, req.user);
  }

  @Patch('reorder')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  reorder(@Body() reorderDto: ReorderMenuDto, @Request() req) {
    return this.menuService.reorder(reorderDto, req.user);
  }
}
