import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {default as Product} from '../imports/product';
import {default as ShoppingCart} from '../imports/shoppingCart';

import './main.html';
var shoppingCart = new ShoppingCart();
Session.set("total", shoppingCart.total);
 
Template.hello.onCreated(function helloOnCreated() {
  // this.total = new ReactiveVar();
  // counter starts at 0
  Meteor.subscribe(Product.COLLECTION_NAME);
  //Meteor.subscribe(ShoppingCart.COLLECTION_NAME);
});

Template.productCreate.onCreated(function onCreated() {
  this.errors = new ReactiveVar([]);
});

Template.shoppingCart.helpers({
  cart: shoppingCart,
  total(){
    var total = Session.get("total");
    return total;
  }
});

Template.hello.helpers({
  products(){
    var pds = Product.findCursor();
    console.log(pds);
    console.log(pds.fetch());
    return pds.fetch();
  }
});

Template.productCreate.helpers({
  errors(){
    console.log('++++++', Template.instance().errors.get());
    return Template.instance().errors.get();
  }
});

Template.productView.events({
  'click button'(event, instance) {
    shoppingCart.addProduct(instance.data);
    Session.set("total", shoppingCart.total);
  }
});

Template.productCreate.events({
  'submit .new-product'(event) {
    // Prevent default browser form submit
    event.preventDefault();
    Template.instance().errors.set([]);
    // Get value from form element
    const target = event.target;
    var price = parseFloat(target.price.value);
    var newProduct = new Product( { name: target.name.value,
      price: price ? price : target.price.value} );
    newProduct.validate();
    if(newProduct.isValid()){
      newProduct.save();
    } else {
      console.log('err', newProduct.errors);
      var errors = [];

      for(let error in newProduct.errors){
        errors.push({message: newProduct.errors[error][0], field: error});
      }
      Template.instance().errors.set(errors);
      
    }
  }
});
