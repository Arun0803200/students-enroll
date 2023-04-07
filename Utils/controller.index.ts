import * as fg from 'fast-glob';
import * as path from 'path';
import * as fs from 'fs';

function controllerIndex() {
    const dirName = path.dirname(__dirname);
    const src = path.join(dirName, 'src');
    const dirPath: any = path.join(src, 'common', 'index.controller.ts');
    const tempPath = path.join(src, 'common', 'temp.controller.ts');
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
    const fileName = path.join(src, 'api', '**', '**', '*Controller.ts')
    const replacePath = fileName.split('\\')
    const orgPath = replacePath.join('/');
    for (const files of fg.sync(orgPath)) {
        const splitPath = files.split('.');
        const relativePath =  path.relative(path.join(src, 'common'), splitPath[0]);
        const data = `export * from "${relativePath.replace(/\\/g, '/')}"; \n`;
        fs.writeFileSync(tempPath, data, {flag: 'a+'});
    }
    if (fs.existsSync(dirPath) && fs.existsSync(tempPath)) {
        fs.unlinkSync(dirPath);
    }
    if (fs.existsSync(tempPath)) {
        fs.renameSync(tempPath, dirPath);
    }
}
controllerIndex();
