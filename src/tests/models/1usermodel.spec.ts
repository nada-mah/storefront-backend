import bcrypt from 'bcrypt'
import { User, UserStore } from '../../models/user'

// create a request object
const store = new UserStore()
const newuser: User = {
  email: 'person@mail',
  firstname: 'person',
  lastname: 'lastname',
  password: '222'
}
const pepper = process.env.BCRYPT_PASSWORD

describe('user Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(store.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(store.create).toBeDefined()
  })

  it('should have a authenticate method', () => {
    expect(store.authenticate).toBeDefined()
  })

  it('create method should add a new user ', async () => {
    const result = await store.create(newuser)
    expect(result.id).toEqual(1)
    expect(result.email).toEqual('person@mail')
    expect(result.firstname).toEqual('person')
    expect(result.lastname).toEqual('lastname')
    expect(bcrypt.compareSync(result.password + pepper, newuser.password))
      .toBeTruthy
  })

  it('index method should return a list of users', async () => {
    const result = await store.index()
    expect(result[0].id).toEqual(1)
    expect(result[0].email).toEqual('person@mail')
    expect(result[0].firstname).toEqual('person')
    expect(result[0].lastname).toEqual('lastname')
    expect(bcrypt.compareSync(result[0].password + pepper, newuser.password))
      .toBeTruthy
  })

  it('show method should return user with id==1', async () => {
    const result = await store.show(1)
    expect(result.id).toEqual(1)
    expect(result.email).toEqual('person@mail')
    expect(result.firstname).toEqual('person')
    expect(result.lastname).toEqual('lastname')
    expect(bcrypt.compareSync(result.password + pepper, newuser.password))
      .toBeTruthy
  })
})
