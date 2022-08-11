import express from 'express'
import supertest from 'supertest'
import app from '../../index'
import { User } from '../../models/user'
// create a request object
const request = supertest(app)
const newuser: User = {
  email: 'persontest@mail',
  firstname: 'person',
  lastname: 'lastname',
  password: '212'
}
app.use(express.json())
describe('testing users endpoint', () => {
  it('test unautherized users endpoint', async () => {
    const response = await request.get('/users')
    expect(response.status).toBe(401)
  })
  it('test post endpoint', async () => {
    const response = await request.post('/users').send(newuser)
    expect(response.status).toBe(200)
  })
  it('test autherized users endpoint', async () => {
    const response = await request
      .get('/users')
      .set(
        'authorization',
        'Bearer ' +
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoicGVyc29udGVzdEBtYWlsIiwiZmlyc3ROYW1lIjoicGVyc29uIiwibGFzdE5hbWUiOiJsYXN0bmFtZSJ9LCJpYXQiOjE2NjAyMjQ0OTF9.McOfTWfyz5iNBvPcWPt-Mg1Y0SRoFok7Xkr5Kw_i4FU'
      )
    expect(response.status).toBe(200)
  })
  it('test autherized users with show endpoint', async () => {
    const response = await request
      .get('/users/2')
      .set(
        'authorization',
        'Bearer ' +
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoicGVyc29udGVzdEBtYWlsIiwiZmlyc3ROYW1lIjoicGVyc29uIiwibGFzdE5hbWUiOiJsYXN0bmFtZSJ9LCJpYXQiOjE2NjAyMjQ0OTF9.McOfTWfyz5iNBvPcWPt-Mg1Y0SRoFok7Xkr5Kw_i4FU'
      )
    expect(response.status).toBe(200)
  })
})
