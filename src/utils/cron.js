import cron from 'node-cron';
import { Rents } from '../models/index.js';

// Cron job to run every 5 minutes
cron.schedule('*/1 * * * *', async () => {
 console.log("/** cron started */")
 const overdueRents = await Rents.find({
  returnDate: { $lt: new Date() },
  isOverdue: false,
 });

 overdueRents.forEach(async (rent) => {
  rent.isOverdue = true;
  await rent.save();
 });
 console.log("/** cron ended */")
});
