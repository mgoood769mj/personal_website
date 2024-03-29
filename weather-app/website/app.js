
/* Global Variables */
let baseUrl = 'https://api.openweathermap.org/data/2.5/weather?id='
const apiKey = '&appid=8d33622487ef1b5676e68d2e8e409a03&units=imperial';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click' , fun11);

function fun11(e){
  const feeling = document.getElementById('feelings').value;
   const newzip= document.getElementById('zip').value; 
   fun22(baseUrl,newzip,apiKey)
   .then(data => {
    console.log('feeling:',feeling);
    console.log('newDate:',newDate);
    console.log('temp: :',data.main.temp);
    postData('/projectData', { temperature: data.main.temp, date: newDate, userResponse: feeling });

    retrieveData()
  })
    .catch(error => {
        console.log("Error", error);
      });
   console.log("generate is clicked");
}


const fun22 = async(baseUrl,newzip,apiKey)=> {
    const res = await fetch(baseUrl+newzip+apiKey)
    try{
        const data = await res.json();
        return data;
    }
 
    catch(error){
        console.log("error",error);
    }
}

//async post funcation
const postData = async (url = '', data = {}) => {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data),
      });
      try{
        const newData = await response.json();
        console.log('newData' , newData);
        return newData;
      }
        catch (error) {
        console.log("Error", error);
    }
  };

//update the element 
  const retrieveData = async () =>{
    const request = await fetch('/getprojectData');
    console.log(request);
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    const lastIndex = allData.length - 1;
    document.getElementById('temp').innerHTML = allData[lastIndex].temperature;
    document.getElementById('content').innerHTML = allData[lastIndex].userResponse;
    document.getElementById("date").innerHTML =allData[lastIndex].date;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }
