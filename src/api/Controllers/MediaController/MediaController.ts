import 'reflect-metadata';
import { JsonController, Post, Body, Res, BodyParam, Authorized, Get, QueryParam, Put, Param, Delete } from "routing-controllers";
import { ImageSerice } from '../../Services/ImageSerice';
@JsonController('/media')
export class MediaController {
    constructor(private imageSerice: ImageSerice) {}

    @Post()
    public async uploadFile(@BodyParam('data') data: string, @BodyParam('fileType') fileType : string, @Res() response: any): Promise<any> {
        const uploadFile = await this.imageSerice.uploadImage('uploads', data, fileType);
        return response.status(uploadFile ? 200 : 400).send({status: uploadFile ? 1 : 0, message: uploadFile ? 'Successfully upload the file !!' : 'Unable to uploade the file', data: uploadFile ?? uploadFile});
    }
}