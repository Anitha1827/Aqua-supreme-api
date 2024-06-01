import jwt from "jsonwebtoken";

// JWT token generating
let generateJwtToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY);
};

// Get current date
function getCurrentDate() {
  // Get current date
  let currentDate = new Date();
  // take day, month and year from the current date
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1; //it will consider January as 0 so we increse + 1
  let year = currentDate.getFullYear();

  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  // format the date as dd/mm/yyyy
  let date = day + "/" + month + "/" + year;
  return date;
}

// Add 90days to current data
function getdueDate(){
  let currentDate = new Date();
  let month = currentDate.getMonth()+1;
  // console.log("month", month+getDate())
} 

export { generateJwtToken, getCurrentDate,getdueDate };
