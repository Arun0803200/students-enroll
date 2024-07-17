const nodemailer = require('nodemailer');
import { Service } from "typedi";
import * as ejs from 'ejs';
import * as path from 'path'
@Service()
export class MailService {
    public async sendMail(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const amqp = require('amqplib');
            const connection = await amqp.connect('amqp://localhost');
            // const connection = await amqp.connect('amqp://rabbitmq');
            const channel = await connection.createConfirmChannel();
            await channel.assertQueue('send-mail');
            await channel.consume('send-mail', async (message) => {
                const mailDatas = JSON.parse(message.content.toString());
                console.log(JSON.parse(message.content.toString()), 'JSON.parse(message.content.toString())JSON.parse(message.content.toString())')
                let mailTransporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'arun.ang.js@gmail.com',
                        pass: 'dcfskcevcfmjaiqq'
                    }
                });
    
                let mailDetails = {
                    from: 'noreply@gmail.com',
                    to: mailDatas.mailId,
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
                channel.ack(message);
            });
        });
    }
}
