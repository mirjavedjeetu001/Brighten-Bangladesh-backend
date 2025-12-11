import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'dev',
  password: process.env.DB_PASSWORD || 'devpass',
  database: process.env.DB_DATABASE || 'brighten_bd_dev',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  // Connection pool settings for shared hosting
  extra: {
    connectionLimit: 5, // Limit concurrent connections
    connectTimeout: 60000, // 60 seconds
    acquireTimeout: 60000,
    timeout: 60000,
    waitForConnections: true,
    queueLimit: 0,
  },
  // Auto-reconnect settings
  maxQueryExecutionTime: 30000, // 30 seconds
  poolSize: 5,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
