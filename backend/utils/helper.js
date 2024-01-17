const fs = require("fs");

exports.loadData = function () {
  const response = fs.readFileSync(`${__dirname}/../data/data.json`);
  const data = JSON.parse(response);
  return data;
};

exports.saveData = function (data) {
  try {
    fs.writeFileSync(`${__dirname}/../data/data.json`, JSON.stringify(data), {
      encoding: "utf-8",
    });

    console.log("File saved successfully!");
  } catch {
    console.log("There was an error in saving the file.");
  }
};
