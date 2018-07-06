//In this chess engine, the user always plays black

//Variables for the board
var engine;
var board;
var config;
var totalmoves;
var treedepth;

//Variable to keep track of 1 or 2 players
var noplayers;

//Variables for values based on positions
var pawnvalue = [
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
        [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
        [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
        [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
        [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
        [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
];

var knightvalue =
    [
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
        [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
        [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
        [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
        [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
        [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
        [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
];

var bishopvalue = [
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
    [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
    [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
    [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
    [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
];

var rookvalue = [
    [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
];

var queenvalue =
    [
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];

var kingvalue = [

    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
    [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
];

//A function to setup the chessboard
function setup()
{
  totalmoves = 0;
  outoftime = false;
  treedepth = 4;
  engine = new Chess();

  //Adding event listener
  document.addEventListener("mousedown", mouseclick);

  //Configuration of the chess board
  config = {
    position : 'start',
    draggable: true,
    onDrop: drop,
    showNotation: false,
    moveSpeed: 'slow',
    snapbackSpeed: 500,
    snapSpeed: 100
  }

  //Calling the menu
  menu();
}

//Function to be called when user places the piece anywhere
function drop(source, target, piece, orientation)
{
  var move = {
    from: source,
    to: target,
    promotion: 'q'
  }

  //Check if the move is legal
  var legal = engine.move(move);
  var moved = document.getElementById('move');
  var player = document.getElementById('player');

  //If our move is illegal
  if(legal === null)
  {
    moved.innerHTML = 'Illegal move';
    return 'snapback';
  }

  //If our move is legal
  else
  {
    //For 1 player
    if(noplayers === 1)
    {
      //If we play for white which is the pc
      if(legal.color === 'w')
      {
        moved.innerHTML = "It is black's turn to play";
        engine.undo();
        return 'snapback';
      }
      else
      {
        moved.innerHTML = 'From: ' + move.from + ', To: ' + move.to;
        player.innerHTML = "White to play";
        setTimeout(play, 200);
      }
    }

    //For 2 players
    if(noplayers === 2)
    {
      //If it's white's turn to play
      if(legal.color === 'w')
      {
        moved.innerHTML = 'From: ' + move.from + ', To: ' + move.to;
        player.innerHTML = "Black to play";
      }

      //If it's black's turn to play
      else
      {
        moved.innerHTML = 'From: ' + move.from + ', To: ' + move.to;
        player.innerHTML = "White to play";
      }
    }
  }
}

//Function to evaluate the chessboard
function evaluate1()
{
  var score = 0;
  for(var i = 1; i <= 8; ++i)
  {
    for(var j = 97; j <= 104; ++j)
    {
      var file = String.fromCharCode(j);
      score  += getValue(i - 1, j - 97, file + i);
    }
  }
  return score;
}

//Function to get value of the piece
function getValue(x, y, pos)
{
  //Variable to keep track of white or black
  var side = 1;
  var piece = engine.get(pos);

  if(piece !== null)
  {
    if(piece.color === "b")
    {
      side *= -1;
    }

    //Position-wise evaluation
    var posvalue= 0;
    switch(piece.type)
    {
      case 'p':
      if(side === 1)
      {
        posvalue= pawnvalue[x][y];
      }
      else
      {
        posvalue = pawnvalue[7 - x][y];
      }
      break;
      case 'k':
      if(side === 1)
      {
        posvalue= kingvalue[x][y];
      }
      else
      {
        posvalue = kingvalue[7 - x][y];
      }
      break;
      case 'b':
      if(side === 1)
      {
        posvalue= bishopvalue[x][y];
      }
      else
      {
        posvalue = bishopvalue[7 - x][y];
      }
      break;
      case 'n':
      if(side === 1)
      {
        posvalue= knightvalue[x][y];
      }
      else
      {
        posvalue = knightvalue[7 - x][y];
      }
      break;
      case 'r':
      if(side === 1)
      {
        posvalue= rookvalue[x][y];
      }
      else
      {
        posvalue = rookvalue[7 - x][y];
      }
      break;
      case 'q':
      if(side === 1)
      {
        posvalue= queenvalue[x][y];
      }
      else
      {
        posvalue = queenvalue[7 - x][y];
      }
      break;
    }

    //Assigning score based on type of piece it is
    switch(piece.type)
    {
      case 'p':
      return ((10 + posvalue) * side);
      case 'b':
      case 'n':
      return ((30 + posvalue) * side);
      case 'r':
      return ((50 + posvalue) * side);
      case 'q':
      return ((90 + posvalue) * side);
      case 'k':
      return ((900 + posvalue) * side);
    }
  }
  return 0;
}

//Function to make computers play
function play()
{
  if(!engine.game_over() && engine.turn() === 'w')
  {
    //Timelag
    var moves = engine.moves();
    totalmoves = 0;
    totalmovesk = 0;

    //Finding best move
    var bestmove;
    var temp = findbest(treedepth , true, -100000, 100000);

    var move = document.getElementById('move');
    var player = document.getElementById('player');
    move.innerHTML = temp.move;
    player.innerHTML = "Black to play";


    bestmove = temp;

    //Doing the best move
    engine.move(bestmove.move);
    config.position = getfen(engine.fen());
    board = ChessBoard('board', config);

  }
  else if(engine.game_over() === true)
  {
    console.log('Game Over');
  }
}

//Function to get fen
function getfen(word)
{
  var i = 0;
  while(word[i] !== ' ')
  {
     ++i;
  }
  word = word.slice(0, i);
  return word;
}

//Function to find the best move by implementing minmax
//Returns an object with the best move and best score
function findbest(depth, Maxplayer, alpha, beta)
{
  //Evaluating condition
  if(depth === 0)
  {
    ++totalmoves;
    var obj1 = {
      move: null,
      score: evaluate1(),
      maxi: alpha,
      mini: beta
    }
    return obj1;
  }

  else
  {
    //If it's the maximizer's turn
    if(Maxplayer === true)
    {
      var best = -100000;
      var bestindex = -1;
      var moves = engine.moves();

      //Ordering moves by killer heuristic
      moves = ordermoves(moves);

      for(var i = 0; i < moves.length; ++i)
      {
        //Doing each move
        engine.move(moves[i]);

        //Finding score
        score = findbest(depth - 1, false, alpha, beta);

        //Undoing the move
        engine.undo();


        //Finding best score for maximiser
        if(score.score > best)
        {
          best = score.score;
          bestindex = i;
        }

        alpha = Math.max(best, alpha);

        //Checking if any branches can be pruned
        if(beta <= alpha)
        {
          return {
            move: moves[bestindex],
            score: best,
            maxi: alpha,
            mini: beta
          };
        }
      }

      var bestmove =
      {
        move: moves[bestindex],
        score: best,
        maxi: alpha,
        mini: beta
      };
      return bestmove;
    }

    //If it's the minimiser's turn
    else
    {
      var worst = 100000;
      var worstindex = -1;
      var moves = engine.moves();

      //Ordering moves by killer heuristic
      moves = ordermoves(moves);

      for(var i = 0; i < moves.length; ++i)
      {
        //Doing each move
        engine.move(moves[i]);

        //Finding score
        var score = findbest(depth - 1, true, alpha, beta);

        //Undoing move
        engine.undo();

        //Finding worst score for minimiser
        if(score.score < worst)
        {
          worst = score.score;
          worstindex = i;
        }

        beta = Math.min(worst, beta);

        //Checking if any branches can be pruned
        if(beta <= alpha)
        {
          var obj = {
            move: moves[worstindex],
            score: worst,
            maxi: alpha,
            mini: beta
          };
          return obj;
        }
      }
      var worstmove =
      {
        move: moves[worstindex],
        score: worst,
        maxi: alpha,
        mini: beta
      };
      return worstmove;
    }
  }
}

//Function to order moves based on killer heuristic
function ordermoves(moves)
{
  var killermoves = 0;
  for(var i = 0; i < moves.length; ++i)
  {
    //If a killer move is found
    if(moves[i].search('x') !== -1)
    {
      var temp = moves[killermoves];
      moves[killermoves] = moves[i];
      moves[i] = temp;
      ++killermoves;
    }
  }
  return moves;
}

//Function to construct a menu
function menu()
{
  let canvas = document.querySelector('canvas');
  canvas.height = 725;
  canvas.width = 1520;
  var c = canvas.getContext('2d');
  let image = new Image();
  image.src = 'background.png';

  image.onload = function()
  {
    c.drawImage(image, 0, 0);

    //Title
    c.fillStyle = 'rgba(0, 0, 255)';
    c.fillRect(510,85, 560, 130);
    c.fillStyle = 'rgba(255, 255, 255, 0.75)';
    c.fillRect(540, 100, 500, 100);
    c.font = "60px Georgia";
    c.fillStyle = 'rgb(255, 0, 120)';
    c.fillText('Chess Champions', 560, 160);

    //Single Player
    //Outer Rectangle
    c.fillStyle = 'rgba(0, 0, 255)';
    c.fillRect(630, 240, 240, 70);
    //Inner Rectangle
    c.fillStyle = 'rgba(255, 255, 255, 0.75)';
    c.fillRect(650, 250, 200, 50);
    c.font = "35px Georgia";
    //Text
    c.fillStyle = 'rgb(255, 0, 120)';
    c.fillText('Single Player', 650, 280);

    //Two Player
    //Outer Rectangle
    c.fillStyle = 'rgba(0, 0, 255)';
    c.fillRect(630, 340, 240, 70);
    //Inner Rectangle
    c.fillStyle = 'rgba(255, 255, 255, 0.75)';
    c.fillRect(650, 350, 200, 50);
    c.font = "38px Georgia";
    //Text
    c.fillStyle = 'rgb(255, 0, 120)';
    c.fillText('Two Player', 650, 380);

  }
}

//Function to call when mouse is click
function mouseclick(event)
{
  //Single player
  if( (event.x > 650 && event.x < 850) && (event.y > 250 && event.y < 300) )
  {
    //Removing the canvas
    var canvas = document.querySelector('canvas');
    var body = document.querySelector('body');
    body.removeChild(canvas);

    //Drawing the board
    board  = new ChessBoard('board', config);

    //Setting no players
    noplayers = 1;

    //Starting the game
    setTimeout(play, 20);
  }

  //For 2 players
  else if((event.x > 650 && event.x < 850) && (event.y > 350 && event.y < 400))
  {
    //Removing the canvas
    var canvas = document.querySelector('canvas');
    var body = document.querySelector('body');
    body.removeChild(canvas);

    //Setting number of players
    noplayers = 2;

    //Drawing the board
    board  = new ChessBoard('board', config);
  }
}

//Function to restart the game
function restart()
{
  //Resetting the rendering
  config.position = 'start';

  //Resetting the board
  board = new ChessBoard('board', config);

  //Resetting the engine
  engine.reset();

  //For single player
  if(noplayers === 1)
  {
    play();
  }
}

//Function to undo
function undo()
{

  //For two players
  if(noplayers === 2)
  {
    //Undoing the move in the engine
    engine.undo();

    var fen = engine.fen();
    fen = getfen(fen);

    config.position = fen;

    board = ChessBoard('board', config);
  }

  //For single player
  else if(noplayers === 1)
  {
    //Undoing the last 2 moves in the engine
    engine.undo();
    engine.undo();

    var fen = engine.fen();
    fen = getfen(fen);

    config.position = fen;

    board = ChessBoard('board', config);
  }
}

//Function to give a hint
function hint()
{
  //For single player
  if(noplayers === 1)
  {
    //If it's black's turn to play
    if(engine.turn() === 'b')
    {
    }
  }
}
