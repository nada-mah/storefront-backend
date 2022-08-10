import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import firstroute from './routes/v1/users'
import ordersroute from './routes/v1/orders'
import productsroute from './routes/v1/products'
dotenv.config()
const PORT = process.env.PORT || 3000
// create an instance server
const app: Application = express()
// HTTP request logger middleware
app.use(morgan('dev'))
app.use('/users', firstroute)
app.use('/orders', ordersroute)
app.use('/products', productsroute)
// add routing for / path
app.get('/', (_req: Request, res: Response) => {
  res.json({
    greeting: 'Hello World!!!'
  })
})
// start express server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is starting at prot:${PORT}`)
})
export default app
