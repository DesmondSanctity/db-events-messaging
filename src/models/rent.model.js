import { Sequelize } from 'sequelize';
import db from '../config/db.config.js';
import { overdueEvent } from '../events/overdue.js';

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

// After update hook for notification logic
Rents.afterUpdate(async (updatedRent) => {
 await overdueEvent(updatedRent);
});

export default Rents;
