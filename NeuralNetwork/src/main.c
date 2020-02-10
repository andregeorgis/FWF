#include <stdio.h>
#include <string.h>
#include "bitmap.h"
int main(int argc, char **argv){

  
// Using the AI
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Conversion of bitmap into pixels

// Setup the first layer of the neural network
// Grab all 784 neurons to form the first layer of the network

// Setup the second layer of the neural Network
// 400 Neurons with a value between 0 to 1
// Each neuron = (sigmoid function([weighted matrix][each neuron]+[bias]))
// where weighted matrix = pixel activation * weight

// Setup the final layer
// 10 Neurons with a value between 0 to 1
// Outputs from the second layer
// Each neuron = (sigmoid function([weighted matrix][each neuron]+[bias]))
// where weighted matrix = pixel activation * weight

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Training the AI
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Calculate the error of tests
// Cost = Sum of [(Error - Actual)^2 {for each pixel}] {aka cost}
// Goal is to reduce the number given by averaging the cost of many tests

//Back Propogation
// Determine the negative gradient (cost function)
// x = weight * prevneuron + biases
// neuron = signoid(x)
// Cost = sigma( (neuron - desire)^2 )
// First we must find the derivative of the weights on Cost
// dCost/dweight = dx/dweight . dneuron/dx . dcost/dneuron
// dCost/dweight = prevneuron . signoid'(x) . 2(neuron - desire)
//




// dCost/dbias = 2(neuron - desire) . signoid'(x)
// dCost/dprevneuron = 2(neuron - desire) . signoid'(x) . weight



// Back Propagation
// Organise all weights and biases into a coloumn vector
// Suvbtract the coloumn vector and the negative gradients
// Do it for many tests (a subset)
// Average all result and you will get the cost function (all the nudges to subtract)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  return 0;
}
