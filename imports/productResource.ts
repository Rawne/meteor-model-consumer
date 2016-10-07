import {Meteor} from 'meteor/meteor';
import {default as Product} from './product';

// I recommend making a generic resource file for 
// all of your methods and publications, since they 
// will always have comparable CRUD methods and publications

var saveMethod = function (resourceData) {  
    let product = new Product(resourceData);      
    product.validate();
    if (!product.isValid()) {
      throw new Meteor.Error(400, 'Error 400: Invalid', 'the document is invalid');
    }
    return product.save();
};

Meteor.publish(Product.COLLECTION_NAME, ()=> {
  return Product.findCursor();
});

Meteor.methods({[Product.COLLECTION_NAME + '.save']: saveMethod});