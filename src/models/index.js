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
Books.hasOne(Rents, {
 foreignKey: 'bookId',
 onDelete: 'cascade',
});
Rents.belongsTo(Books, {
 foreignKey: 'bookId',
 onDelete: 'cascade',
});

// Users and Rents Association
Rents.belongsTo(Users, {
  as: "borrower",
  foreignKey: "borrowedBy",
  onDelete: "SET NULL",
});

Rents.belongsTo(Users, {
  as: "renter",
  foreignKey: "ownedBy",
  onDelete: "SET NULL",
});

Users.hasMany(Rents, {
  as: "borrowingUser",
  foreignKey: "borrowedBy",
  onDelete: "SET NULL",
});

Users.hasMany(Rents, {
  as: "OwnerUser",
  foreignKey: "ownedBy",
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
