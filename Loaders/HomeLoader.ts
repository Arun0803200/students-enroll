import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';
import * as express from 'express';
import path = require('path');

export const homeLoader: MicroframeworkLoader = async(settings: MicroframeworkSettings) => {
    console.log('home.......');
    const  expressApp = settings.getData('express_app');
    const directory = path.join(__dirname, '../', 'views', 'arundhika');
    expressApp.get('/api', (req: express.Request, res: express.Response) => {
        const data = {
            name: 'JOTHIKA A',
            jobPosition: 'LAB MANAGER',
            email: 'muthulakshmi0806@gmail.com',
            phoneNumber: '8667384086',
            address: '455, Anna nagar, chennai-876 598',
            objective: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel semper lectus. Sed et lectus eget eros convallis congue. Vivamus pellentesque lacus ut nisi tincidunt, id sagittis mauris volutpat. Aenean elementum nec quam in volutpat. Nulla facilisi. Sed posuere ipsum eu turpis viverra, eu pulvinar elit blandit. Integer consectetur sapien nec sapien malesuada, nec euismod lectus fringilla. Nunc sed lectus quis quam blandit fermentum at et velit',
            socialMedia: [
                {
                    title: 'Facebook',
                    link: 'kuttyarun1088'
                },
                {
                    title: 'Linked In',
                    link: 'arun_15_05'
                },
                {
                    title: 'Git Hub',
                    link: 'github.com/arun0803200'
                }
            ],
            experience: [
                {
                    companyName: 'piccosoft',
                    city: 'Thiruvannamalai',
                    duration: '2021-2023',
                    position: 'Backend Developer',
                    summary: 'i am working in that file since 2021. i have working in that field with node js and angular'
                },
                {
                    companyName: 'TCS',
                    city: 'chennai',
                    duration: '2023-2025',
                    position: 'Backend Developer',
                    summary: 'i am working in that file since 2021. i have working in that field with node js and angular'
                },
                {
                    companyName: 'infosis',
                    city: 'bangalore',
                    duration: '2025-2034',
                    position: 'Backend Developer',
                    summary: 'i am working in that file since 2021. i have working in that field with node js and angular'
                },
                {
                    companyName: 'wibrow',
                    city: 'kerala',
                    duration: '2024-20240',
                    position: 'Backend Developer',
                    summary: 'i am working in that file since 2021. i have working in that field with node js and angular'
                }
            ],
            education: [
                {
                    collageName: 'S.K.P Engineering College',
                    branchName: 'Computer Science And Engineering',
                    duration: '2017 - 2021',
                    degreeName: 'B.E'
                },
                {
                    collageName: 'S.K.P Engineering College',
                    branchName: 'Computer Science And Engineering',
                    duration: '2024 - 2026',
                    degreeName: 'M.E'
                }
            ]
        }
        return res.render(directory, data);
    })
}