import express from 'express'
import supertest from 'supertest'
import app from '../../index'
import { Order } from '../../models/order'
// create a request object
const request = supertest(app)
const neworder: Order = {
  user_id: 2,
  completed: false
}
app.use(express.json())
describe('testing products endpoint', () => {
  it('test get products endpoint', async () => {
    const response = await request
      .get('/orders')
      .set(
        'authorization',
        'Bearer ' +
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoicGVyc29udGVzdEBtYWlsIiwiZmlyc3ROYW1lIjoicGVyc29uIiwibGFzdE5hbWUiOiJsYXN0bmFtZSJ9LCJpYXQiOjE2NjAyMjQ0OTF9.McOfTWfyz5iNBvPcWPt-Mg1Y0SRoFok7Xkr5Kw_i4FU'
      )
    expect(response.status).toBe(200)
  })
  it('test post endpoint', async () => {
    const response = await request
      .post('/orders')
      .send(neworder)
      .set(
        'authorization',
        'Bearer ' +
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoicGVyc29udGVzdEBtYWlsIiwiZmlyc3ROYW1lIjoicGVyc29uIiwibGFzdE5hbWUiOiJsYXN0bmFtZSJ9LCJpYXQiOjE2NjAyMjQ0OTF9.McOfTWfyz5iNBvPcWPt-Mg1Y0SRoFok7Xkr5Kw_i4FU'
      )
    expect(response.status).toBe(200)
  })
})
