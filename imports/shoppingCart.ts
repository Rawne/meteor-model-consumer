import {BaseModel, RequiredValidator} from '@gdn/meteor-model';
import {default as Product} from './product';

export default class ShoppingCart extends BaseModel{
  constructor(initialAttributes:Object) {     
    super(initialAttributes);
  }

  public defaults() {
    return {
      products: [],
      username: 'new user'
    };
  }
  
  public get products(): [Product]{
    return this._attrs.products;
  }

  public addProduct(product: Product){
    this._attrs.products.push(product);
  }

  public get total(){
    return this.products.map((product) => product.price).reduce((prev, cur)=> prev + cur, 0);
  }
  
}