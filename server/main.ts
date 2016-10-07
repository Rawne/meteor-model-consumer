import { Meteor } from 'meteor/meteor';
import '../imports/productResource';
import {default as Product} from '../imports/product';

Meteor.startup(() => {
  if(Product.findCursor().fetch().length === 0){
    var shoes = new Product({name:'Shoes', price: 25});
    var pants = new Product({name:'pants', price: 50});
    var jacket = new Product({name:'jacket', price: 65});
    shoes.save();
    pants.save();
    jacket.save();
    
  }
});
