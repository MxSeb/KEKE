// BABA IS Y'ALL SOLVER - BLANK TEMPLATE
// Version 1.0
// Code by Max 


//get imports (NODEJS)
var simjs = require('../js/simulation')					//access the game states and simulation

let possActions = ["space", "right", "up", "left", "down"];

const stateSet = new Set();
const stack = [];

//Class for exploration and already walked Path
class Node {
  constructor(m, a, p, w, d) {
    this.mapRep = m;
    this.actionHistory = a;
    this.parent = p;
    this.won = w;
    this.died = d;
  }
}

//Funktion for getting Map state to explore
function newState(kekeState, map) {
	simjs.clearLevel(kekeState);
	kekeState.orig_map = map;
	[kekeState.back_map, kekeState.obj_map] = simjs.splitMap(kekeState.orig_map);
	simjs.assignMapObjs(kekeState);
	simjs.interpretRules(kekeState);
  }

  //Function to figure out if next Path is a finning or dieing Path
  function Walk_through_and_check_the_new_Path_for_some_things(currState, parent,Path) {
	// Append the child direction to the existing movement path.
   // let nextActions = [];
	//nextActions.push(...parent.actionHistory);
  //  nextActions=makeSeq();
  //  console.log("nextActions ", nextActions)
	let won = false;
	let died = false;
	for (let a = 0, b = Path.length; a < b; a += 1) {
	  const nextMove = simjs.nextMove(Path[a], currState);
	  const nextState = nextMove.next_state;
	  won = nextMove.won;
	  if (nextState.players.length === 0) {
		won = false;
		died = true;
   //     console.log("Dead",Path)
	  }
	}
	const thisMap = simjs.doubleMap2Str(currState.obj_map, currState.back_map);
	const nextElementOnStack = new Node(thisMap, Path, parent, won, died);
	return nextElementOnStack;
  }
  //funktion for makeing a random Path
  function makeSeq(){
	let s = [];
	for(let i=0;i<50;i++){
		let action = possActions[Math.floor(Math.random()*possActions.length)];
		s.push(action);
	}
	an_action_set = s;
	return s;
}
// NEXT ITERATION STEP FOR SOLVING
function iterSolve(init_state){
	const currState = {};
	//Initialise the mapState For the Next Try
    newState(currState, init_state.orig_map);
	new_path = makeSeq();

	const parent = stack.pop();
 //   console.log("parent",parent)
	const NextTry = Walk_through_and_check_the_new_Path_for_some_things(currState, parent, new_path);

	const alivePathStack = [];
	//If the Try has a map representation and Bab is not dead Push path to the Alive Stack
	if (!stateSet.has(NextTry.mapRep) && !NextTry.died) alivePathStack.push(NextTry);
  	
	stateSet.add(NextTry.mapRep);
	if (NextTry.won){ 
		console.log("WinningPath Node",NextTry)
		return NextTry.actionHistory
	}
	// PERFORM ITERATIVE CALCULATIONS HERE //

	
	//return a sequence of actions or empty list
	stack.push(NextTry)
	//Pushing Next Try to the stack so he gets new Latest Try
//	console.log("NextTry",NextTry)
	return NextTry.actionHistory;
}

function initState(init_state) {
	const stack = [];
	const firstElement = new Node(simjs.map2Str(init_state.orig_map), [], null, false, false);
	stack.push(firstElement);
//	console.log("firstElement",firstElement)
  }

// VISIBLE FUNCTION FOR OTHER JS FILES (NODEJS)
module.exports = {
	step : function(init_state){return iterSolve(init_state)},		// iterative step function (returns solution as list of steps from poss_actions or empty list)
	init : function(init_state){  initState(init_state); },							// initializing function here
	best_sol : function(){return [];}				//returns closest solution in case of timeout
}


