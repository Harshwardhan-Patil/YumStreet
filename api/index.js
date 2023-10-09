import express from 'express';
import initializeApp from './app.js';
import { PORT } from './config/index.js';
import { DatabaseManger } from './database/index.js';

const StartServer = async () => {
  const app = express();

  try {
    await DatabaseManger.ConnectToDatabase();
    await DatabaseManger.Synchronization();

    initializeApp(app);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    DatabaseManger.CloseDatabaseConnection();
    process.exit(1);
  }
};

StartServer();
