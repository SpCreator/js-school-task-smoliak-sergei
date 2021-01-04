const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(express.static(__dirname));
app.use(bodyParser.json({ type: ["application/json"] }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
app.get('/rules', (req, res) => {
    res.sendFile(__dirname + '/static/rules.html');
  })
app.get('*', (req, res) => {
    res.send('Page not found...')
})


app.post('/result', (req, res) => {
    res.status = 200;
    const fs = require("fs");

    if (req.body.action === 'get') {
        fs.readFile('base.txt', 'utf8', (err, data) => {
            if (err) throw err;
            if (data) {
              res.send(data);
            } else {
              res.send(JSON.stringify(data));
            }
        });
    } else if (req.body.action === 'set') {
        let data = setResults(req.body, fs);
        res.send(data);
    } else if (req.body.action === 'del') {
        fs.writeFileSync("base.txt", '');
        res.send('ok');
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})

function setResults(dataUsers, fs) {
    let usersData = '';
    
    if (dataUsers) {
      usersData = dataUsers.allUsers.sort(function (obj1, obj2) {
        if (obj1.name > obj2.name) {

        return -1;
        }
      });
    } else {
        usersData = dataUsers;
    }
  
    data = JSON.stringify({allUsers: usersData});
    fs.writeFileSync("base.txt", data);

    return data;
}