import { User } from './auth.js';
import SQ from 'sequelize';
import { sequelize } from '../db/database.js';

const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

const INCLUDE_USER = {
  attributes: [
    'id',
    'text',
    'createdAt',
    'userId',
    [Sequelize.col('user.name'), 'name'],
    [Sequelize.col('user.username'), 'username'],
    [Sequelize.col('user.url'), 'url'],
  ],
  include: {
    model: User,
    attributes: [],
  },
};

export const Tweet = sequelize.define('tweet', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Tweet.belongsTo(User);

export async function getAll() {
  return Tweet.findAll({
    ...INCLUDE_USER,
    order: [['createdAt', 'DESC']],
    raw: true,
  });
}

export async function getByUsername(username) {
  return Tweet.findAll({
    attributes: [...INCLUDE_USER.attributes],
    include: {
      ...INCLUDE_USER.include,
      where: { username },
    },
    order: [['createdAt', 'DESC']],
    raw: true,
  });
}

export async function getById(id) {
  const found = await Tweet.findOne({
    where: { id },
    ...INCLUDE_USER,
  });
  if (!found) {
    return null;
  }
  return found;
}

export async function created(text, userId) {
  const created = await Tweet.create({ text, userId });
  const found = await getById(created.dataValues.id);
  return found;
}

export async function updated(id, text) {
  const tweet = await getById(id);
  if (tweet) {
    await tweet.update({ text });
  }
  return tweet;
}

export async function remove(id) {
  Tweet.destroy({ where: { id } });
}
