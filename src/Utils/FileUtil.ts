const fs = require('fs')
const path = require('path')

export class FileUtils {
    static listFiles(folder : string) : string[] {
        return fs.readdirSync(folder)
    }

    static readJSONFromFileSystem(filename : string) : object {
        var content : string = FileUtils.readFromFileSystem(filename)
        var json : object = JSON.parse(content)
        return json
    }
    static readFromFileSystem(filename : string) : string {
        var content : string = fs.readFileSync(filename, "utf8")
        return content
    }
    
    static writeJSONToFileSystem(filename : string, json : object) {
        FileUtils.writeToFileSystem(filename, JSON.stringify(json, null, 4))
    }
    
    static writeToFileSystem(filename : string, content : string) {
        fs.writeFileSync(filename, content, "utf8")
    }
    
    static isFileExisted(filename : string) : boolean {
        return fs.existsSync(filename)
    }
    
    static isCSVFormat(filename : string, seperator : string) : boolean {
        if (!!!seperator) seperator = ","
        if (!fs.existsSync(filename)) return false
        var content : string = FileUtils.readFromFileSystem(filename)
        var rows : number[] = content.split('\n').map(x=>x.split(seperator).length)
        var fixLength = rows[0]
        var result : boolean = (rows.map(x=>x==fixLength).filter(x=>!x).length==0)
        return result
    }
    
    
    static createFolderIfNotExisted(foldername : string) {
        if (!fs.existsSync(foldername)) {
            fs.mkdirSync(foldername)
        }
    }
    
    static getAbsoluteFilePath(filepath : string) : string {
        return path.resolve(filepath)
    }
    
    static createFolder(folder : string) {
        if (!fs.existsSync(folder)){
            fs.mkdirSync(folder, { recursive: true });
        }
    }
    
    static renameFileName(oldFilePath : string, newFilePath : string) {
        fs.renameSync(oldFilePath, newFilePath)
    }
    
    static deleteFile(filePath : string) {
        fs.unlinkSync(filePath)
    }
}


