import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';
import {express} from 'express';
import path = require('path');

export const homeLoader: MicroframeworkLoader = async(settings: MicroframeworkSettings) => {
    console.log('home.......');
    
    const  expressApp = settings.getData('express_app');
    const directory = path.join(__dirname, '../', 'views', 'arundhika');
    expressApp.get('/api', (req: express.request, res: express.response) => {
        return res.render(directory)
    })
}