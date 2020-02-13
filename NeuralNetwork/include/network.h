// Struct for each neuron
typedef struct Neuron{
  int pos;
  float bias;
  float weight;
  float final;
} Neuron;

//An array containing a list of structs
struct Neuron_Array{
    int size;
    Neuron** list_of_neurons;
} typedef Neuron_Array;

// Initialising the array of neurons
Neuron*create_individual_neuron(int pos);
Neuron_Array*create_memory(const int num_neurons);
Neuron_Array* add_to_neuron_array(Neuron_Array*array, Neuron*neuron);
Neuron_Array* create_neuron_array(Neuron_Array*array, int total);


// Accessing each neuron in the array
int*create_matrix(int layers, int input, int hidden, int output);
int **create_weight_matrix(int flag, int layers, int input, int hidden, int output, int*Neuron_Array);
