import axios from 'axios';

// Dev url
const url = "http://129.213.66.90:8080/rxledger";

// Prod url
// const url = "http://"+window.location.hostname+":8080/getData";
export async function getAllData(){
  console.log(url);  
  return axios.get(url)
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