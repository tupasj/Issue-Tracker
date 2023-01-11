import { Sequelize, QueryTypes, Op } from 'sequelize';

const db = new Sequelize(
  'issue_tracker',
  'postgres',
  `${process.env.DBPASSWORD}`,
  {
    host: 'localhost',
    dialect: 'postgres',
  }
);

const testDBConnection = async () => {
  try {
    console.log('Connecting to database...');
    await db.authenticate();
    console.log('Database connection has been established successfully.');
    if (process.env.TESTING == 'true') {
      console.log(
        `NOTE: The TESTING .env variable is currently set to 'true'. This may lead to unexpected runtime behaviors.`
      );
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { db, testDBConnection, QueryTypes, Op };
