require('dotenv').config();
const bcrypt = require('bcrypt');
const connectDB = require('../db/connect');
const Admin = require('../models/Admin');

const main = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error('MONGO_URI is required in environment');
    process.exit(1);
  }

  await connectDB(mongoUri);

  const username = process.env.ADMIN_USER || process.argv[2];
  const password = process.env.ADMIN_PASS || process.argv[3];

  if (!username || !password) {
    console.error('ADMIN_USER and ADMIN_PASS must be provided as env vars or arguments');
    process.exit(1);
  }

  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);

  const existing = await Admin.findOne({ username });
  if (existing) {
    existing.passwordHash = hash;
    await existing.save();
    console.log('Updated existing admin user:', username);
  } else {
    await Admin.create({ username, passwordHash: hash });
    console.log('Created admin user:', username);
  }
  process.exit(0);
};

main().catch(err => { console.error(err); process.exit(1); });
