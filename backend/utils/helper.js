const fs = require('fs');

exports.loadData = function() {
    const response = fs.readFileSync(`${__dirname}/../data/data-users.txt`);
    const data = JSON.parse(response);
    return data.users;
}
