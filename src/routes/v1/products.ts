import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import AuthToken from '../../middlewares/jwtAuth'
import { Products, ProductsStore } from '../../models/product'
const productsroute = express.Router()
productsroute.use(bodyParser.json())
const Store = new ProductsStore()
productsroute.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const top5 = req.query.top5
    if (top5 && typeof top5 == 'string') {
      if (top5 == 'true') {
        const product: Products[] = await Store.top5()
        res.json(product)
      } else {
        res.sendStatus(400)
      }
    } else {
      const product: Products[] = await Store.index()
      res.json(product)
    }
  } catch (err) {
    res.status(400)
    res.json(err)
  }
})
productsroute.get(
  '/:id',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id: number = parseInt(req.params.id)
      const product: Products[] = await Store.show(id)
      res.json(product)
    } catch (err) {
      res.status(400)
      res.json(err)
    }
  }
)

productsroute.post(
  '/',
  AuthToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const newproduct: Products = {
        productname: req.body.productname,
        price: req.body.price
      }
      const product = await Store.create(newproduct)
      res.json(product)
    } catch (err) {
      res.status(400)
      res.status(400).json((err as Error).message)
    }
  }
)

export default productsroute
