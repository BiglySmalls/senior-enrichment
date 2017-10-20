const Sequelize = require('sequelize');
const Campus = require('./Campus');
const db = require('../index');

const Student = db.define('student', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    }
}, {
        defaultScope: {
            include: [Campus]
        }
    });

module.exports = Student;