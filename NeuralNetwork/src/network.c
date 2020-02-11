#include <stdio.h>
#include <stdlib.h>
#include "network.h"
#include "functions.h"

Neuron*create_neuron(){

  Neuron*neuron = malloc(sizeof(Neuron));

  neuron->weight = gaussrand();
  neuron->bias = gaussrand();

  return neuron;
}
