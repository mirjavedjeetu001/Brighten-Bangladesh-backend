import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { NavigationMenu } from './entities/navigation-menu.entity';
import { CreateNavigationMenuDto, UpdateNavigationMenuDto, ReorderMenuDto } from './dto/navigation-menu.dto';
import { User, UserRole } from '../users/entities/user.entity';

@Injectable()
export class NavigationMenuService {
  constructor(
    @InjectRepository(NavigationMenu)
    private menuRepository: Repository<NavigationMenu>,
  ) {}

  async findAll(): Promise<NavigationMenu[]> {
    return this.menuRepository.find({
      where: { isActive: true },
      order: { displayOrder: 'ASC' },
    });
  }

  async findAllAdmin(): Promise<NavigationMenu[]> {
    return this.menuRepository.find({
      order: { displayOrder: 'ASC' },
    });
  }

  async findOne(id: number): Promise<NavigationMenu> {
    const menu = await this.menuRepository.findOne({ where: { id } });
    if (!menu) {
      throw new NotFoundException('Menu item not found');
    }
    return menu;
  }

  async create(createDto: CreateNavigationMenuDto, user: User): Promise<NavigationMenu> {
    const canCreate = [UserRole.SUPER_ADMIN, UserRole.ADMIN].includes(user.role);
    if (!canCreate) {
      throw new ForbiddenException('You do not have permission to create menu items');
    }

    const menu = this.menuRepository.create(createDto);
    return this.menuRepository.save(menu);
  }

  async update(id: number, updateDto: UpdateNavigationMenuDto, user: User): Promise<NavigationMenu> {
    const canUpdate = [UserRole.SUPER_ADMIN, UserRole.ADMIN].includes(user.role);
    if (!canUpdate) {
      throw new ForbiddenException('You do not have permission to update menu items');
    }

    const menu = await this.findOne(id);
    Object.assign(menu, updateDto);
    return this.menuRepository.save(menu);
  }

  async remove(id: number, user: User): Promise<void> {
    const canDelete = [UserRole.SUPER_ADMIN, UserRole.ADMIN].includes(user.role);
    if (!canDelete) {
      throw new ForbiddenException('You do not have permission to delete menu items');
    }

    const menu = await this.findOne(id);
    
    if (menu.isSystem) {
      throw new BadRequestException('Cannot delete system menu items');
    }

    await this.menuRepository.remove(menu);
  }

  async reorder(reorderDto: ReorderMenuDto, user: User): Promise<NavigationMenu[]> {
    const canReorder = [UserRole.SUPER_ADMIN, UserRole.ADMIN].includes(user.role);
    if (!canReorder) {
      throw new ForbiddenException('You do not have permission to reorder menu items');
    }

    const menus = await this.menuRepository.findBy({ id: In(reorderDto.menuIds) });
    
    reorderDto.menuIds.forEach((id, index) => {
      const menu = menus.find(m => m.id === id);
      if (menu) {
        menu.displayOrder = index;
      }
    });

    return this.menuRepository.save(menus);
  }
}
