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

  int **newmatrix = NULL;
  newmatrix = setup(length);

  int count = 0;
  int i, j;

  for (i = 0; i < length; i++){
    for (j = 0; j < length; j++){

      // Check for neighbourss//
      if (i == 0 || i == length - 1 || j == 0 || j == length - 1){

        newmatrix[i][j] = initial_state[i][j];

      } else {

            count = 0;
            count += initial_state[i][j+1];
            count += initial_state[i][j-1];
            count += initial_state[i+1][j];
            count += initial_state[i+1][j+1];
            count += initial_state[i+1][j-1];
            count += initial_state[i-1][j];
            count += initial_state[i-1][j+1];
            count += initial_state[i-1][j-1];

            //Births: Each dead cell adjacent to exactly three live neighbors
            //will become live in the next generation.
            if (count == 3){
              newmatrix[i][j] = 1;
            }

            //Death by isolation: Each live cell with one or fewer live
            //neighbors will die in the next generation.
            if (count < 2){
              newmatrix[i][j] = 0;
            }

            //Death by overcrowding: Each live cell with four or more live
            //neighbors will die in the next generation.
            if (count > 3){
              newmatrix[i][j] = 0;
            }

            //Survival: Each live cell with either two or three live neighbors
            // will remain alive for the next generation.
            if (count > 1 && count < 4){
              newmatrix[i][j] = 1;
            }
      }
    }
  }

  return newmatrix;
}


// Implement the logic
int main() {

  int length = 10;
  int i, j;

  // Setting up the first generation//
  int **oldmatrix = NULL;
  oldmatrix = setup(length);

  for (i = 1; i < length - 1; i++){
    for (j = 1; j < length - 1; j++){
      oldmatrix[i][j] = (rand() % 2);
    }
  }

  display(oldmatrix, length);

  printf("\n");

  // Setting up next generation//
  char userinput[100];

  while((fgets(userinput, sizeof userinput, stdin) != NULL) && (userinput[0] != '\n') && userinput[0] == 'c'){
    int** newmatrix = new_state(oldmatrix, length);
    display(newmatrix, length);
    oldmatrix = newmatrix;
  }
}
