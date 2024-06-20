import jwt from "jsonwebtoken";
import { Notification } from "./Model/notification.js";

// JWT token generating
let generateJwtToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY);
};

//decode JWT token function

const decodeJwtToken = (token) => {
  try {
    let decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded.id;
  } catch (error) {
    console.error("Error in Jwt Decoding", error);
    return null;
  }
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

// Add 3months to current date
function getdueDate(){
    let result = new Date();
    result.setMonth(result.getMonth() + 3);
    return result.toLocaleDateString();
} 

// Notofication function
async function addnotification (data){
  try {
    await new Notification(data).save();
    return true
  } catch (error) {
    console.log(error);
    return false
  }
}

export { generateJwtToken, getCurrentDate,getdueDate,addnotification,decodeJwtToken };
