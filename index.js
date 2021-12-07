const express = require('express');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/public'));

let dbObj = null;

let dbFilePath = path.join(__dirname, 'pincode_details.sqlite');

const initializeDbAndServer = async () => {
  try {
    dbObj = await open({
      filename: dbFilePath,
      driver: sqlite3.Database,
    });
  } catch (e) {
    console.log(`database intializing error : ${e.message}`);
  }

  try {
    app.listen(3000, () => {
      console.log('server running on http://localhost:3000');
    });
  } catch (e) {
    console.log(`Server intializing error : ${e.message}`);
  }

  /*
  const createQuery = `
  create TABLE pincode (
  id integer PRIMARY key AUTOINCREMENT,
  pincode integer not NULL,
  officename text not NULL,
  statename text not NULL,
  districtname text not NULL,
  taluk text not NULL,
  circlename text not NULL,
  regionname text not NULL,
  divisionname text not NULL,
  officetype text
);
`;
  try {
    await dbObj.run(createQuery);
  } catch (e) {
    console.log(`database error : ${e.message}`);
  }

  let x = await dbObj.get('select count(*) from pincode;');
  console.log(x);
  */
};

initializeDbAndServer();

app.get('/', (req, res) => {
  try {
    var public1 = path.join(__dirname, 'public');
    res.sendFile(path.join(public1, 'index.html'), (e) => {
      console.log(`Error sending html : ${e.message}`);
    });
  } catch (e) {
    console.log(`Error : ${e.message}`);
  }
});

app.post('/save/', async (req, res) => {
  console.log(req.body);
  const pinArray = req.body;

  const {
    officename,
    pincode,
    officetype,
    divisionname,
    regionname,
    circlename,
    taluk,
    districtname,
    statename,
  } = pinArray;

  const postQuery = `insert into pincode 
    (officename,
      pincode,
      officetype,
      divisionname,
      regionname,
      circlename,
      taluk,
      districtname,
      statename
      ) 

        values 

      ( ${'officename'},
        ${pincode},
        ${'officetype'},
        ${'divisionname'},
        ${'regionname'},
        ${'circlename'},
        ${'taluk'},
        ${'districtname'},
        ${'statename'}
        )
    `;

  //await dbObj.run(postQuery);

  let countRow = `select count(*) from pincode;`;
  let count = await dbObj.get(countRow);
  console.log(count);
});

module.exports = app;
