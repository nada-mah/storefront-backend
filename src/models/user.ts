import Client from '../database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

export type User = {
  id?: number
  email: string
  firstname: string
  lastname: string
  password: string
}

const pepper = process.env.BCRYPT_PASSWORD
const saltRounds = process.env.SALT_ROUNDS

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM users'
      const result = await conn.query(sql)
      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get users. Error: ${(err as Error).message}`)
    }
  }
  async show(id: number): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)'
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }

  async create(usr: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (email,firstname,lastname,password) VALUES($1, $2, $3, $4) RETURNING *'
      const conn = await Client.connect()
      const hash: string = bcrypt.hashSync(
        usr.password + (pepper as string),
        parseInt(saltRounds as string)
      )
      const result = await conn.query(sql, [
        usr.email,
        usr.firstname,
        usr.lastname,
        hash
      ])

      const user = result.rows[0]

      conn.release()

      return user
    } catch (err) {
      throw new Error(
        `Could not add new user ${usr.email} . Error: ${(err as Error).message}`
      )
    }
  }
  async authenticate(email: string, password: string): Promise<User | null> {
    const conn = await Client.connect()
    const sql = 'SELECT password FROM users WHERE email=($1)'

    const result = await conn.query(sql, [email])

    conn.release()
    if (result.rows.length) {
      const user = result.rows[0]

      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user
      }
    }

    return null
  }
}
