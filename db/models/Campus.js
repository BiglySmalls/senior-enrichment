const Sequelize = require('sequelize');
const db = require('../index');

const Campus = db.define('campus', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate : {
            notEmpty: true
        }
    },

    image: {
        type: Sequelize.STRING,
        defaultValue: 'http://www.how-to-draw-funny-cartoons.com/image-files/cartoon-planet-5.gif',
        validate: {
            isUrl: true,
        }
    }
});

module.exports = Campus;