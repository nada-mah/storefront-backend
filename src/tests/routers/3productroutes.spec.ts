import express from 'express'
import supertest from 'supertest'
import app from '../../index'
import { Products } from '../../models/product'
// import jwt from 'jsonwebtoken'
// create a request object
const request = supertest(app)
const newproduct: Products = {
  productname: 'product5',
  price: 190
}
app.use(express.json())
describe('testing products endpoint', () => {
  it('test get products endpoint', async () => {
    const response = await request.get('/products')
    expect(response.status).toBe(200)
  })
  it('test post endpoint', async () => {
    const response = await request
      .post('/products')
      .send(newproduct)
      .set(
        'authorization',
        'Bearer ' +
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoicGVyc29udGVzdEBtYWlsIiwiZmlyc3ROYW1lIjoicGVyc29uIiwibGFzdE5hbWUiOiJsYXN0bmFtZSJ9LCJpYXQiOjE2NjAyMjQ0OTF9.McOfTWfyz5iNBvPcWPt-Mg1Y0SRoFok7Xkr5Kw_i4FU'
      )
    expect(response.status).toBe(200)
  })
})
