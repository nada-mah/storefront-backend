import supertest from 'supertest'
import app from '../../index'
import AuthToken from '../../middlewares/jwtAuth'
// import { User, UserStore } from '../../models/user'
// import jwt from 'jsonwebtoken'
// create a request object
const request = supertest(app)

describe('Test endpoint response', () => {
  it('test hello world endpoint', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })
  it('test users endpoint', async () => {
    AuthToken
    const response = await request.get('/users')
    expect(response.status).toBe(401)
  })
  it('test post endpoint', async () => {
    AuthToken
    const response = await request.post('/users')
    expect(response.status).toBe(200)
  })
})
