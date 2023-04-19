import {MicroframeworkLoader, MicroframeworkSettings} from 'microframework';
const mongoose = require('mongoose');

export const mongooseLoader: MicroframeworkLoader = async(settings: MicroframeworkSettings) => {
    console.log('mongoose.........');
    
    if (settings) {
    const db = "mongodb://localhost:27017/Arundhika";
    const connection = mongoose.connect(db, {
        useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
    }).then((res: any) => {
        if (!res) return;
        console.log('success');
    });

    if (settings) {
        settings.setData('connection', connection);
    }
}
}