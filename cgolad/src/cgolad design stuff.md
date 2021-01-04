# cgolad design stuff


We are using a Model-View-Controller pattern.
- View is the pure visual frontend in ```templates/gameview.html```
- Model is where the data from the View is stored in ```static/grid.js``` and ```static/cell.js```
- Controller moderates the data flow between View and Model in ```static/basicgame.js```

We are using JavaScript's module importing for modularity, but you have to run a HTTP server
to test it otherwise there will be a CORS violation. Run the python file ```server.py``` and
go to ```localhost:5000``` to test.


The frontend cell is a HTML ```div``` element with a common class ```cell``` and unique id ```row,col```
corresponding to the cells row and column.
The backend cell is a ```class Cell``` which contains
- reference to a unique frontend element in each ```Cell``` instance
- active status (```true``` if alive, ```false``` is dead)
- the player the cell belongs to (```-1``` if dead)
