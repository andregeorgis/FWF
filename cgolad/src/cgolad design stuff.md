# cgolad design stuff


We are using a Model-View-Controller pattern.
- View is the pure visual frontend in ```templates/gameview.html```
- Model is where the data from the View is stored in ```static/grid.js``` and ```static/cell.js```
- Controller moderates the data flow between View and Model in ```static/basicgame.js```


We are using JavaScript's module importing for modularity, but you have to run a HTTP server
to test it otherwise there will be a CORS violation. Run the python file ```server.py``` and
go to ```localhost:6574``` to test it locally (I changed to new port for security reasons).
If you want to test it on another computer that isn't running the server,
you need to connect by the url ```<server ip address>:80/```.
I put port 80 because you need to change your firewall to allow ports or
alternatively ubuntu auto allows port 80
BE CAREFUL ABOUT SECURITY


The frontend cell is a HTML ```div``` element with a common class ```cell``` and unique id ```row,col```
corresponding to the cells row and column.
The backend cell is a ```class Cell``` which contains
- reference to a unique frontend element in each ```Cell``` instance
- active status (```true``` if alive, ```false``` is dead)
- the player the cell belongs to (```-1``` if dead)


### Multiplayer design ideas

Initial link loads page with blank game
Players select the cells and click end turn
Grid data is packaged and sent to http server
Data is combined and resent back to clients
webpage is updated
