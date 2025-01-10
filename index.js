const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
// Endpoint 1
function calculateCartTotal(newItemPrice, cartTotal) {
  return cartTotal + newItemPrice;
}
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCartValue = calculateCartTotal(newItemPrice, cartTotal);
  res.send(totalCartValue.toString());
});

// Endpoint 2
function discountForMembers(cartTotal, isMember) {
  let discount = 10;
  if (isMember) {
    return cartTotal - (cartTotal * discount) / 100;
  } else {
    return cartTotal;
  }
}
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  res.send(discountForMembers(cartTotal, isMember).toString());
});

// Endpoint 3
function calculateTax(cartTotal) {
  let tax = 20;
  return cartTotal / tax;
}
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTax(cartTotal).toString());
});

// Endpoint 4
function calculateDeliveryTime(shippingMethod, distance) {
  if (shippingMethod === 'express') {
    return distance / 100;
  } else if (shippingMethod === 'standard') {
    return distance / 50;
  }
}
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(calculateDeliveryTime(shippingMethod, distance).toString());
});

// Endpoint 5
function calculateShippingCost(weight, distance) {
  return weight * distance * 0.1;
}
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(calculateShippingCost(weight, distance).toString());
});

// Endpoint 6
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let points = purchaseAmount * 2;
  res.send(points.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
