import Client from '../database'
import dotenv from 'dotenv'
dotenv.config()

export type Order = {
  id?: number
  user_id: number
  completed: boolean
}

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM orders'
      const result = await conn.query(sql)
      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${(err as Error).message}`)
    }
  }
  async show(id: number): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)'
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find order of ${id}. Error: ${err}`)
    }
  }

  async create(user_id: number): Promise<Order> {
    try {
      const sql = 'INSERT INTO orders (user_id) VALUES($1) RETURNING *'
      const conn = await Client.connect()

      const result = await conn.query(sql, [user_id])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(
        `Could not add new order. Error: ${(err as Error).message}`
      )
    }
  }
  async CompletedOrders(user_id: number, completed: boolean): Promise<Order[]> {
    try {
      const sql = 'select * from orders where user_id=$1 and completed=$2'
      const conn = await Client.connect()

      const result = await conn.query(sql, [user_id, completed])

      const order = result.rows

      conn.release()
      return order
    } catch (err) {
      throw new Error(
        `Could not find Completed Orders for user ${user_id} . Error: ${
          (err as Error).message
        }`
      )
    }
  }
  async addproducttoorder(
    product_id: number,
    order_id: number,
    quantity: number
  ): Promise<Order[]> {
    try {
      const conn = await Client.connect()
      const sql =
        'INSERT INTO order_products (product_id,order_id,quantity) VALUES($1,$2,$3) RETURNING *'
      const result = await conn.query(sql, [product_id, order_id, quantity])
      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(
        `Could not get add product. Error: ${(err as Error).message}`
      )
    }
  }
}
