// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-war
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// GET route that returns the projectData object
app.get('/getprojectData', function(req, res) {
    res.send(projectData);
  });

  // POST route that adds incoming data to projectData
/*   app.post('/projectData', (req, res) => {
    console.log(req.body)
    const { temperature, date, userResponse } = req.body;
    projectData.temperature = temperature;
    projectData.date = date;
    projectData.userResponse = userResponse;
    res.status(201).send('Data added successfully');
  }); 
 */

app.post('/projectData', addData);
function addData(req, res) {
  console.log(req.body);

   DataNew = {
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: req.body.userResponse
  }
  projectData.push(DataNew);
  console.log(projectData);
  res.status(201).send('Data added successfully');
}  


// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}
