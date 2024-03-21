import { Sequelize } from 'sequelize';
import db from '../config/db.config.js';

const { DataTypes } = Sequelize;

const Users = db.define(
 'users',
 {
  userId: {
   type: DataTypes.UUID,
   defaultValue: DataTypes.UUIDV4,
   primaryKey: true,
   allowNull: false,
  },
  email: {
   type: DataTypes.STRING,
   allowNull: true,
  },
  password: {
   type: DataTypes.STRING,
   allowNull: true,
  },
  fullName: {
   type: DataTypes.STRING,
   allowNull: true,
  },
  userType: {
   type: DataTypes.ENUM('author', 'reader'),
   allowNull: true,
   defaultValue: 'reader',
  },
  isVerified: {
   type: DataTypes.BOOLEAN,
   allowNull: true,
  }
 },

 {
  freezeTableName: true,
  scopes: {
   withoutSensitiveInfo: {
    attributes: { exclude: ['password'] },
   },
  },
 }
);

export default Users;
