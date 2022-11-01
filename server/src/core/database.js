import { Sequelize } from 'sequelize';
import config from 'config';

export const sequelize = new Sequelize(config.get('DB_NAME'), config.get('DB_USER_NAME'), config.get('DB_PASSWORD'), {
  host: config.get('DB_HOST'),
  dialect: 'postgres'
});

const database = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connection has been established successfully to db ${config.get('DB_NAME')}.`);

    process.on('SIGINT', async () => {
      await sequelize.close();
      console.log('DB connection disconnected.');
      process.exit(0);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export default database