const nodemailer = require('nodemailer');
import { Service } from "typedi";

@Service()
export class MailService {
    public async sendMail(): Promise<any> {
        console.log('yes enterrrrrrrrr');
        return new Promise((resolve, reject) => {
            let mailTransporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'arun.ang.js@gmail.com',
                    pass: 'dcfskcevcfmjaiqq'
                }
            });

            let mailDetails = {
                from: 'noreply@gmail.com',
                to: 'kuttyarun1066@gmail.com',
                subject: 'Accept for Love',
                text: 'Hai Jothika, your Love was accepetd by Arun, I love You <3..... : )'
            };

            mailTransporter.sendMail(mailDetails, function(err, data) {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}
