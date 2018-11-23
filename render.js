//In this chess engine, the user always plays black

//Variables for the board
var engine;
var board;
var config;
var totalmoves;
var treedepth;
var movessearched;
var dialog;

//Variable to know if the user is in the menu
var inmenu = true;

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
  movessearched = 1;
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

  //Removing the dialog box
  var body = document.querySelector('body');
  dialog = document.getElementById('dialog');
  body.removeChild(dialog);

  //Calling the menu
  menu();
}

//Function to be called when user places the piece anywhere
function drop(source, target, piece, orientation)
{
  //Getting all HTML tags as DOM elements
  var moved = document.getElementById('move');
  var player = document.getElementById('player');

  //Creating the move object
  var move = 
  {
    from: source,
    to: target,
    promotion: 'q'
  }

  //Check if the move is legal
  var legal = engine.move(move);

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
        //Writing last move
        moved.innerHTML = 'From: ' + move.from + ', To: ' + move.to;
        player.innerHTML = "White to play";

        //Checking if in check
        if(engine.in_check())
        {
          player.innerHTML = 'In check';
        }

        setTimeout(play, 200);
      }

    }

    //For 2 players
    else if(noplayers === 2)
    {
      //If it's white's turn to play
      if(legal.color === 'w')
      {
        moved.innerHTML = 'From: ' + move.from + ', To: ' + move.to;
        player.innerHTML = "Black to play";

        //Checking if in checkmate
        if(engine.in_checkmate())
        {
          player.innerHTML = 'Checkmate';
        }

        //Checking if in stalemate
        else if(engine.in_draw())
        {
          player.innerHTML = 'In draw';
        }

        //Checks if in 3 fold repetetion
        else if(engine.in_threefold_repetition())
        {
          player.innerHTML = 'In 3 fold repetition';
        }

        //Checking if in check
        else if(engine.in_check())
        {
          player.innerHTML = 'Check!';
        }
      }

      //If it's black's turn to play
      else
      {
        moved.innerHTML = 'From: ' + move.from + ', To: ' + move.to;
        player.innerHTML = "White to play";

       
        //Checking if in checkmate
        if(engine.in_checkmate())
        {
          player.innerHTML = 'Checkmate!';
        }

        //Checking if in stalemate
        else if(engine.in_draw())
        {
          player.innerHTML = 'In draw';
        }

        //Checks if in 3 fold repetetion
        else if(engine.in_threefold_repetition())
        {
          player.innerHTML = 'In 3 fold repetition';
        }

        //Checking if in check
        else if(engine.in_check())
        {
          player.innerHTML = 'In check';
        }
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
  if(!engine.in_checkmate() && engine.turn() === 'w')
  {
    //Getting all HTML elements using DOMs
    var move     = document.getElementById('move');
    var searched = document.getElementById('movessearched');
    var player   = document.getElementById('player');
    
    //Variables to keep track of number of moves searched
    totalmoves = 0;
    totalmovesk = 0;
    movessearched = 1;

    //Finding all possible moves
    var moves = engine.moves();
    
    //Finding best move
    var bestmove;
    var temp = findbest(treedepth , true, -100000, 100000);
    bestmove = temp;

    //Displaying number of moves searched
    searched.innerHTML = movessearched;
    
    //Displaing the move 
    move.innerHTML = temp.move;

    //Displaying player turn
    player.innerHTML = "Black to play";

    //Checking if in checkmate
    if(engine.in_checkmate())
    {
      player.innerHTML = 'Checkmate';
    }

    //Checking if in stalemate
    else if(engine.in_draw())
    {
      player.innerHTML = 'Stalemate';
    }

    //Checks if in 3 fold repetetion
    else if(engine.in_threefold_repetition())
    {
      player.innerHTML = 'Stalemate due to 3 fold repetition';
    }

    //Checking if in check
    else if(engine.in_check())
    {
      player.innerHTML = 'In check';
    }

    //Updating the engine
    engine.move(bestmove.move);

    //Checking if the player can do anymore moves or has he lost
    let player_moves = engine.moves();
    let player_lose  = true;
    for(let i = 0; i < player_moves.length; ++i)
    {
      if(engine.move(player_moves[i]))
      {
        //Un-doing the move
        engine.undo();
        player_lose = false;
        break;
      }
    }

    //If he can't do anymoves, then evaluating his position
    if(player_lose === true)
    {
      //If he is checkmated
      if(engine.in_checkmate())
      {
        player.innerHTML = 'You lose bruh!! Get wrecked!!';
      }
      //If player has drawn
      else if(engine.in_draw())
      {
        player.innerHTML = "It's a draw but I'll get you next time bugger";
      }
      else if(engine.in_threefold_repetition())
      {
        player.innerHTML = "You're scared of me, aren't you! It's a draw this time but I'll get you in the next one";
      }
    }

    //Updating the rendering of the board
    config.position = getfen(engine.fen());
    board = ChessBoard('board', config);
  }

  else if(engine.in_checkmate() === true)
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

      //Evaluating moves searched approximately
      if(totalmoves === 0)
      {
        movessearched *= moves.length;
      }

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

      //Evaluating moves searched approximately
      if(totalmoves === 0)
      {
        movessearched *= moves.length;
      }

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
    c.fillStyle = 'rgba(0, 0, 255, 0.1)';
    c.fillRect(200, 85, 560, 130);
    //Text
    c.font = "60px Georgia";
    c.fillStyle = 'rgb(255, 0, 120)';
    c.fillText('Chess Champions', 230, 160);

    //Single Player
    //Outer Rectangle
    c.fillStyle = 'rgba(0, 0, 255, 0.1)';
    c.strokeRect(230, 280, 240, 70);
    //Text
    c.font = "35px Georgia";
    c.fillStyle = 'rgb(255, 0, 120)';
    c.fillText('Single Player', 250 , 330);

    //Two Player
    c.fillStyle = 'rgba(0, 0, 255, 0.1)';
    c.strokeRect(230, 380, 240, 70);

    //Text
    c.font = "35px Georgia";
    c.fillStyle = 'rgb(255, 0, 120)';
    c.fillText('Two Player', 250, 430);
  }
}

//Function to call when mouse is click
function mouseclick(event)
{
  //Single player
  if( (event.x > 230 && event.x < 470) && (event.y > 280 && event.y < 350) && (inmenu === true))
  {
    //Setting inmenu to false
    inmenu = false;

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

    //Adding the dialog box
    var body = document.querySelector('body');
    body.appendChild(dialog);
  }

  //For 2 players
  else if((event.x > 230 && event.x < 470) && (event.y > 380 && event.y < 450) && (inmenu === true))
  {
    //Setting inmenu to false
    inmenu = false;

    //Removing the canvas
    var canvas = document.querySelector('canvas');
    var body = document.querySelector('body');
    body.removeChild(canvas);

    //Setting number of players
    noplayers = 2;

    //Drawing the board
    board  = new ChessBoard('board', config);

    //Adding the dialog box
    var body = document.querySelector('body');
    body.appendChild(dialog);
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
      var hint = findbest(2 , false, -100000, 100000);
      var hintdata = document.getElementById('hint');
      hintdata.innerHTML = hint.move;
    }
  }

  //For double player
  else if(noplayers === 2)
  {
    if(engine.turn() === 'b')
    {
      //If it's black's turn to play
      var hint = findbest(2 , false, -100000, 100000);
      var hintdata = document.getElementById('hint');
      hintdata.innerHTML = hint.move;
    }

    //If its white's turn to play
    else if(engine.turn() === 'w')
    {
      var hint = findbest(2 , true, -100000, 100000);
      var hintdata = document.getElementById('hint');
      hintdata.innerHTML = hint.move;
    }
  }
}
