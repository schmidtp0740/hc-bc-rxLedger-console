import axios from 'axios';

// Dev url
// const url = "http://129.213.66.90:8080/rxledger";

// Prod url
const url = "http://"+window.location.hostname+":8080/";
export async function getAllData(){
    var turl = url + "rxledger"
    console.log("updated table: " + turl);  

    return axios.get(turl)
        .then(function(response) {
            var data = response.data

            return data;
        })
        .catch(function(error) {
            console.log(error);
            return error;
        }
    );
}

export async function getStatus() {
    var turl = url + "bcs";
    console.log("get status of bc: " + turl)
    return axios
      .get(turl)
      .then(function (response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return "Something went wrong.";
      });
  }