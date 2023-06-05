import path = require("path");
import * as fs from 'fs';

export class ImageSerice {
    public async uploadImage(fileName: string, data: string, type: string): Promise<any>{
        const currentDate: any = Date.now();
        const directoryPath = path.join(process.cwd(), fileName)
        const file = currentDate.toString() + '_' + '.' + type
        const uploadFileName = path.join(directoryPath, file)
        if (fs.existsSync(directoryPath)===false) {
            return false;
        }
        return new Promise((resolve: any, reject: any) => {
            fs.writeFile(uploadFileName, data, 'base64', (err: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({success: true});
                }
            })
        })
    }
}