var WIDTH = 1000,
    HEIGHT = 1000,
    TILE_SIZE = 20;

class Maze {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.tiles = [];
    for (var i = 0; i < rows * cols; i++) {
      this.tiles.push(0);
    }
  }

  getTile(x, y) {
    return this.tiles[this._getPosition(x, y)];
  }

  setAccess(x, y) {
    this.tiles[this._getPosition(x, y)] = 1;
  }

  isAccess(x, y) {
    return this.getTile(x, y) == 1;
  }

  _getPosition(x, y) {
    return x * this.cols + y;
  }
}

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

var maze = new Maze(WIDTH / TILE_SIZE, HEIGHT / TILE_SIZE);

var moves = [];

initSize();
searsh({x: 0, y: 0});

function initSize() {
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
}

function draw() {
  context.fillStyle = 'rgba(255,255,255,0.8)';
  for (var i = 0; i < WIDTH / TILE_SIZE; i++) {
    for (var j = 0; j < HEIGHT / TILE_SIZE; j++) {
      if (maze.isAccess(i, j)) {
        context.fillRect(TILE_SIZE * i, TILE_SIZE * j,
          TILE_SIZE, TILE_SIZE);
      }
    }
  }
}

function searsh(start) {
  var x = start.x, y = start.y;
  dirs = '';
  if ((y - 2 >= 0) && (maze.getTile(x, y - 2) == 0))  dirs += 'N';
  if ((x - 2 >= 0) && (maze.getTile(x - 2, y) == 0))  dirs += 'W';
  if ((y + 2 < maze.rows) && (maze.getTile(x, y + 2) == 0))  dirs += 'S';
  if ((x + 2 < maze.cols) && (maze.getTile(x + 2, y) == 0))  dirs += 'E';

  if (dirs == '') {
    if (moves.length > 0) {
      searsh(moves.pop());
    } else {
      draw();
    }
  } else {
    var dir = dirs.substr(Math.floor(Math.random() * dirs.length), 1);

    switch (dir) {
      case 'N':
        maze.setAccess(x, y - 1);
        y = y - 2;
        break;
      case 'W':
        maze.setAccess(x - 1, y);
        x = x - 2;
        break;
      case 'S':
        maze.setAccess(x, y + 1);
        y = y + 2;
        break;
      case 'E':
        maze.setAccess(x + 1, y);
        x = x + 2;
        break;
      default:
    }

    maze.setAccess(x, y);
    moves.push({x: x, y: y});
    searsh({x: x, y: y});
  }
}
