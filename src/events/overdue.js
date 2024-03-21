import { Users } from "../models/index.js";

export const overdueEvent = async (updatedRent) => {
 // Check if isOverdue was updated to true
 if (updatedRent.dataValues.isOverdue === true) {
  //get the borrower phone number
  const user = await Users.findOne({
   where: {
    userId: updatedRent.borrowedBy,
   },
  });
  const notificationMessage = `Dear ${user.fullName}, your book rental with ID: ${updatedRent.rentId} is now overdue. \n
    Kindly return the book to the library as agreed. if you want to extend your time, use the app to extend and pay the extension fee.`;

  const twilioFunctionUrl = 'https://book-overdue-event-4221.twil.io/notify'; // Replace with your function URL

  try {
   const response = await fetch(twilioFunctionUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
     rentId: updatedRent.rentId,
     notificationMessage: notificationMessage,
     To: user.phoneNumber,
     From: '+14155238886',
    }), // Send event data in request body
   });

   if (response.ok) {
    console.log(
     'Twilio notification request successful:',
     await response.text()
    );
   } else {
    console.error(
     'Error sending Twilio notification request:',
     await response.text()
    );
   }
  } catch (error) {
   console.error('Error calling Twilio serverless function:', error);
  }
 }
};
