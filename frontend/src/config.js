export const APIURL ='http://localhost:3000/';


export const GET = async () =>{
     return fetch(`${APIURL}get`).then(response => response.json())
                
}