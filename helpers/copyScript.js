const fs = require("fs");
const testFile = fs.readFileSync('./cypress/integration/test_file.spec.js')
for(let i = 0; i < 10; i++)
    fs.writeFileSync(`./cypress/integration/test_file_${i}.spec.js`,
        testFile.toString().replace(/#NUMBER#/, `${i}`))