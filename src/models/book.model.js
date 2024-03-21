import { Sequelize } from 'sequelize';
import db from '../config/db.config.js';

const { DataTypes } = Sequelize;

const Books = db.define(
 'books',
 {
  bookId: {
   type: DataTypes.UUID,
   defaultValue: DataTypes.UUIDV4,
   primaryKey: true,
   allowNull: false,
  },
  title: {
   type: DataTypes.STRING,
   allowNull: true,
  },
  category: {
   type: DataTypes.STRING,
   allowNull: true,
  },
  coverImageURL: {
   type: DataTypes.STRING,
   allowNull: true,
  },
  isbnNumber: {
   type: DataTypes.STRING,
   allowNull: true,
  },
 },

 {
  freezeTableName: true,
 }
);

export default Books;
