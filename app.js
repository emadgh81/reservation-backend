const express =require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

const customerRoutes = require('./routes/customerRoutes');
const employerRoutes = require('./routes/employerRoutes');
const adminRoutes = require('./routes/adminRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use('customers' , customerRoutes);
app.use('admins' , adminRoutes);
app.use('employers' , employerRoutes);
app.use('bookings' , bookingRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT , () => console.log(`server running on port ${PORT}`));