const express = require('express');
const router = express.Router();
const app = require('../app')
const userRoutes = require('./userRoutes');
const adminRoutes=require('./adminRoutes')
const categoryRoutes = require('./categoryRoutes')
const productRoutes= require('./productRoutes')
const cartRoutes= require('./cartRoutes')

app.use('/user', userRoutes);
app.use('/admin/', adminRoutes);
app.use('/category',categoryRoutes)
app.use('/products',productRoutes)
app.use('/',cartRoutes)

module.exports = router;