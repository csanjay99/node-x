let LIMIT = 5;
let STOP = true;
const sendRequestBtnEL = document.getElementById("sendGetRequestBtn");
const saveDataEl = document.getElementById("sendToServerBtn");
const savedResponseEl = document.getElementById("savedResponse");

const pinArray = [];

const fetchApi = async (newUrl, options) => {
  const response = await fetch(newUrl, options);
  const data = await response.json();
  //console.log(data.records);
  pinArray.push(...data.records);
  for (const obj in pinArray) {
    await sendDataToDb(obj);
  }
};

const sendDataToDb = async (obj) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  };
  const url = "http://localhost:3000/save/";

  await fetch(url, options).then(function (r) {
    console.log(r);
  });
};

const sendRequestToPost = async () => {
  const url =
    "https://api.data.gov.in/resource/6176ee09-3d56-4a3b-8115-21841576b2f6?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&offset=";

  const options = {
    method: "GET"
  };

  for (let i = 0; i < LIMIT; i++) {
    const newUrl = url + 10 * i;
    await fetchApi(newUrl, options);
  }
};

sendRequestBtnEL.addEventListener("click", sendRequestToPost);

saveDataEl.addEventListener("click", sendDataToDb);

//console.log(pinArray);
