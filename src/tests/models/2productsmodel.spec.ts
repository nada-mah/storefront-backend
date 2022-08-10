import { Products, ProductsStore } from '../../models/product'

// create a request object
const store = new ProductsStore()
const newproduct: Products = {
  productname: 'prouduct1',
  price: 100
}
describe('product Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(store.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(store.create).toBeDefined()
  })

  it('should have a top5 method', () => {
    expect(store.top5).toBeDefined()
  })

  it('create method should add a new prouduct ', async () => {
    const result = await store.create(newproduct)
    expect(result).toEqual({
      id: 1,
      productname: 'prouduct1',
      price: 100
    })
  })

  it('index method should return a list of prouducts', async () => {
    const result = await store.index()
    expect(result).toEqual([
      {
        id: 1,
        productname: 'prouduct1',
        price: 100
      }
    ])
  })

  it('show method should return a prouduct1 with id==1', async () => {
    const result = await store.show(1)
    expect(result).toEqual({
      id: 1,
      productname: 'prouduct1',
      price: 100
    })
  })
})
