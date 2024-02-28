import express from 'express'
import { connectDB } from './utils/features.js';
import { errorMiddleware } from './Middlewares/error.js';
import NodeCache from 'node-cache';
import {config} from 'dotenv'
import morgan from 'morgan'
import Stripe from "stripe";
import cors from 'cors'

// Importing Routes
import userRoute from './Routes/user.js'
import productRoute from './Routes/products.js'
import orderRoute from './Routes/order.js'
import paymentRoute from './Routes/payment.js'
import dashbordRoute from './Routes/stats.js'


config({
    path:"./.env"
})

const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || "";
const stripeKey = process.env.STRIPE_KEY || "";

connectDB(mongoURI);

export const stripe = new Stripe(stripeKey)

export const myCache = new NodeCache()

const app = express();

app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

app.get('/', (req, res) => {
    res.send('API working with /api/v1')
})

// Using Routes
app.use("/api/v1/user", userRoute)
app.use("/api/v1/product", productRoute)
app.use("/api/v1/order", orderRoute)
app.use("/api/v1/payment", paymentRoute)
app.use("/api/v1/dashboard", dashbordRoute)

app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`server is running at port number ${PORT}`)
})
