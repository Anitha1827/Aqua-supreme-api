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

// date format
function dateFormat(val) {
  // Create a date using Date.UTC to avoid timezone issues
  const parts = val.split(/[T+:-]/); // Split the date string
  const year = parts[0]; // YYYY
  const month = parts[1] - 1; // MM (0-indexed)
  const day = parts[2]; // DD

  // Create the date with UTC to avoid local timezone issues
  let formatDate = new Date(Date.UTC(year, month, day));
  
  day = formatDate.getUTCDate();
  let monthFormatted = formatDate.getUTCMonth() + 1; // Month is 0-indexed
  const yearFormatted = formatDate.getUTCFullYear();

  // Format day and month
  day = day < 10 ? "0" + day : day;
  monthFormatted = monthFormatted < 10 ? "0" + monthFormatted : monthFormatted;

  // Return the date in dd/mm/yyyy format
  let date = day + "/" + monthFormatted + "/" + yearFormatted;
  return date;
}

// Get current date
function getCurrentDate() {
  // Get current date
  let currentDate = new Date();
  let date = dateFormat(currentDate);
  return date;
}

// Add months to current date
function getdueDate({ month }) {
  let result = new Date();
  result.setMonth(result.getMonth() + Number(month));
  let date = dateFormat(result);
  return date;
}


// Notofication function
async function addnotification(data) {
  try {
    await new Notification(data).save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export {
  generateJwtToken,
  getCurrentDate,
  getdueDate,
  addnotification,
  decodeJwtToken,
  dateFormat,
};
