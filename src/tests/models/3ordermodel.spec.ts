import { Order, OrderStore } from '../../models/order'

// create a request object
const store = new OrderStore()
const neworder: Order = {
  user_id: 1,
  completed: false
}
describe('order Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(store.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(store.create).toBeDefined()
  })

  it('should have a CompletedOrders method', () => {
    expect(store.CompletedOrders).toBeDefined()
  })
  it('should have a addproducttoorder method', () => {
    expect(store.addproducttoorder).toBeDefined()
  })

  it('create method should add a new order ', async () => {
    const result = await store.create(neworder.user_id)
    expect(result).toEqual({
      id: 1,
      user_id: 1,
      completed: false
    })
  })

  it('index method should return a list of users', async () => {
    const result = await store.index()
    expect(result).toEqual([
      {
        id: 1,
        user_id: 1,
        completed: false
      }
    ])
  })

  it('show method should return order with id==1', async () => {
    const result = await store.show(1)
    expect(result).toEqual({
      id: 1,
      user_id: 1,
      completed: false
    })
  })
  it('CompletedOrders method should return a list of Completed Orders', async () => {
    const result = await store.CompletedOrders(
      neworder.user_id,
      neworder.completed
    )
    expect(result).toEqual([
      {
        id: 1,
        user_id: 1,
        completed: false
      }
    ])
  })
})
