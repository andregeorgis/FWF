#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include "functions.h"
#define NSUM 25
#define RANDMAX 32767
#define PI 3.141592654

double gaussrand() {
  static double U, V;
	static int phase = 0;
	double Z;

	if(phase == 0) {
		U = (rand() + 1.) / (RAND_MAX + 2.);
		V = rand() / (RAND_MAX + 1.);
		Z = sqrt(-2 * log(U)) * sin(2 * PI * V);
	} else
		Z = sqrt(-2 * log(U)) * cos(2 * PI * V);

	phase = 1 - phase;

	return Z;
}
