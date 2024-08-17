import express from 'express';
import cors from 'cors';
import Router from './routes/ProductRoutes.js';
import fileUpload from 'express-fileupload';

const App = express();

App.use(cors());
App.use(express.json());
App.use(fileUpload());
App.use(express.static('public'));
App.use(Router);

App.listen(2006, () => {
    console.log('Server running on port 2006');
});
