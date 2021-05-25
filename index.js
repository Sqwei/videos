const json2md = require("json2md")
const json = require('./jsons/产科护理.json')
const fs = require('fs');

var join = require('path').join;

function getJsonFiles(jsonPath) {
  let jsonFiles = [];
  function findJsonFile(path) {
    let files = fs.readdirSync(path);
    files.forEach(function (item, index) {
      let fPath = join(path, item);
      let stat = fs.statSync(fPath);
      if (stat.isDirectory() === true) {
        findJsonFile(fPath);
      }
      if (stat.isFile() === true) {
        jsonFiles.push(fPath);
      }
    });
    
  }
  findJsonFile(jsonPath);
  jsonFiles.forEach(f => {
    const list = fs.readFileSync(f,'utf-8')
    const json = JSON.parse(list)
    console.log(f)
    const content = json2md([{
        table: { 
            headers: ["名称","讲师", "地址"], 
            rows: json.data.map(i => [i.name, i.teacher, i.videoUrl])
        }
    }])

    fs.writeFile(f.replace('jsons', 'markdowns').replace('json', 'md'), content, console.log)
  })
}

getJsonFiles("./jsons");

