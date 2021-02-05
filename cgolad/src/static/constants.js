// GameState Constants
export var PLAYER_ONE = 0;
export var PLAYER_TWO = 1;
export var STAGE_ONE = 1;
export var STAGE_TWO = 2;

// Grid Constants
export var GRID_LENGTH = 10;

// Colour Constants
export var PLAYER_COLOURS = ["#E71D36", "#2EC4B6"];
export var BLANK_COLOUR = "white";

// Rule Constants
export var MOVE_CAP = [2, 2, 2, 2, 1, 1];
export var GENERATION_CAP = 3;

// Game States
export var PLAYER_ONE_FIRST = 0;
export var PLAYER_TWO_FIRST = 1;
export var PLAYER_ONE_SECOND = 2;
export var PLAYER_TWO_SECOND = 3;
export var PLAYER_ONE_THIRD = 4;
export var PLAYER_TWO_THIRD = 5;
export var WAIT_STATE = 6;
export var NEXT_STATE = [1, 2, 3, 4, 5, 6, 0];
export var STATE_MESSAGE = ["Move Stage: Player One Phase One",
                            "Move Stage: Player Two Phase One",
                            "Move Stage: Player One Phase Two",
                            "Move Stage: Player Two Phase Two",
                            "Move Stage: Player One Phase Three",
                            "Move Stage: Player Two Phase Three",
                            "Wait Stage"]

// End States
export var NO_WINNER = 0;
export var PLAYER_ONE_WINS = 1;
export var PLAYER_TWO_WINS = 2;
export var DRAW = 3;
export var END_MESSAGE = ["", "Player One Wins!", "Player Two Wins!", "Draw!"];
