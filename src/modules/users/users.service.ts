import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { UpdateUserDto, UpdateUserRoleDto } from './dto/update-user.dto';
import { PaginationDto, PaginatedResult } from '../../common/dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResult<User>> {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [data, total] = await this.usersRepository.findAndCount({
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findApproved(paginationDto: PaginationDto): Promise<PaginatedResult<User>> {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [data, total] = await this.usersRepository.findAndCount({
      where: { isApproved: true },
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto, currentUser: User): Promise<User> {
    // Users can only update their own profile unless they're admin
    if (currentUser.id !== id && currentUser.role !== UserRole.ADMIN && currentUser.role !== UserRole.SUPER_ADMIN) {
      throw new ForbiddenException('You can only update your own profile');
    }

    const user = await this.findOne(id);

    // Protect admin and super_admin users from being modified by regular admins
    if ((user.role === UserRole.ADMIN || user.role === UserRole.SUPER_ADMIN) && currentUser.role !== UserRole.SUPER_ADMIN) {
      throw new ForbiddenException('Only super admin can modify admin users');
    }

    // Check if email is being changed and if it already exists
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.findByEmail(updateUserDto.email);
      if (existingUser) {
        throw new ForbiddenException('Email already in use');
      }
    }

    // Update user fields
    if (updateUserDto.name !== undefined) user.name = updateUserDto.name;
    if (updateUserDto.email !== undefined) user.email = updateUserDto.email;
    if (updateUserDto.mobileNumber !== undefined) user.mobileNumber = updateUserDto.mobileNumber;
    if (updateUserDto.division !== undefined) user.division = updateUserDto.division;
    if (updateUserDto.district !== undefined) user.district = updateUserDto.district;
    if (updateUserDto.nid !== undefined) user.nid = updateUserDto.nid;
    if (updateUserDto.educationStatus !== undefined) user.educationStatus = updateUserDto.educationStatus;
    if (updateUserDto.organization !== undefined) user.organization = updateUserDto.organization;
    if (updateUserDto.designation !== undefined) user.designation = updateUserDto.designation;
    if (updateUserDto.highestEducation !== undefined) user.highestEducation = updateUserDto.highestEducation;
    if (updateUserDto.educationMajor !== undefined) user.educationMajor = updateUserDto.educationMajor;
    if (updateUserDto.areaOfInterest !== undefined) user.areaOfInterest = updateUserDto.areaOfInterest;
    if (updateUserDto.reasonToJoin !== undefined) user.reasonToJoin = updateUserDto.reasonToJoin;
    if (updateUserDto.profilePhoto !== undefined) user.profilePhoto = updateUserDto.profilePhoto;
    
    // Only admins can update approval status
    if (currentUser.role === UserRole.ADMIN || currentUser.role === UserRole.SUPER_ADMIN) {
      // When approving a user, always set role to MEMBER
      if (updateUserDto.isApproved !== undefined) {
        user.isApproved = updateUserDto.isApproved;
        if (updateUserDto.isApproved === true && !user.role) {
          user.role = UserRole.MEMBER;
        }
      }
      
      // Only super admin can change roles to admin or super_admin
      if (updateUserDto.role !== undefined) {
        if ((updateUserDto.role === UserRole.ADMIN || updateUserDto.role === UserRole.SUPER_ADMIN) && currentUser.role !== UserRole.SUPER_ADMIN) {
          throw new ForbiddenException('Only super admin can assign admin roles');
        }
        user.role = updateUserDto.role;
      }
    }

    return this.usersRepository.save(user);
  }

  async updateRole(id: number, updateRoleDto: UpdateUserRoleDto, currentUser?: User): Promise<User> {
    const user = await this.findOne(id);
    
    // Only super admin can assign admin or super_admin roles
    if ((updateRoleDto.role === UserRole.ADMIN || updateRoleDto.role === UserRole.SUPER_ADMIN)) {
      if (!currentUser || currentUser.role !== UserRole.SUPER_ADMIN) {
        throw new ForbiddenException('Only super admin can assign admin roles');
      }
    }
    
    // Protect admin users from role changes by regular admins
    if ((user.role === UserRole.ADMIN || user.role === UserRole.SUPER_ADMIN)) {
      if (!currentUser || currentUser.role !== UserRole.SUPER_ADMIN) {
        throw new ForbiddenException('Only super admin can modify admin users');
      }
    }
    
    user.role = updateRoleDto.role;
    return this.usersRepository.save(user);
  }

  async remove(id: number, currentUser?: User): Promise<void> {
    const user = await this.findOne(id);
    
    // Protect admin and super_admin users from being deleted
    if ((user.role === UserRole.ADMIN || user.role === UserRole.SUPER_ADMIN)) {
      if (!currentUser || currentUser.role !== UserRole.SUPER_ADMIN) {
        throw new ForbiddenException('Only super admin can delete admin users');
      }
    }
    
    await this.usersRepository.remove(user);
  }
}
