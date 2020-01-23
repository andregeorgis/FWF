#include <stdio.h>

typedef struct complex {
  double real;
  double imaginary;
} complex;

double max_length = 50;
int max_iterations = 9;
int intervals = 10;
int size = 51; // of grid
double scale_real = 0.8;
double scale_imaginary = 0.5;

int main() {
  complex grid[size][size];
  int colour_grid[size][size];

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

      colour_grid[i][j] = iteration; // < max_iterations ? intervals * iteration / max_iterations : intervals - 1;

      if (i == (size - 1) / 2 && j == (size - 1) / 2) {
        printf("C");
      } else {
        printf("%d", colour_grid[i][j]);
      }
    }
    printf("\n");
  }
}
