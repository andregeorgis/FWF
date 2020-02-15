#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "network.h"
#include "functions.h"

int main(int argc, char **argv){

  int num_layers, input_neurons, hidden_neurons, output_neurons, total;

  num_layers = 3;
  input_neurons = 784;
  hidden_neurons = 16;
  output_neurons = 10;

  total = input_neurons + hidden_neurons + output_neurons;

  Neuron_Array*neuron_array = create_memory(total);
  neuron_array = create_neuron_array(neuron_array, input_neurons, hidden_neurons, output_neurons);

  //Debugging
  for (int i = 0; i < total; i++){
    if (i >= 0 && i < input_neurons){
      printf("=========First Layer=======\n");
      printf("bias for neuron[%d] = %f\n", i, neuron_array->list_of_neurons[i]->bias);
        for (int j = 0; j < hidden_neurons; j++){
          printf("weights[%d][%d] = %f\n", i, j, neuron_array->list_of_neurons[i]->list_of_weights[j]);
        }
        printf("\n");
    }
    if (i >= input_neurons && i < input_neurons + hidden_neurons){
      printf("=========Second Layer=======\n");
      printf("bias for neuron[%d] = %f\n", i, neuron_array->list_of_neurons[i]->bias);
        for (int j = 0; j < output_neurons; j++){
          printf("weights[%d][%d] = %f\n", i, j, neuron_array->list_of_neurons[i]->list_of_weights[j]);
        }
        printf("\n");
    }
    if (i >= input_neurons + hidden_neurons && i < total){
      printf("=========Third Layer=======\n");
      printf("bias for neuron[%d] = %f\n", i, neuron_array->list_of_neurons[i]->bias);
        for (int j = 0; j < output_neurons; j++){
          printf("weights[%d][%d] = %f\n", i, j, neuron_array->list_of_neurons[i]->list_of_weights[j]);
        }
        printf("\n");
    }
  }












  return 0;
}
