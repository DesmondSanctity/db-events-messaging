import { Users, Books } from '../models/index.js';

export const overdueEvent = async (updatedRent) => {
 console.log('overdue event triggered', updatedRent);
 // Check if isOverdue was updated to true
 if (updatedRent.isOverdue === true) {
  //get the borrower phone number
  const user = await Users.findById(updatedRent.borrower);
  const book = await Books.findById(updatedRent.book);
  const notificationMessage = `Dear ${user.fullName}, your book rental with ID: ${updatedRent._id} is now overdue.\n\n Kindly return the book to the library as agreed. if you want to extend your time, use the app to extend and pay the extension fee.`;

  const twilioFunctionUrl = 'https://book-overdue-event-4221.twil.io/notify'; // Replace with your function URL

  try {
   const response = await fetch(twilioFunctionUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
     rentId: updatedRent._id,
     notificationMessage: notificationMessage,
     To: 'whatsapp:+2349059391242',
     From: 'whatsapp:+14155238886',
     mediaUrl: book.coverImageUrl,
    }), // Send event data in request body
   });

   if (response.ok) {
    console.log(
     'Twilio notification request successful:',
     await response.text()
    );
    return updatedRent;
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
