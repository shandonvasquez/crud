import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const Flight = sequelize.define('Flight', {
  origin_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  destination_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  plane_id: {
    type: DataTypes.INTEGER,
  },
  departure_time: {
    type: DataTypes.TIMESTAMP,
    allowNull: false,
  },
  check_in: {
    type: DataTypes.TIMESTAMP,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
});

export default Flight;
