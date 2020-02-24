// Struct for each neuron
typedef struct Neuron{
  int pos;
  double activation;
  double list_of_weights[1000];
  double bias;
} Neuron;

//An array containing a list of structs
struct Neuron_Array{
    int size;
    int total_weights;
    Neuron** list_of_neurons;
} typedef Neuron_Array;

// Initialising the array of neurons
Neuron*create_individual_neuron(int pos, int prev_layer);
Neuron_Array*create_memory(const int num_neurons);
Neuron_Array* create_neuron_array(Neuron_Array*array, int input_neurons, int hidden_neurons, int output_neurons);
Neuron_Array* add_to_neuron_array(Neuron_Array*array, Neuron*neuron);
Neuron_Array* calculate_activation(Neuron_Array*array, int input, int hidden, int output);
double*error_function(Neuron_Array*neuron_array, double*y, int input, int hidden, int output);
double sigmoid(double x);
double deriv_sigmoid(double x);
