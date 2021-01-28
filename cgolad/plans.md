# Plans for Conway's Game of Life and Death

The premise of the game is to introduce a multiplayer aspect to the classic game theory programming task, Conway's Game of Life. Hopefully this project ends up expanding into much more than a multiplayer adaptation to the classic paradigm, but also an opportunity to explore other fields such as AI and Machine Learning.



## Stage 1 - Building a workable, local prototype

This stage is by far the easiest and most manageable with only a few requirements:

- Website Overhead
  - The html page includes a fixed size grid of cells **(make this bigger)**
  - There is an option to click on the grid to "activate" or "deactivate" the cell - indicated by colour :white_check_mark:
  - There is an option to "switch players" by clicking a button :white_check_mark:
  - There is an option to simulate a generation by clicking a button :white_check_mark:
- Cells
  - If deactivated the cell is blank :white_check_mark:
  - If hovered over while deactivated, the cell becomes slightly shaded :white_check_mark:
  - If clicked while deactivated, it becomes activated - demonstrated by a change in colour :white_check_mark:
  - Clicking a cell with each player spawns a different colour :white_check_mark:
  - If clicked while activated, it becomes deactivated - demonstrated by becoming blank :white_check_mark:
  - If activated by one player, the other player can neither activate or deactivate it :white_check_mark:
- Conway's Game of Life and Death Rules
  - Each activated cell with one or no activated neighbours, deactivates - regardless of colour of neighbours :white_check_mark:
  - Each activated cell with four or more activated neighbours, deactivates - regardless of colour of neighbours :white_check_mark:
  - Each activated cell with two or three activated neighbours, stays active - regardless of colour of neighbours :white_check_mark:
  - Each deactivated cell with three activated neighbours, becomes active - becomes the "predominant" colour :white_check_mark:
    - In all cases there has to be at least 2 cells of the same colour - this will be the colour of the newly activated cell



# Stage 2 - Introducing Game Design and Rule Design

- Rule Design
  - We split the game into rounds that have two different stages, a Move Stage and a Wait Stage
  - In the Move Stage players are allowed to click on the cell grid to "make moves" by activating or deactivating cells
  - In the Wait Stage players wait for a fixed number of generations to occur
  - The game is over when there is one player with at least one activated cell, and the other player with no activated cells
  - In the case that both players "die" in the same generation, the game is declared a draw
- Move Stage
  - The first move stage will allow each player to activate 5<sup>YEET</sup> cells
  - In every successive move stage, each player is allowed to either activate or deactivate 3<sup>YEET</sup> cells
- Wait Stage
  - Each wait stage will simulate 3<sup>YEET</sup> generations



- Game Design
  - The grid will be a 20 by 20<sup>YEET</sup> grid centred in the page



<sup>YEET</sup>Anything with this footnote is just an initial placeholder, and will be revised later for game balancing



# Stage 3 - Adding Unnecessary Functionality

1. Enter a menu before starting the game
2. Toggles on the side





# Stage 4 - Adding Custom Modes

- fuck wit rules and shit
- Maybe add something were you can "convert" or "infect" a cell? :P
