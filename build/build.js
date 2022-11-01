const fs = require('fs');
const { minify } = require('csso');

async function ls(path) {
    let content = await JSON.parse(fs.readFileSync('./jsonlist.json', 'utf8'));
    // loop through the array
    for (let i = 0; i < content.length; i++) {
        // get the file name
        let file = content[i].name;
        // get the file content
        let fileContent = await fs.readFileSync(path + "/" + file + ".css", 'utf8');
        // minify the file content
        let minified = await minify(fileContent).css;
        // write the minified file content to the file
        content[i].css = minified;

    }

    await fs.writeFileSync('./jsonlist.json', JSON.stringify(content, null, 2));

}

ls('./css').catch(console.error)