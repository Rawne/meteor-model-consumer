import {MeteorModel, RequiredValidator, DataTypeValidator} from '@gdn/meteor-model';
import {products, productCollectionName} from './collections';

export default class Product extends MeteorModel{
  constructor(initialAttributes:Object) {     
    super(initialAttributes);
  }
  
  public attributes() {
    return {
      _id: {type: String},
      name: {type: String},
      price: {type: Number, default: 50}
    };
  }

  private validationRules = {
    _base:[new DataTypeValidator(this.attributes())],
    name: [new RequiredValidator()],    
    price: [new RequiredValidator()]
  }

  public static COLLECTION_NAME = productCollectionName;
  public static COLLECTION = products;

  public get id(){
    return this._attrs._id;
  }

  public get name(){
    return this._attrs.name;
  }
  
  public get price(){
    return this._attrs.price;
  }
}