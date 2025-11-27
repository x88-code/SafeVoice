require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/db/connect');
const reportsRouter = require('./src/routes/reports');
const authRouter = require('./src/routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/reports', reportsRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => res.send({ status: 'SafeVoice API running' }));

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
};

start();