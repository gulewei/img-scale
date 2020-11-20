const path = require('path');
const fs = require('fs');
const jimp = require('jimp');

const getBaseName = (name) => path.parse(name).base;

const getImages = (input) => {
    const isImage = (name) => /\.(png)$/.test(name);
    const dirents = fs.readdirSync(input, { withFileTypes: true });
    return dirents.filter((dirent) => dirent.isFile() && isImage(dirent.name)).map((dirent) => dirent.name);
};

const scale = (output, factor) => async (name) => {
    const image = await jimp.read(name);
    console.log(
        `${name}: ${image.bitmap.width}x${image.bitmap.height} -> ${image.bitmap.width * factor}x${image.bitmap.height *
            factor}`
    );
    image.scale(factor).write(path.resolve(output, getBaseName(name)));
};

const main = async (input, output, factor) => {
    if (!fs.existsSync(output)) {
        fs.mkdirSync(output);
    } else {
        throw new Error(`${output} is not a clean directory`);
    }

    console.log(`output to: ${output}`);
    
    await Promise.all(getImages(input).map(scale(output, factor)));
};

module.exports = main;
