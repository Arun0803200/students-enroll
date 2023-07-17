import { Service } from "typedi"
const extract = require('extract-zip');

@Service()
export class BulkImportService {
public async extractZip(zipPath, extractPath): Promise<any> {
  return new Promise((resolve, reject) => {
    extract(zipPath, { dir: extractPath }, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data)
      }
    });
  });
}

// XLSX to Json
public async xlsxToJson(inputFile: any, sheetName: string): Promise<any> {
  const xlsxToJson = require('xlsx-to-json');
  return new Promise((resolve, reject) => {
    xlsxToJson({
      input: inputFile,
      output: null,
      sheet: sheetName,
    }, (err, result) =>{
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  })
}
}
