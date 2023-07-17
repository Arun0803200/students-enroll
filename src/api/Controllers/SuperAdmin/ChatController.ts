import 'reflect-metadata';
import { BodyParam, JsonController, Post, Res, Get, QueryParam, UploadedFile } from "routing-controllers";
import { chat } from '../../Models/ChatModel';
import path = require('path');
import * as fs from 'fs';
import { BulkImportService } from '../../Services/BulkImportService';

@JsonController('/chat')
export class ChatController {
    constructor(private bulkImportService: BulkImportService) {}
    
    // Create chat data
    @Post()
    public async createChatData(@BodyParam('senderData') senderData: any, @BodyParam('receiverData') recevier: string, @Res() response: any): Promise<any> {
        const newChat = new chat();
        newChat.sender = senderData;
        newChat.receiver = recevier;
        const saveChat = await newChat.save();
        const successResponse = {
            status: 1,
            message: 'Successfully create the chat data !!',
            data: saveChat
        };
        return response.status(200).send(successResponse);
    }

    // Get chat data
    @Get()
    public async getChatData(@QueryParam('keyword') keyword: string, @Res() response: any): Promise<any> {
        const getData = await chat.find({sender: {$regex: keyword, $options: 'i'}});
        if (getData) {
            return response.status(200).send({status: 1, message: 'Successfully get the data !!', data: getData});
        }
    }

    @Post('/upload-file')
    public async uploadFiles(@UploadedFile('file') files: any, @Res() response: any): Promise<any> {
        const zipstream = require('node-stream-zip');
        const random = Math.floor(1000+ Math.random() * 9000);
        const orginalFile = files.originalname.split('.')[1];
        if (orginalFile === 'zip') {
            const filePath = path.join(process.cwd(), 'uploads', 'chat', 'chat_' + random + '.zip');
            await fs.writeFileSync(filePath, files.buffer);
            const zip = new zipstream({file: filePath});
            const errorData = [];
            zip.on('ready', ()=>{
                for (const entries of Object.values(zip.entries())) {
                    const fileNames: any = ['xlsx', 'sql', 'zip'];
                    if (fileNames.includes(Object.values(entries)[16].split('.')[1]) === false) {
                        errorData.push(Object.values(entries)[16]);
                    }
                }
                zip.close();
            });
            const extractPath = path.join(process.cwd(), 'uploads', 'chat');
            // Extract a zip
            const extractZip = require('extract-zip');
            await extractZip(filePath, { dir: extractPath }).then(() => {
            }).catch((err) => {
                if (err) {
                    return response.status(400).send({status: 400, message: 'Can not able to extract the zip file !!', data: err})
                }
            })
            if (!extractZip) {
                return response.status(400).send({status: 400, message: 'Can not able to extract the zip file !!'})
            }
            if (errorData.length > 0) {
                return response.status(400).send({status: 0, message: 'Inavlid files', data: errorData});
            }
            const inputFile = path.join(process.cwd(), 'uploads', 'chat','chat.xlsx')
            const xlToJson = await this.bulkImportService.xlsxToJson(inputFile, 'Sheet1');
            for(const chatData of xlToJson) {
                const newChat = new chat();
                newChat.sender = chatData.Chat_Questions;
                newChat.receiver = chatData.Chat_Answers;
                await newChat.save();
            }
            fs.unlink(inputFile, (err) => {
                if (err) throw err;
            });
            fs.unlink(filePath, (err) => {
                if(err) throw err;
            })
            return response.status(200).send({status: 1, message: 'Success...!!!', data: xlToJson});
        }
        return response.status(400).send({status: 0, message: 'Just give zip file extension !!'});
    }
}
