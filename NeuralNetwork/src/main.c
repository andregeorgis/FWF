#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "network.h"
#include "functions.h"

int main(int argc, char **argv){

  int num_layers, input_neurons, hidden_neurons, output_neurons, total;

  num_layers = 3;
  input_neurons = 3;
  hidden_neurons = 3;
  output_neurons = 3;

  total = num_layers + input_neurons + hidden_neurons + output_neurons;
  Neuron_Array*neuron_array = create_memory(total);
  neuron_array = create_neuron_array(neuron_array, total);

  for (int i = 0; i < total; i++){
    printf("weights = %f ||", neuron_array->list_of_neurons[i]->bias);
    printf("biases = %f\n", neuron_array->list_of_neurons[i]->bias);
  }

  return 0;
}
