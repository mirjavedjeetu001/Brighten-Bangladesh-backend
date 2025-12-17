export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USERNAME || 'dev',
    password: process.env.DB_PASSWORD || 'devpass',
    database: process.env.DB_DATABASE || 'brighten_bd_dev',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
    expiresIn: process.env.JWT_EXPIRATION || '7d',
  },
  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10,
  },
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  },
  upload: {
    directory: process.env.UPLOAD_DIR || './uploads',
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 5242880, // 5MB
  },
  app: {
    url: process.env.APP_URL || 'http://localhost:3000',
  },
  smtp: {
    host: process.env.SMTP_HOST || 'mail.brightenbangladesh.com',
    port: parseInt(process.env.SMTP_PORT, 10) || 465,
    secure: process.env.SMTP_SECURE === 'false' ? false : true,
    user: process.env.SMTP_USER || 'info@brightenbangladesh.com',
    pass: process.env.SMTP_PASS || '',
    fromEmail: process.env.SMTP_FROM || 'info@brightenbangladesh.com',
    fromName: process.env.SMTP_FROM_NAME || 'Brighten Bangladesh',
  },
});
