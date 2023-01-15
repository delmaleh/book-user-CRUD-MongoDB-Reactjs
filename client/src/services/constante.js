//constante for all request to server 
const API_BASE_URL = "http://localhost:4000";

const header= {
    header: { Authorization:'Bearer '+localStorage.token }
}

//type of books
const typeOfBooks = ["adult","kids","suspens","historic","love","fiction"];

module.exports = {API_BASE_URL,typeOfBooks};