import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import AuthToken from '../../middlewares/jwtAuth'
import { Order, OrderStore } from '../../models/order'
const ordersroute = express.Router()
ordersroute.use(bodyParser.json())
const Store = new OrderStore()
ordersroute.get(
  '/',
  AuthToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user_id: number = parseInt(req.body.user_id)
      const { status } = req.query
      const s = status as unknown as boolean
      if (status) {
        const orders = await Store.CompletedOrders(user_id, s)
        res.json(orders)
      } else {
        const orders: Order[] = await Store.index()
        res.json(orders)
      }
    } catch (err) {
      res.status(400)
      res.json(err)
    }
  }
)
ordersroute.get(
  '/:id',
  AuthToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id: number = parseInt(req.params.id)
      const orders: Order[] = await Store.show(id)
      res.json(orders)
    } catch (err) {
      res.status(400)
      res.json(err)
    }
  }
)
ordersroute.post(
  '/',
  AuthToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user_id: number = parseInt(req.body.user_id)
      const orders = await Store.create(user_id)
      res.json(orders)
    } catch (err) {
      res.status(400)
      res.status(400).json((err as Error).message)
    }
  }
)
ordersroute.post(
  '/:product_id',
  AuthToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const product_id: number = parseInt(req.params.product_id)
      const order_id: number = parseInt(req.body.order_id)
      const quantity: number = parseInt(req.body.quantity)
      const orders = await Store.addproducttoorder(
        product_id,
        order_id,
        quantity
      )
      res.json(orders)
    } catch (err) {
      res.status(400)
      res.status(400).json((err as Error).message)
    }
  }
)
export default ordersroute
