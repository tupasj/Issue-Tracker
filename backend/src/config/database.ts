import { Sequelize } from "sequelize";

const db = new Sequelize(
  "issue_tracker",
  "postgres",
  `${process.env.DBPASSWORD}`,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

const testDBConnection = async () => {
  try {
    console.log("Connecting to database...");
    await db.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { db, testDBConnection };
