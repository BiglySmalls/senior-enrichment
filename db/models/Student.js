const Sequelize = require('sequelize');
const db = require('../index');

const Student = db.define('student', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate : {
            allowEmpty: false
        }
    },

    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    }
});

module.exports = Student;