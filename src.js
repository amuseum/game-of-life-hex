//This creates the empty grid
var grid = [];

function step() {
  for (var row in nodeArr) {
    for(var cell in row) {
      cell.checkSwap();
    }
  }
  for (var row in nodeArr) {
    for(var cell in row) {
      cell.doSwap();
    }
  }
}

// This creates the Node object.
// Properties:
//  n, int, row of the node
//  m, int, column of the node
//  isAlive, bool, whether or not it's alive
// Functions:
//  TODO add other functions
//  toString() function
function Node(n, m)
{
  this.n = n;
  this.m = m;
  this.isAlive = false;
  this.shouldSwap = false;

  // countLivingNeighbors()
  // return int number of living neighbors
  // uses listNeighbors()
  var countLivingNeighbors = function() {
    var sum = 0;
    for (var n in getNeighbors(this.n, this.m)) {
      if(n != null) {
        if (n.isAlive) {
          sum++;
        }
      }
    }
    return sum;
  }

  // checkSwap()
  // check if the nodes should swap
  // use countLivingNeighbors() to determine wether the square should be
  // swapped or not.
  // TODO currently only for square boards
  var checkSwap = function() {

    // count the number of living neighbors
    var living = countLivingNeighbors();

    // alive : < 2 die
    //       : 2-3 alive
    //       : > 3 die
    //
    // dead  : = 3 alive
    //       : ! 3 dead
    if(this.isAlive) {
      if(living < 2 || living > 3) {
        this.shouldSwap = true;
      }
    }
    else {
      if (living == 3) {
        this.shouldSwap = true;
      }
    }
  }

  // doSwap()
  // swap alive to dead and dead to alive if marked to change.
  var doSwap = function() {
    if(this.shouldSwap) {
      this.isAlive = !this.isAlive;
      this.shouldSwap = false;
    }
  }

  this.toString = function()
  {
    return "Node(" + this.n + ", " + this.m + ")";
  };
}

//This will populate the array with tiles, based on which option the user choose for the size (1 = small, 2 = medium, 3 = large)
function populateArray(size)
{
  //This clears the array so this method can be run several times.
  grid = [];
  if(size == 1)
  {
    for(var i = 0; i < 5; i++)
    {
      //The individual rows will be added one at a time
      var row = [];
      for(var j = 0; j < 5; j++)
      {
        //Adds a new node to the row
        var hex = new Node(i, j);
        row.push(hex);
      }
      grid.push(row);
    }
  }
  else if(size == 2)
  {
    for(var i = 0; i < 20; i++)
    {
      //The individual rows will be added one at a time
      var row = [];
      for(var j = 0; j < 20; j++)
      {
        //Adds a new node to the row
        var hex = new Node(i, j);
        row.push(hex);
      }
      grid.push(row);
    }
  }

  else
  {
    for(var i = 0; i < 100; i++)
    {
      //The individual rows will be added one at a time
      var row = [];
      for(var j = 0; j < 100; j++)
      {
        //Adds a new node to the row
        var hex = new Node(i, j);
        row.push(hex);
      }
      grid.push(row);
    }
  }
  console.log(grid);
}

function getNeighbors(i, j)
{
    var node = grid[i][j];
    var neighbors = [];
    console.log(i);
    console.log(j);
    if(j-1 >= 0)
    {
      neighbors.push(grid[i][j-1]);
    }

    if(j+1 < grid[i].length)
    {
      neighbors.push(grid[i][j+1]);
    }

    if(i-1 >= 0)
    {
      neighbors.push(grid[i-1][j]);
    }

    if(i+1 < grid.length)
    {
      neighbors.push(grid[i+1][j]);
    }

    console.log()
    if((node.n)%2 == 0)
    {
      console.log("Even row");
      if(j-1 >= 0)
      {
        if(i-1 >= 0)
        {
          neighbors.push(grid[i-1][j-1]);
        }
        if(i+1 < grid.length)
        {
          neighbors.push(grid[i+1][j-1]);
        }
      }
    }
    else
    {
      console.log("Odd row");
      if(j+1 < grid[i].length)
      {
        if(i-1 >= 0)
        {
          neighbors.push(grid[i-1][j+1]);
        }
        if(i+1 < grid.length)
        {
          neighbors.push(grid[i+1][j+1]);
        }
      }
    }
    console.log(neighbors.toString());
    return neighbors;
}