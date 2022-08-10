import Client from '../database'
import dotenv from 'dotenv'
dotenv.config()

export type Products = {
  id?: number
  productname: string
  price: number
}

export class ProductsStore {
  async index(): Promise<Products[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM products'
      const result = await conn.query(sql)
      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(
        `Could not get products. Error: ${(err as Error).message}`
      )
    }
  }
  async show(id: number): Promise<Products[]> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)'
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find product of ${id}. Error: ${err}`)
    }
  }

  async create(prod: Products): Promise<Products> {
    try {
      const sql =
        'INSERT INTO products (productName,price) VALUES($1,$2) RETURNING *'
      const conn = await Client.connect()

      const result = await conn.query(sql, [prod.productname, prod.price])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(
        `Could not add new product. Error: ${(err as Error).message}`
      )
    }
  }
  async top5(): Promise<Products[]> {
    try {
      const conn = await Client.connect()
      const sql =
        'SELECT count(quantity) as list ,productname from order_products inner join products on products.id=order_products.product_id group by productname order by list desc limit 5'
      const result = await conn.query(sql)
      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(
        `Could not get products. Error: ${(err as Error).message}`
      )
    }
  }
}
