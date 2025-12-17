import { Injectable, Logger } from '@nestjs/common';
import * as Handlebars from 'handlebars';
import * as puppeteer from 'puppeteer';
// Note: html-docx-js export shape differs between CJS/ESM, so we resolve at call time.

@Injectable()
export class CvRenderService {
  private readonly logger = new Logger(CvRenderService.name);

  constructor() {
    // Register Handlebars helpers
    Handlebars.registerHelper('if', function(conditional, options) {
      if (conditional) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    });

    Handlebars.registerHelper('each', function(context, options) {
      let ret = '';
      if (context && context.length > 0) {
        for (let i = 0; i < context.length; i++) {
          ret += options.fn(context[i]);
        }
      }
      return ret;
    });

    Handlebars.registerHelper('formatDate', function(date) {
      if (!date) return '';
      if (typeof date === 'string') {
        // If it's a string, return as-is (user already formatted it)
        if (date.toLowerCase() === 'present') return 'Present';
        // Try to parse as date
        const parsed = new Date(date);
        if (!isNaN(parsed.getTime())) {
          return parsed.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
        }
        return date;
      }
      if (date instanceof Date) {
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      }
      return date.toString();
    });

    Handlebars.registerHelper('join', function(array, separator) {
      if (!array || !Array.isArray(array)) return '';
      return array.join(separator || ', ');
    });
  }

  renderCvHtml(templateHtml: string, templateCss: string, cvData: any): string {
    try {
      const accent = cvData?.themeColor || '#0f766e';

      // Compile the template
      const template = Handlebars.compile(templateHtml);
      
      // Render with data
      const renderedHtml = template(cvData);
      
      // Combine with CSS
      const fullHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>${templateCss}</style>
          <style>
            :root {
              --accent-color: ${accent};
            }
            h1, h2, h3, h4, h5, h6, .accent-text {
              color: var(--accent-color);
            }
            .accent-bg {
              background: var(--accent-color);
              color: #fff;
            }
            .accent-border {
              border-color: var(--accent-color);
            }
            .tag, .badge, .pill {
              border: 1px solid var(--accent-color);
              color: var(--accent-color);
              padding: 2px 6px;
              border-radius: 4px;
            }
          </style>
        </head>
        <body>
          ${renderedHtml}
        </body>
        </html>
      `;
      
      return fullHtml;
    } catch (error) {
      this.logger.error('Error rendering CV HTML:', error);
      throw new Error(`Failed to render CV: ${error.message}`);
    }
  }

  async generatePdf(html: string): Promise<Buffer> {
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--disable-gpu',
        ],
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
      });
      
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });
      
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px',
        },
      });
      
      return Buffer.from(pdfBuffer);
    } catch (error) {
      this.logger.error('Error generating PDF:', error);
      
      // Check if error is due to missing Chromium
      if (error.message && (error.message.includes('spawn') || error.message.includes('Failed to launch') || error.message.includes('Could not find'))) {
        throw new Error('PDF generation is not available on this server. Chromium/Chrome is required but not installed. Please contact the administrator or download the HTML version instead.');
      }
      
      throw new Error(`Failed to generate PDF: ${error.message}`);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  async generateDocx(html: string): Promise<Buffer> {
    try {
      // html-docx-js has issues with complex HTML. Let's simplify the HTML first.
      // Strip out complex styling but keep basic structure
      let simplifiedHtml = html
        // Remove all style attributes
        .replace(/\sstyle="[^"]*"/gi, '')
        // Remove all class attributes  
        .replace(/\sclass="[^"]*"/gi, '')
        // Keep only basic tags that html-docx-js supports
        .replace(/<(header|footer|nav|aside|section|article)[^>]*>/gi, '<div>')
        .replace(/<\/(header|footer|nav|aside|section|article)>/gi, '</div>')
        // Convert divs to paragraphs for better formatting
        .replace(/<div[^>]*>/gi, '<p>')
        .replace(/<\/div>/gi, '</p>');

      // Wrap in a simple document structure
      const docHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
        </head>
        <body>
          ${simplifiedHtml}
        </body>
        </html>
      `;

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const htmlDocx = require('html-docx-js');
      
      // Try different export methods
      const converter = htmlDocx.asBlob || htmlDocx;
      const docxResult = converter(docHtml);

      if (Buffer.isBuffer(docxResult)) {
        return docxResult;
      }

      if (docxResult instanceof ArrayBuffer) {
        return Buffer.from(docxResult);
      }

      if (typeof docxResult === 'string') {
        return Buffer.from(docxResult, 'binary');
      }

      // Handle Blob
      if (docxResult?.arrayBuffer) {
        const arrayBuffer = await docxResult.arrayBuffer();
        return Buffer.from(arrayBuffer);
      }

      throw new Error('html-docx-js returned unsupported type');
    } catch (error) {
      this.logger.error('Error generating DOCX:', error);
      throw new Error(`Failed to generate DOCX: ${error.message}`);
    }
  }
}
