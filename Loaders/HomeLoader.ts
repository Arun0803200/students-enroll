import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';
import {express} from 'express';

export const homeLoader: MicroframeworkLoader = async(settings: MicroframeworkSettings) => {
    console.log('home.......');
    
    const  expressApp = settings.getData('express_app');
    expressApp.get('/api', (req: express.request, res: express.response) => {
        return res.json({
            name: 'mongoose',
            ersinon: '0.0.1'
        })
    })
}