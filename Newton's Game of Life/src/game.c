#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include "matrix.h"
// Generate the matrix of cells - start small for testing then go big
// You can change function signature (i.e. the int**) if you think its better
// Matrix should have either a 1 (alive cell) or 0 (dead cell)
// Maybe later we can use structs for cells/matrix
int** setup(int size) {

  int** array = NULL;
  int i, j;

  array = (int**)malloc(size*sizeof(int*));
  for (i = 0; i < size; i++){
    (array)[i] = (int*)malloc(size*sizeof(int));
  }

  for (i = 0; i < size; i++){
    for (j = 0; j < size; j++){
      array[i][j] = 0;
    }
  }

  return array;
}

// Display something like "O" for alive cell and " " for dead cell
void display(int** array, int size) {

  for (int i = 0; i < size; i++){
    for (int j = 0; j < size; j++){
      printf("%d ", array[i][j]);
    }
    printf("\n");
  }
}

// Determine the next generation of cells
// Assume cells outside border of matrix are dead
int** new_state(int** initial_state, int length) {

  int ** newmatrix = NULL;
  newmatrix = setup(length);

}


// Implement the logic
int main() {

  int length = 3;
  int i, j;

  // Setting up the first generation//
  int **oldmatrix = NULL;
  oldmatrix = setup(length);

  for (i = 0; i < length; i++){
    for (j = 0; j < length; j++){
      oldmatrix[i][j] = (rand() % 2);
    }
  }

  display(oldmatrix, length);
  printf("\n");

}
