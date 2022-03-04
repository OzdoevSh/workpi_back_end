import sequelize = require('../../db')
import {DataTypes} from 'sequelize'

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  first_name: {type: DataTypes.STRING},
  last_name: {type: DataTypes.STRING}
})

module.exports = {User}