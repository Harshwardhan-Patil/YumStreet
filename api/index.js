import httpServer from './app.js';
import { PORT } from './config/index.js';
import { DatabaseManger } from './database/index.js';

const StartServer = async () => {
  try {
    await DatabaseManger.ConnectToDatabase();
    await DatabaseManger.Synchronization();

    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    DatabaseManger.CloseDatabaseConnection();
    process.exit(1);
  }
};

StartServer();
