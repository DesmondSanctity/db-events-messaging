import { Sequelize } from 'sequelize';
import twilio from 'twilio';
import db from '../config/db.config.js';
import { Users } from '../models/index.js';
import { accountSid, authToken } from '../config/app.config.js';

const { DataTypes } = Sequelize;

const Rents = db.define(
 'rents',
 {
  rentId: {
   type: DataTypes.UUID,
   defaultValue: DataTypes.UUIDV4,
   primaryKey: true,
   allowNull: false,
  },
  rentDate: {
   type: DataTypes.DATE,
   allowNull: true,
  },
  returnDate: {
   type: DataTypes.DATE,
   allowNull: true,
  },
  isOverdue: {
   type: DataTypes.BOOLEAN,
   allowNull: true,
  },
 },

 {
  freezeTableName: true,
 }
);

// Twilio client initialization
const client = twilio(accountSid, authToken);

// After update hook for notification logic
Rents.afterUpdate(async (updatedRent) => {
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

  try {
   // Send Twilio WhatsApp notification
   await client.messages.create({
    body: notificationMessage,
    from: 'whatsapp:+14155238886', // Replace with your number
    to: `whatsapp:${user.phoneNumber}`, // Replace with recipient's number
   });
   console.log('Twilio WhatsApp notification sent successfully!');
  } catch (error) {
   console.error('Error sending Twilio WhatsApp notification:', error);
  }
 }
});

export default Rents;
