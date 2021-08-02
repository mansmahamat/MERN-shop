const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'John Doe',
    email: 'john@ggmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Paul Fergg',
    email: 'paul@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'Tomù Kol',
    email: 'Tomù@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

module.exports = users;
