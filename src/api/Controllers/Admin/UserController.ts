import 'reflect-metadata';
import { JsonController, Post, Body, Res, BodyParam, Authorized, Get, QueryParam, Put, Param, Delete } from "routing-controllers";
import { UserRequest } from "../request/UserRequest";
import { adminUserModels } from "../../Models/AdminUserModel";
import { token } from "../../Models/TokenModel";
import { UpdateUserRequest } from "../request/UpdateUserRequest";
import { MailService } from '../../Services/mail.service';
const bcrypt = require('bcrypt');
import * as jsonwebtoken from 'jsonwebtoken';
import { ImageSerice } from '../../Services/ImageSerice';
import path = require('path');
import { Response } from 'express';
const ejs = require('ejs');
const fs = require('fs');
const pdf =  require('html-pdf');
const puppeteer = require('puppeteer');
const PDFDocument = require('pdfkit');
@JsonController('/admin-user')
export class UserController {
    constructor(private mailService: MailService, private imageSerice: ImageSerice) {}

    // create user
    @Post()
    public async createUser(@Body({validate: true}) userRequest: any, @Res() response: any): Promise<any> {
        const newUser = new adminUserModels();
        const ifEmail = await adminUserModels.findOne({email: userRequest.email});
        if (ifEmail) {
            return response.status(400).send({status: 0, message: 'The given email already exists. Please try another email :)'})
        }

        const ifFindMobile = await adminUserModels.findOne({mobileNumber: userRequest.mobileNumber });
        if (ifFindMobile) {
            return response.status(400).send({status: 0, message: 'The given mobile number already exists. Please try another mobile number :)'})
        }

        if (ifEmail && ifFindMobile) {
            return response.status(400).send({status: 0, message: 'The given email and mobile number already exists. Please try another email and mobile number :)'})
        }

        const hasPassword = await bcrypt.hash(userRequest.password, 10);
        newUser.username = userRequest.email;
        newUser.password = hasPassword;
        newUser.email = userRequest.email;
        newUser.isActie = 0;
        newUser.isDelete = 0,
        newUser.firstName = userRequest.firstName;
        newUser.lastName = userRequest.lastName;
        newUser.address1 = userRequest.address1;
        newUser.address2 = userRequest.address2;
        newUser.city = userRequest.city;
        newUser.state = userRequest.state;
        newUser.country = userRequest.country;
        newUser.mobileNumber = userRequest.mobileNumber;
        newUser.universityName = userRequest.universityName;
        newUser.collegeName = userRequest.collegeName;
        newUser.collegeCode = userRequest.collegeCode;
        const saveUSer: any = await newUser.save();
        if (saveUSer) {
            const successResponse = {
                status: 1,
                message: 'Created a new user !!',
                data: saveUSer
            }
            return response.status(200).send(successResponse)
        }
        const errorResponse = {
            status: 0,
            message: 'Unable to create a new user !!'
        }
        return response.status(400).send(errorResponse);
    }
    // login api
    @Post('/login')
    public async login(@BodyParam('username') username: string, @BodyParam('password') password: string, @Res() response: any): Promise<any> {
        const findUser: any = await adminUserModels.findOne({username: username});
        if (!findUser) {
            return response.status(400).send({status: 0, message: 'Invalid username !!'});
        }
        const comparePassword = await bcrypt.compare(password, findUser.password);
        if (!comparePassword) {
            return response.status(400).send({status: 0, message: 'Invalid password !!'});
        }
        console.log(process.env.JWT_TOKEN, 'tokennnnnnnnn');
        
        const tokens = await jsonwebtoken.sign({userId: findUser._id, role: 'admin-user'}, 'fsha%@%xcb754wejh');
        const newToken: any = new token();
        newToken.token = token;
        newToken.isActive = 1;
        newToken.deleteFlag = 0;
        await newToken.save();

        if (token) {
            const successResponse = {
                status: 1,
                message: 'Successfully create the Token',
                token: tokens
            };
            return response.status(200).send(successResponse);
        }
        return response.status(400).send({status: 0, message: 'Invalid login !!'});
    }

    // get user list
    // @Authorized()
    @Get()
    public async getUser(@QueryParam('universityName') universityNames: string, @QueryParam('collegeName') collegeNames: string, @QueryParam('limit') limit: number, @QueryParam('offset')offset: number,@Res() response: any): Promise<any> {
        let searchCondition = []
        if (universityNames !== '') {
            searchCondition.push({
                universityName: {$regex : universityNames, $options : 'i'}
            })
        }
        if (collegeNames !== '') {
            searchCondition.push({
                collegeName: {$regex : collegeNames, $options : 'i'}
            })
        }
        let findOperation: object
        if (universityNames !== '' && collegeNames !== '') {
            findOperation = {
                $and: searchCondition
            }
        } else if (universityNames !== '' || collegeNames !== '') {
            findOperation = {
                $or: searchCondition
            }
        } else if (universityNames === '' && collegeNames === '') {
            findOperation = {}
        }
        console.log(searchCondition, 'condtionsssss', findOperation)
        const userData = await adminUserModels.find(findOperation).limit(limit).skip(offset);
            const successResponse = {
                status: 1,
                message: 'Successfully get the user list !!',
                data: userData
            };
            return response.status(200).send(successResponse);
    }

    // update user API
    @Put('/:id')
    public async updateUser(@Param('id') id: string, @Body({validate: true}) userRequest: any, @Res() response: any): Promise<any> {
        const ifUser = await adminUserModels.findOne({_id: id});
        if (!ifUser) {
            return response.status(400).send({status: 0, message: 'Invalid user Id !!'});
        }
        ifUser.address1 = userRequest.address1;
        ifUser.address2 = userRequest.address2;
        ifUser.city = userRequest.city;
        ifUser.state = userRequest.state;
        ifUser.country = userRequest.country;
        ifUser.mobileNumber = userRequest.mobileNumber;
        ifUser.firstName = userRequest.firstName;
        ifUser.lastName = userRequest.lastName;
        ifUser.universityName = userRequest.universityName;
        ifUser.collegeName = userRequest.collegeName;
        ifUser.collegeCode = userRequest.collegeCode;
        const updateUser = await ifUser.save();
        if (updateUser) {
            const successResponse = {
                status: 1,
                message: 'Successfully update the user !!'
            }
            return response.status(200).send(successResponse);
        }
        return response.status(400).send({status: 0, message: 'Unable to update the User !!'});
    }

    // Detail api
    @Get('/detail/:id')
    public async userDetail(@Param('id') id: string, @Res() response: any): Promise<any> {
        console.log('haiiiiiiiiiiii', id)
        const ifUser = await adminUserModels.findOne({_id: id});
        if (!ifUser) {
            return response.status(400).send({status: 0, message: 'Unable to get the user detail !!'});
        }
        const successExample = {
            status: 1,
            message: 'Successfully got the user detail',
            data: ifUser
        }
        return response.status(200).send(successExample);
    }

    //Delete Api
    @Delete('/:id')
    public async deleteUser(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifUser = await adminUserModels.findOne({_id: id});
        if (!ifUser) {
            return response.status(400).send({status: 0, message: 'Inlid user is !!'});
        }
        const deleteUser = await adminUserModels.deleteOne({_id: id});
        if (deleteUser) {
            const successExample = {
                status: 1,
                message: "Successfully deleted a user !!",
            }
            return response.status(200).send(deleteUser);
        }
        return response.status(400).send({status:0, message: 'Unable to deleted a User !!'});
    }
    @Post('/send')
    public async sendMail(@Res() response: any): Promise<any> {
        const amqp = require('amqplib');
        const connection = await amqp.connect('amqp://localhost');
        // const connection = await amqp.connect('amqp://rabbitmq');
        const channel = await connection.createConfirmChannel();
        await channel.assertQueue('send-mail');
        const mailData: any = {
            mailId: 'kuttyarun1066@gmail.com',
            userName: 'kuttyarun',
            password: 'Welcome123$'
        }
        channel.sendToQueue('send-mail', Buffer.from(JSON.stringify(mailData)));
            return response.status(200).send({status:1, message: 'Successfully send the mail !!'});
        // return response.status(400).send({status: 0, message: 'Invalid mail Id !!'})
    }

    @Post('/upload-image')
    public async uploadImage(@BodyParam('image') image: string, @Res() response: any): Promise<any> {
        const data = image.split(',');
        const type = data[0].split(';')[0].split('/')[1];
        console.log(type, 'dataaaa');
        const bufferData: any = Buffer.from(data[1]);
        const uploadImage = await this.imageSerice.uploadImage('uploads', bufferData, type)
        if (uploadImage) {
            return response.status(200).send({status: 1, message: 'Successfully upload the image !!'});
        }
        return response.status(400).send({status:0, message: 'Invalid directory name !!'});
    }

    @Post('/rabbitmq')
    public async rabbitMq(@BodyParam('data') data: string, @Res() response: any): Promise<any>{
        const amqp = require('amqplib');
        const connection = await amqp.connect('amqp://localhost');
        // const connection = await amqp.connect('amqp://rabbitmq');
        const channel = await connection.createChannel();
        const queueName = 'myQueue';
        await channel.assertQueue(queueName);
        await channel.assertQueue('jothika');
        const mailData: any = {
            mailId: 'kuttyarun1066@gmail.com',
            userName: 'kuttyarun',
            password: 'Welcome123$'
        };
        const message = 'Hello, RabbitMQ!';
        const messageFromJoo = 'I Love You :)'
        channel.sendToQueue(queueName, Buffer.from(message));
        channel.sendToQueue('jothika', Buffer.from(JSON.stringify(mailData)));
        const messages = []

        // consume
        channel.consume(queueName, (message) => {
            messages.push(message.content.toString());
        console.log('Received message:', message.content.toString());
        channel.ack(message);
        });
        let resultData: any
        channel.consume('jothika', async (message) => { 
            messages.push(message.content.toString());
        console.log('Received message from jothika:', message.content.toString());
        resultData = await message.content.toString();
        channel.ack(message);
        });
        console.log(resultData, 'dataaaaaaaaaaaaaaaaaaaaaaaaaaa')
        return response.status(200).send({status: 200, message: resultData});
    }

    // convert html to pdf
    @Get('/html-pdsf')
    public async htmlToPdf(@Res() response: any): Promise<any> {
        try {
            const directoryPath = path.join(process.cwd(), 'views', 'arundhika.ejs');
      
            const htmlData = await ejs.renderFile(directoryPath);
            console.log(htmlData, 'htmlDatahtmlData', directoryPath);
      
            const pdfDoc = new PDFDocument();
      
            const buffers: any[] = []; // Store PDF chunks in an array
      
            pdfDoc.on('data', (chunk) => buffers.push(chunk));
            pdfDoc.on('end', () => {
              const pdfBuffer = Buffer.concat(buffers);
      
              response.setHeader('Content-Disposition', 'attachment; filename="output.pdf"');
              response.setHeader('Content-Type', 'application/pdf');
              response.end(pdfBuffer); // Send the PDF buffer as the response
              console.log('PDF generation completed.');
            });
      
            const data = pdfDoc.text(htmlData);
            pdfDoc.end();
            return response.download(data);
          } catch (error) {
            console.error('Error generating PDF:', error);
            response.status(500).send('Error generating PDF');
          }
    }
    @Get('/html-pdf')
  public async htmlToPdfs(@Res() response: Response): Promise<any> {
    try {
        const directoryPath = path.join(process.cwd(), 'views', 'arundhika.ejs');
  
        const data = {
          name: 'John Doe', // Add any data needed for the EJS template here
        };
  
        const htmlData = await new Promise<string>((resolve, reject) => {
          ejs.renderFile(directoryPath, data, (err, html) => {
            if (err) {
              reject(err);
            } else {
              resolve(html);
            }
          });
        });
  
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlData);
  
        // Add a small delay (e.g., 1 second) to wait for asynchronous rendering
        await page.waitForTimeout(1000);
  
        const pdfBuffer = await page.pdf({ format: 'Letter' });
        await browser.close();
  
        response.setHeader('Content-Disposition', 'attachment; filename="output.pdf"');
        response.setHeader('Content-Type', 'application/pdf');
        return response.send(pdfBuffer); // Send the PDF buffer as the response
      } catch (error) {
        console.error('Error generating PDF:', error);
        return response.status(500).send('Error generating PDF');
      }
  }
}
