const nodemailer = require('nodemailer');
import { Service } from "typedi";
import * as ejs from 'ejs';
import * as path from 'path'
@Service()
export class MailService {
    public async sendMail(): Promise<any> {
        const amqp = require('amqplib');
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createConfirmChannel();
        await channel.assertQueue('send-mail');
        channel.consume('send-mail', async (message) => {
            console.log('Received message from jothika:', message.content.toString());
            channel.ack(message);
        })
        return new Promise(async (resolve, reject) => {
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
                html: ''
            };


            const directoryPath = path.join(process.cwd(), 'views', 'arundhika.ejs');
            const fs = require('fs');

            // Load the EJS template
            // const emailTemplate = fs.readFileSync(directoryPath, 'utf-8');           
            await ejs.renderFile(directoryPath, async(err, data) => {
                if(err) {
                    throw err;
                } else {
                    mailDetails.html = data
                    await mailTransporter.sendMail(mailDetails, function(err, data) {
                        if(err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                }
            })
        });
    }
}
