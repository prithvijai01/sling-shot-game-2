const{Engine, World, Bodies, MouseConstraint, Mouse, Constraint, Composites} = Matter;
var world, engine;
let ground;
let bird;
var mouseConstraint;
var box1, box2, box3, box4, box5, box6, box7, box8, box9, box10, box11, box12;
var base1, base2;
var sling;
var topBoundary, leftBoundary, rightBoundary;
var score = 0;
var timer = 1000;
var gameState = "Play";

function setup(){
	
    createCanvas(1200,700);	
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(600, 710, 1200, 100);
    bird = new Bird(200, 300, 20);

    box1 = new boxClass(600, 490, 60, 60);
    box2 = new boxClass(700, 490, 60, 60);
    box3 = new boxClass(800, 490, 60, 60);
    box4 = new boxClass(650, 400, 60, 60);
    box5 = new boxClass(750, 400, 60, 60);
    box6 = new boxClass(700, 310, 60, 60);

    box7 = new boxClass(600, 290, 60, 60);
    box8 = new boxClass(700, 290, 60, 60);
    box9 = new boxClass(800, 290, 60, 60);
    box10 = new boxClass(650, 200, 60, 60);
    box11 = new boxClass(750, 200, 60, 60);
    box12 = new boxClass(700, 110, 60, 60);

    base1 = new Base(700, 500, 300, 10);
    base2 = new Base(700, 300, 300, 10);

    leftBoundary = new Boundary(-50,350,100,900);
    rightBoundary = new Boundary(1250,350,100,900);
    topBoundary = new Boundary(600,-50,1200,100);

    sling = new Slingshot(bird.body, {x:200, y:300});

    const mouse = Mouse.create(canvas.elt);

	var options = {
		mouse: mouse
	}
	
    mouseConstraint = MouseConstraint.create(engine, options);
    World.add(world, mouseConstraint);
}

function draw(){
    background(30,30,30);
    Engine.update(engine);

    ground.display();
    bird.display();

    if(gameState === "Play"){
        box1.display(); 
        box2.display();
        box3.display();
        box4.display();
        box5.display();
        box6.display();
        box7.display();
        box8.display();
        box9.display();
        box10.display();
        box11.display();
        box12.display();
    }

    base1.display();
    base2.display();

    leftBoundary.display();
    rightBoundary.display();
    topBoundary.display();
    
    sling.display();
    
    //Decrease the timer count
    if(gameState === "Play" && timer > 0){
        timer --;
    }
    //Write the winning conditions
    if(timer > 0 && world.bodies.length === 7 && gameState === "Play"){
        gameState = "Win";
    }
    if(timer === 0 && world.bodies.length === 7 && gameState === "Play"){
        gameState = "Win";
    }
    if(gameState === "Win"){
        win();
    }
    //Write the losing condition
    if(timer === 0 && world.bodies.length > 7 && gameState === "Play"){
        gameState = "Lose";
    }
    if(gameState === "Lose"){
        lose();
    }
    
    //Display the score and the timer
    push();
    textSize(20);
    fill(255);
    text("Score: " + score, 40, 40);
    text("Time left: " + timer, 40, 80);
    pop();
}

function mouseReleased(){
    setTimeout(() =>{
        sling.fly();
    },15);
    
}

function keyPressed(){
    if(keyCode === 32){
        World.remove(world, bird.body);
        bird = new Bird(200, 300, 20);
        sling.attach(bird.body);
    }
}

function win(){
  textSize(30);
  fill(255);
  text("You win!", 450, 50);
  World.remove(world, box1.body);
  World.remove(world, box2.body);
  World.remove(world, box3.body);
  World.remove(world, box4.body);
  World.remove(world, box5.body);
  World.remove(world, box6.body);
  World.remove(world, box7.body);
  World.remove(world, box8.body);
  World.remove(world, box9.body);
  World.remove(world, box10.body);
  World.remove(world, box11.body);
  World.remove(world, box12.body);
}

function lose(){
  textSize(30);
  fill(255);
  text("You lose!", 450, 40);
  World.remove(world, box1.body);
  World.remove(world, box2.body);
  World.remove(world, box3.body);
  World.remove(world, box4.body);
  World.remove(world, box5.body);
  World.remove(world, box6.body);
  World.remove(world, box7.body);
  World.remove(world, box8.body);
  World.remove(world, box9.body);
  World.remove(world, box10.body);
  World.remove(world, box11.body);
  World.remove(world, box12.body);
}