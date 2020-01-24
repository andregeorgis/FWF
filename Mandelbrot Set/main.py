import pygame

def drawPoint(x,y,color):
    global display

    s = pygame.Surface((1,1))   # the object surface 1 x 1 pixel (a point!)

    s.fill(color)               # color as (r,g,b); e.g. (100,20,30)

# now get an object 'rectangle' from the object surface and place it at position x,y

    r,r.x,r.y = s.get_rect(),x,y

    display.blit(s,r)            # link the object rectangle to the object surface

def color(iter):
    global max_iter

    return (0, 255 * (max_iter - iter) / max_iter, 0)

data_filename = "data.txt"

pygame.init()

data = open(data_filename, 'r')
size, max_iter = [int(i) for i in data.readline().rstrip().split()]

display = pygame.display.set_mode((size, size))

crashed = False

for i in range(size):
    line = [int(i) for i in data.readline().rstrip().split()]

    for j in range(size):
        drawPoint(i, j, color(line[j]))

pygame.display.update()


while not crashed:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            crashed = True

pygame.quit()
