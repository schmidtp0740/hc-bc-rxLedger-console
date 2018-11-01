import axios from 'axios';

const url = "http://"+window.location.hostname+":8080/getData";
export async function getAllData(){
  console.log(url);  
  return axios.get(url)
      .then(function(response) {
          var data = JSON.parse(JSON.parse(response.data).result);
          return data;
      })
      .catch(function(error) {
          console.log(error);
          return error;
      }
  );
}