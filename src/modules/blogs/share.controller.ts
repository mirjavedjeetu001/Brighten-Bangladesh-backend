import { Controller, Get, Param, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { BlogsService } from './blogs.service';

// Serves an HTML page with Open Graph/Twitter meta tags for blog sharing,
// then redirects visitors to the real blog page.
@Controller('share')
export class ShareController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get('blog/:slug')
  async shareBlog(@Param('slug') slug: string, @Req() req: Request, @Res() res: Response) {
    const blog = await this.blogsService.findOne(slug);
    const forwardedProto = (req.headers['x-forwarded-proto'] as string) || req.protocol || 'https';
    const host = (req.headers['x-forwarded-host'] as string) || req.headers.host || 'brightenbangladesh.com';
    const baseFromReq = `${forwardedProto}://${host}`;
    const frontendEnv = process.env.FRONTEND_URL;
    // If FRONTEND_URL is set, trust it; otherwise derive from request host, stripping a trailing /api if present.
    const derivedSite = baseFromReq.replace(/\/$/, '').replace(/\/api$/, '');
    const siteUrl = (frontendEnv || derivedSite || 'https://brightenbangladesh.com').replace(/\/$/, '');
    const canonicalUrl = `${siteUrl}/blogs/${blog.slug}`;

    const coverImage = blog.coverImage
      ? blog.coverImage.startsWith('http') || blog.coverImage.startsWith('data:')
        ? blog.coverImage
        : `${siteUrl}${blog.coverImage.startsWith('/') ? '' : '/'}${blog.coverImage}`
      : `${siteUrl}/logo192.png`;

    const description = (blog.summary || '').trim() || 'Read this article on Brighten Bangladesh';

    const escape = (value: string) =>
      value
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${escape(blog.title)}</title>
  <meta name="description" content="${escape(description)}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escape(blog.title)}" />
  <meta property="og:description" content="${escape(description)}" />
  <meta property="og:image" content="${coverImage}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:site_name" content="Brighten Bangladesh" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escape(blog.title)}" />
  <meta name="twitter:description" content="${escape(description)}" />
  <meta name="twitter:image" content="${coverImage}" />
  <meta http-equiv="refresh" content="0; url=${canonicalUrl}" />
</head>
<body>
  <p>Redirecting to <a href="${canonicalUrl}">${canonicalUrl}</a> ...</p>
  <script>window.location.href='${canonicalUrl}'</script>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(html);
  }
}