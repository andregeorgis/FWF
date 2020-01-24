#include <stdio.h>

typedef struct complex {
  double real;
  double imaginary;
} complex;

double max_length = 50000000;
int max_iterations = 20;
int size = 401; // of grid
double scale_real = 0.05;
double scale_imaginary = 0.05;
char* data_filename = "data.txt";

int main(int argc, char *argv[]) {
  FILE* data = fopen(data_filename, "w");

  if (data == NULL) {
    printf("Error\n");
    return 1;
  }

  fprintf(data, "%d %d\n", size, max_iterations);

  complex grid[size][size];

  for (int i = 0; i < size; i++) {
    for (int j = 0; j < size; j++) {
      complex c;
      c.real = (i - ((size - 1) / 2)) * scale_real;
      c.imaginary = (j - ((size - 1) / 2)) * scale_imaginary;
      grid[i][j].real = 0;
      grid[i][j].imaginary = 0;
      int iteration;

      for (iteration = 0; iteration < max_iterations; iteration++) {
        grid[i][j].real = grid[i][j].real * grid[i][j].real - (grid[i][j].imaginary * grid[i][j].imaginary) + c.real;
        grid[i][j].imaginary = 2 * grid[i][j].real * grid[i][j].imaginary + c.imaginary;

        if (grid[i][j].real * grid[i][j].real + grid[i][j].imaginary * grid[i][j].imaginary > max_length * max_length) {
          break;
        }
      }

      fprintf(data, "%d ", iteration);
    }
    fprintf(data, "\n");
  }

  fclose(data);
  return 0;
}
