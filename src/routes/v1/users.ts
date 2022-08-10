import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import AuthToken from '../../middlewares/jwtAuth'
import { User, UserStore } from '../../models/user'
import jwt from 'jsonwebtoken'
const firstroute = express.Router()
firstroute.use(bodyParser.json())
const Store = new UserStore()
firstroute.get(
  '/',
  AuthToken,
  async (_req: Request, res: Response): Promise<void> => {
    try {
      const users: User[] = await Store.index()
      res.json(users)
    } catch (err) {
      res.status(400)
      res.json(err)
    }
  }
)
firstroute.get(
  '/:id',
  AuthToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id: number = parseInt(req.params.id)
      const users: User = await Store.show(id)
      res.json(users)
    } catch (err) {
      res.status(400)
      res.json(err)
    }
  }
)
firstroute.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const newuser: User = {
      email: req.body.email as string,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password
    }
    const tokenSecret = process.env.TOKEN_SECRET
    const users: User = await Store.create(newuser)
    const token = jwt.sign(
      {
        user: {
          email: users.email,
          firstName: users.firstname,
          lastName: users.lastname
        }
      },
      tokenSecret as string
    )
    res.json(token)
  } catch (err) {
    res.status(400).json((err as Error).message)
  }
})

export default firstroute
