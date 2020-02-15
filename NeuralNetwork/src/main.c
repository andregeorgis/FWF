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
  output_neurons = 2;

  total = input_neurons + hidden_neurons + output_neurons;

  Neuron_Array*neuron_array = create_memory(total);
  neuron_array = create_neuron_array(neuron_array, input_neurons, hidden_neurons, output_neurons);

  //Add random activatiosnf ro input layer for now===========================
  neuron_array->list_of_neurons[0]->activation = 0.15;
  neuron_array->list_of_neurons[1]->activation = 0.5;
  neuron_array->list_of_neurons[2]->activation = 0.25;

  calculate_activation(neuron_array, input_neurons, hidden_neurons, output_neurons);

  //Debugging
  // for (int i = 0; i < total; i++){
  //   if (i >= 0 && i < input_neurons){
  //     printf("=========First Layer=======\n");
  //     printf("activation for neuron[%d] = %f\n", i, neuron_array->list_of_neurons[i]->activation);
  //     printf("bias for neuron[%d] = %f\n", i, neuron_array->list_of_neurons[i]->bias);
  //       for (int j = 0; j < hidden_neurons; j++){
  //         printf("weights[%d][%d] = %f\n", i, j, neuron_array->list_of_neurons[i]->list_of_weights[j]);
  //       }
  //       printf("\n");
  //   }
  //   if (i >= input_neurons && i < input_neurons + hidden_neurons){
  //     printf("=========Second Layer=======\n");
  //     printf("activation for neuron[%d] = %f\n", i, neuron_array->list_of_neurons[i]->activation);
  //     printf("bias for neuron[%d] = %f\n", i, neuron_array->list_of_neurons[i]->bias);
  //       for (int j = 0; j < output_neurons; j++){
  //         printf("weights[%d][%d] = %f\n", i, j, neuron_array->list_of_neurons[i]->list_of_weights[j]);
  //       }
  //       printf("\n");
  //   }
  //   if (i >= input_neurons + hidden_neurons && i < total){
  //     printf("=========Third Layer=======\n");
  //     printf("activation for neuron[%d] = %f\n", i, neuron_array->list_of_neurons[i]->activation);
  //     printf("bias for neuron[%d] = %f\n", i, neuron_array->list_of_neurons[i]->bias);
  //       for (int j = 0; j < output_neurons; j++){
  //         printf("weights[%d][%d] = %f\n", i, j, neuron_array->list_of_neurons[i]->list_of_weights[j]);
  //       }
  //       printf("\n");
  //   }
  // }

//Ouput the results
  int a = 0;
  for (int i = 0; i < total; i++){
    if (i >= input_neurons + hidden_neurons && i < total){
      printf("activation for output[%d] = %f\n", a, neuron_array->list_of_neurons[i]->activation);
      a++;
    }
  }










  return 0;
}
