import db from '../config/db.config.js';
import Books from './book.model.js';
import Users from './user.model.js';
import Rents from './rent.model.js';

/************************* Associations For Models  ****************************/

// User and Books Association
Users.hasMany(Books, {
 as: 'author',
 foreignKey: 'userId',
 onDelete: 'cascade',
});
Books.belongsTo(Users, {
 foreignKey: 'userId',
 onDelete: 'cascade',
});

// Rents and Books Association
Rents.hasMany(Books, {
 foreignKey: 'rentId',
 onDelete: 'cascade',
});
Books.belongsTo(Rents, {
 foreignKey: 'rentId',
 onDelete: 'cascade',
});

// Users and Rents Association
Users.belongsTo(Rents, {
  as: "borrower",
  foreignKey: "borrowedBy",
  onDelete: "SET NULL",
});

Users.belongsTo(Rents, {
  as: "renter",
  foreignKey: "rentedBy",
  onDelete: "SET NULL",
});

Rents.hasMany(Users, {
  as: "borrowingUser",
  foreignKey: "borrowedBy",
  onDelete: "SET NULL",
});

Rents.hasMany(Users, {
  as: "rentingUser",
  foreignKey: "rentedBy",
  onDelete: "SET NULL",
});

/************************* Prototypes For Models  ****************************/

try {
 await db
  .sync({ alter: true })
  .then(() => {
   console.log('Database synced');
  })
  .catch((err) => {
   console.error({ message: 'Error syncing database', error: err });
  });
} catch (error) {
 console.error('Unable to connect to the database due to: ', error);
}

export { Books, Users, Rents };
