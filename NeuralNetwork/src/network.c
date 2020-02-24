#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include "bitmap.h"
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
Neuron*create_individual_neuron(int pos, int prev_layer){
  Neuron*neuron = malloc(sizeof(Neuron));
  for (int i = 0; i < prev_layer; i++){
    neuron->list_of_weights[i] = gaussrand();
  }
  neuron->pos = pos;
  return neuron;
}

//Create the neuron array
Neuron_Array* create_neuron_array(Neuron_Array*array, int input_neurons, int hidden_neurons, int output_neurons){

  for (int i = 0; i < input_neurons; i++){
    Neuron*neuron = create_individual_neuron(i, 0);
    neuron->bias = 0;
    add_to_neuron_array(array, neuron);
  }

  for (int i = 0; i < hidden_neurons; i++){
    Neuron*neuron = create_individual_neuron(i, input_neurons);
    neuron->bias = gaussrand();
    add_to_neuron_array(array, neuron);
  }

  for (int i = 0; i < output_neurons; i++){
    Neuron*neuron = create_individual_neuron(i, hidden_neurons);
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

//Calculate the activation of the hidden and output Layer
Neuron_Array* calculate_activation(Neuron_Array*array, int input, int hidden, int output){
  double answer = 0, count = 0;

	// Going through all the neurons of the hidden layer
  for (int i = 0; i < hidden; i++){

		// Going through all the weights of the neurons in the hidden layer
    for (int j = 0; j < input; j++){
      answer = array->list_of_neurons[input+i]->list_of_weights[j]*array->list_of_neurons[j]->activation;
      count = count + answer;
    }
    // printf("count = %f\n", count);
    // printf("bias = %f\n", array->list_of_neurons[input+i]->bias);
    array->list_of_neurons[input+i]->activation = sigmoid(count+array->list_of_neurons[input+i]->bias);
  }

	count = 0;

	// Going through all the neurons of the output layer
  for (int i = 0; i < output; i++){
		// Going through all the weights of the neurons in the output layer
    for (int j = 0; j < hidden; j++){
      answer = array->list_of_neurons[input+hidden+i]->list_of_weights[j]*array->list_of_neurons[input+j]->activation;
      count = count + answer;
			// printf("count = %f\n", count);
    }

    array->list_of_neurons[input+hidden+i]->activation = sigmoid(count+array->list_of_neurons[input+hidden+i]->bias);
  }
  // printf("%d\n", input + hidden);
  return array;
}

// Return array containing the gradient of the cost function
double*error_function(Neuron_Array*neuron_array, double*y, int input, int hidden, int output){

	// Calcualting the cost function
	double *cost;
	cost = (double*)malloc(output*sizeof(double));
	int j = 0;

	for (int i = 0; i < output; i++){
		cost[j] = neuron_array->list_of_neurons[input+hidden+i]->activation - y[j];
		// printf("cost[%d] = %f\n", i, cost[j]);
		j++;
	}

	// Calculating the sigmoid prime
	double *sigmoidprime, count = 0, answer;
	sigmoidprime = (double*)malloc(output*sizeof(double));
	// Going through all the neurons of the output layer
	for (int i = 0; i < output; i++){
		// Going through all the weights of the neurons in the output layer
		for (int j = 0; j < hidden; j++){
			answer = neuron_array->list_of_neurons[input+hidden+i]->list_of_weights[j]*neuron_array->list_of_neurons[input+j]->activation;
			count = count + answer;
			// printf("count = %f\n", count);
		}

		sigmoidprime[i] = deriv_sigmoid(count+neuron_array->list_of_neurons[input+hidden+i]->bias);
	}

	double *error = malloc(output*sizeof(double));
	for (int i = 0; i < output; i++){
		error[i] = cost[i]*sigmoidprime[i];
		// printf("sigmoidprime vector[%d] = %f\n", i, sigmoidprime[i]);
		// printf("cost function vector[%d] = %f\n", i, cost[i]);
		printf("error vector[%d] = %f\n", i, error[i]);
	}

	return error;
}

double *back_prop(){

	double *updated_weight_list = malloc(array->total_weights*sizeof(double));
	updated_weight_list = new_weight_hidden();

}

double *new_weight_hidden(Neuron_Array*array){
	// Calculating layer = 2 (hidden)
	// Using output weights  (l + 1)
	//
	double *weights;
	// w = all the weights added togetehr into one number per neuron
	for
	array->list_of_neurons[]->list_of_weights

}

// Signoid Function
double sigmoid(double x){
     double exp_value;
     double return_value;
     /*** Exponential calculation ***/
     exp_value = exp((double) -x);
     /*** Final sigmoid value ***/
     return_value = 1 / (1 + exp_value);
     return return_value;
}

double deriv_sigmoid(double x){
	double ans;
	ans = sigmoid(x)*(1-sigmoid(x));
	return ans;
}
