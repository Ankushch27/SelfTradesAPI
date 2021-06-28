const express = require('express');

require('./db/mysql');
const authRoutes = require('./routes/authRoutes');
const couponRoutes = require('./routes/couponRoutes');
const dataRoutes = require('./routes/dataRoutes');
const razorpayRoutes = require('./routes/razorpayRoutes');
const userRoutes = require('./routes/userRoutes');
const AppError = require('./utils/AppError');
const errorController = require('./middlewares/errorController');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(authRoutes);
app.use(couponRoutes);
app.use(dataRoutes);
app.use(razorpayRoutes);
app.use(userRoutes);

app.all('*', (req, res) => {
  throw new AppError(`Requsted url: ${req.path} not found`, 404);
});

app.use(errorController);

app.listen(PORT, () => console.log(`Servr running on port ${PORT}`));
