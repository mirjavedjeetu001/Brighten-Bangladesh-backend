import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, Query, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ContactService } from '../services/contact.service';
import { CreateContactSubmissionDto } from '../dto/contact-submission.dto';
import { ContactSubmission, SubmissionStatus } from '../entities/contact-submission.entity';

@ApiTags('CMS - Contact')
@Controller('cms/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Submit contact form' })
  @ApiResponse({ status: 201, description: 'Contact form submitted' })
  create(
    @Body() dto: CreateContactSubmissionDto,
    @Req() req: Request,
  ): Promise<ContactSubmission> {
    const ipAddress = req.ip || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    return this.contactService.create(dto, ipAddress, userAgent);
  }

  @Get('submissions')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all contact submissions' })
  @ApiResponse({ status: 200, description: 'Return all submissions' })
  findAll(@Query('status') status?: SubmissionStatus): Promise<ContactSubmission[]> {
    return this.contactService.findAll(status);
  }

  @Get('submissions/unread-count')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get unread submissions count' })
  @ApiResponse({ status: 200, description: 'Return unread count' })
  getUnreadCount(): Promise<number> {
    return this.contactService.getUnreadCount();
  }

  @Get('submissions/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get contact submission by ID' })
  @ApiResponse({ status: 200, description: 'Return submission' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ContactSubmission> {
    return this.contactService.findOne(id);
  }

  @Put('submissions/:id/status')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update submission status' })
  @ApiResponse({ status: 200, description: 'Status updated' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: SubmissionStatus,
  ): Promise<ContactSubmission> {
    return this.contactService.updateStatus(id, status);
  }

  @Delete('submissions/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete contact submission' })
  @ApiResponse({ status: 200, description: 'Submission deleted' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.contactService.remove(id);
  }
}
