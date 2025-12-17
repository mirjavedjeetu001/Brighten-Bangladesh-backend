import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { BlogsService } from '../blogs.service';

@Controller('share/blog')
export class ShareController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get(':slug')
  async shareBlog(@Param('slug') slug: string, @Res() res: Response) {
    try {
      const blog = await this.blogsService.findOne(slug);
      
      if (!blog) {
        return res.status(404).send('Blog not found');
      }

      const appUrl = process.env.APP_URL || 'https://brightenbangladesh.com';
      const blogUrl = `${appUrl}/blogs/${slug}`;
      
      // Construct image URL properly
      let imageUrl = 'https://brightenbangladesh.com/assets/default-blog.jpg'; // Default image
      if (blog.coverImage) {
        if (blog.coverImage.startsWith('http://') || blog.coverImage.startsWith('https://')) {
          imageUrl = blog.coverImage;
        } else if (blog.coverImage.startsWith('/')) {
          imageUrl = `${appUrl}${blog.coverImage}`;
        } else {
          imageUrl = `${appUrl}/${blog.coverImage}`;
        }
      }
      
      const plainText = blog.content?.replace(/<[^>]+>/g, ' ') || '';
      const description = (blog.summary || plainText.slice(0, 160)).replace(/"/g, '&quot;');

      const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${blog.title} | Brighten Bangladesh</title>
  
  <!-- Basic Meta Tags -->
  <meta name="description" content="${description}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${blogUrl}">
  <meta property="og:title" content="${blog.title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:site_name" content="Brighten Bangladesh">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${blogUrl}">
  <meta name="twitter:title" content="${blog.title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${imageUrl}">
  
  <!-- Redirect to actual blog page -->
  <meta http-equiv="refresh" content="0;url=${blogUrl}">
  <script>window.location.href = "${blogUrl}";</script>
</head>
<body>
  <h1>${blog.title}</h1>
  <p>${description}</p>
  <p>Redirecting to blog...</p>
  <a href="${blogUrl}">Click here if you are not redirected</a>
</body>
</html>
      `;

      res.setHeader('Content-Type', 'text/html');
      res.send(html);
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  }
}
