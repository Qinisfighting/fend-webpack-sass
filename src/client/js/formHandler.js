const d = new Date();
const newDate = d.toDateString();
const baseURL =
  "http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=";
const apiKey = "&appid=b0c6dd1560b603095aed754d5d1756d0&units=imperial";

const form = document.getElementById('form');
const log = document.getElementById('log');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault()
    const newZip = document.getElementById("name").value;

    getWeather(baseURL, newZip, apiKey)
    .then(function (data) {
      return postData("/addData", {
        name: data.name,
        date: newDate,
        temp: data.main.temp,
      });
    })
    .then(() => updateUI()); 
}

const getWeather = async (baseURL, newZip, apiKey) => {
    const request = await fetch(baseURL + newZip + apiKey);
  
    try {
      const allData = await request.json();
  
      //alert with statues of 404 and 400
  
      if (allData.message) {
        alert(allData.message);
      } else {
        return allData;
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const postData = async (url = "", data = {}) => {
    const res = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  
    try {
      const newData = await res.json();
      //console.log(newData);
      return newData;
    } catch (error) {
      console.log("error", error);
    }
  };


  const updateUI = async () => {
    const req = await fetch("/all");
    try {
      // Transform into JSON
      const allData = await req.json();
     // console.log(allData);
     // Write updated data to DOM elements
      document.getElementById("city").innerHTML = allData.name;
      document.getElementById("date").innerHTML = allData.date;
      document.getElementById("temp").innerHTML =
        Math.round(allData.temp) + " degrees fahrenheit";
    } catch (error) {
      console.log("error", error);
      // appropriately handle the error
    }
  };
  

export { handleSubmit }
