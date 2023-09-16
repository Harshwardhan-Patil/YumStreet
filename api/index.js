import express from 'express';
import initializeApp from './app';
import { PORT } from './config';

const StartServer = () => {
    const app = express();
    // connectToDatabase()

    initializeApp(app);

    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    })
        .on('error', (err) => {
            console.log(err);
            process.exit();
        })
}


StartServer();
