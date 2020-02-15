#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <time.h>
#include "network.h"
#include "functions.h"

//ALlocate memory to hold an array of neurons structs
Neuron_Array* create_memory(const int num_neurons){
	Neuron_Array *array;
  array = (Neuron_Array*)malloc(sizeof(Neuron_Array));
	array->size = 0;
	array->list_of_neurons = malloc(sizeof(Neuron_Array*)*num_neurons);
	return array;
}

// Access the neuron struct to allocate indiivudal weights and biases
Neuron*create_individual_neuron(int pos, int next_layer){
  Neuron*neuron = malloc(sizeof(Neuron));
  for (int i = 0; i < next_layer; i++){
    neuron->list_of_weights[i] = gaussrand();
  }
  neuron->pos = pos;
  return neuron;
}

//Create the neuron array
Neuron_Array* create_neuron_array(Neuron_Array*array, int input_neurons, int hidden_neurons, int output_neurons){

  for (int i = 0; i < input_neurons; i++){
    Neuron*neuron = create_individual_neuron(i, hidden_neurons);
    neuron->bias = 0;
    add_to_neuron_array(array, neuron);
  }

  for (int i = 0; i < hidden_neurons; i++){
    Neuron*neuron = create_individual_neuron(i, output_neurons);
    neuron->bias = gaussrand();
    add_to_neuron_array(array, neuron);
  }

  for (int i = 0; i < output_neurons; i++){
    Neuron*neuron = create_individual_neuron(i, output_neurons);
    neuron->bias = gaussrand();
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

//Calculate the activation of the hidden  and output Layer




// Signoid Function
double sigmoid(float x){
     double exp_value;
     double return_value;
     /*** Exponential calculation ***/
     exp_value = exp((double) -x);
     /*** Final sigmoid value ***/
     return_value = 1 / (1 + exp_value);
     return return_value;
}
