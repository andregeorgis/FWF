CC=gcc
CFLAGS=-g -std=c11 -Iinclude -Wall
LIBS=-lm
TARGET=main

SRC_DIR = src
OBJ_DIR = obj
INC_DIR = include
_DEPS = network.h functions.h
_OBJS = main.o network.o functions.o

DEPS = $(patsubst %,$(INC_DIR)/%,$(_DEPS))
OBJS = $(patsubst %,$(OBJ_DIR)/%,$(_OBJS))

$(OBJ_DIR)/%.o: $(SRC_DIR)/%.c $(DEPS)
	$(CC) -c -o $@ $< $(CFLAGS)

$(TARGET): $(OBJS)
	$(CC) -o $@ $(OBJS) $(LIBS)

.PHONY: clean
clean:
	$(RM) $(OBJS) $(TARGET)
