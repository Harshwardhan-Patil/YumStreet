/* eslint-disable no-console */
import { Sequelize } from 'sequelize';
import { DB_URL } from '../config/index.js';

class DatabaseManager {
  constructor() {
    this.sequelize = new Sequelize(DB_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: false,
      },
      logging: false,
    });
  }

  async ConnectToDatabase() {
    try {
      await this.sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  async Synchronization() {
    try {
      await this.sequelize.sync();
      console.log('Database synchronized');
    } catch (error) {
      console.error('Error synchronizing database:', error);
    }
  }

  async CloseDatabaseConnection() {
    try {
      await this.sequelize.close();
      console.log('Connection has been closed.');
    } catch (error) {
      console.error('Error closing the database connection:', error);
    }
  }
}

const databaseManager = new DatabaseManager();

export const { sequelize } = databaseManager;
export default databaseManager;
