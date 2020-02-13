#include <stdio.h>
#include <stdlib.h>
#include "network.h"
#include "functions.h"

// Access the neuron struct to allocate indiivudal weights and biases
Neuron*create_individual_neuron(int pos){
  Neuron*neuron = malloc(sizeof(Neuron));
  neuron->pos = pos;
  neuron->bias = gaussrand();
  neuron->weight = gaussrand();
  return neuron;
}

//ALlocate memory to hold an array of neurons structs
Neuron_Array* create_memory(const int num_neurons){
	Neuron_Array *array;
  array = (Neuron_Array*)malloc(sizeof(Neuron_Array));
	array->size = 0;
	array->list_of_neurons = malloc(sizeof(Neuron_Array*)*num_neurons);
	return array;
}

//Create the neuron array
Neuron_Array* create_neuron_array(Neuron_Array*array, int total){
  for (int i = 0; i < total; i++){
    Neuron*neuron = create_individual_neuron(i);
    add_to_neuron_array(array, neuron);
  }
  return array;
}

//Add the neurons to the array
Neuron_Array* add_to_neuron_array(Neuron_Array*array, Neuron*neuron){
	array->list_of_neurons[array->size] = neuron;
	array->size++;
	return NULL;
}

// 2D array for weights --> each having values from the struct
// 2D array for biases --> each having values from the struct
int **create_weight_matrix(int flag, int layers, int input, int hidden, int output, int*Neuron_Array){

  // int i, position = 0;
  //
  //   // Allocate weights to input layer
  //   int* input_layer;
  //   for (i = 0; i < input; i++){
  //     input_layer[i] = Neuron_Array[position]->weight;
  //     position++;
  //   }
  //
  //   //Allocate weights to hidden layer
  //   int* hidden_layer;
  //   for (i = 0; i < input; i++){
  //     hidden_layer[i] = Neuron_Array[position]->weight;
  //     position++;
  //   }
  //
  //   position++;
  //   //Allocate weights to output layer
  //   int* output_layer;
  //   for (i = 0; i < input; i++){
  //     output_layer[i] = Neuron_Array[position]->weight;
  //     position++;
  //   }
  //
  //   // Concatenate all the layers into one array
  //   int** weight_matrix = {input_layer, hidden_layer, output_layer};
  //
  //   return weight_matrix;

}
