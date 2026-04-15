import fs from "fs/promises";
import path from 'path';

function getDataPath(fileName){
    return path.resolve(process.cwd(),'data',fileName);
}

async function read(fileName) {
    try {
        const data = await fs.readFile(fileName, "utf8");
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

async function write(fileName, items) {
    await fs.writeFile(fileName, JSON.stringify(items, null, 2), "utf8");
}

async function add(fileName, item) {
    const data = await read(fileName);
    data.push(item);
    await write(fileName, data);
    return item;
}
export {
    read,
    write,
    add,
    getDataPath,
};