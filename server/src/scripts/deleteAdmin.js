require('dotenv').config();
const connectDB = require('../db/connect');
const Admin = require('../models/Admin');

const main = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error('MONGO_URI is required in environment');
    process.exit(1);
  }

  await connectDB(mongoUri);

  try {
    const result = await Admin.deleteMany({});
    console.log(`Deleted ${result.deletedCount} admin user(s)`);
    process.exit(0);
  } catch (err) {
    console.error('Error deleting admin users:', err);
    process.exit(1);
  }
};

main();
