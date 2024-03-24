let customFont;

//add the font to the project
function preload() {
    customFont = loadFont("./MonaspaceNeon-Bold.ttf");
}

//took engine, world, bodies and body from matter.js
const Engine = Matter.Engine;

const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let words = [];
let ground, wallLeft, wallRight;

let wordsToDisplay = [
    "Facebook",
    "Instagram",
    "Twitter",
    "Snapchat",
    "LinkedIn",
    "Pinterest",
    "Reddit",
    "Instagram",
    "Twitter",
    "Snapchat",
    "LinkedIn",
    "Pinterest",
    "Reddit",
    "TikTok",
    "YouTube",
    "TikTok",
    "YouTube",
    "WhatsApp",
    "Facebook",
    "WhatsApp",
    "Facebook",
    "LinkedIn",
    "Pinterest",
    "Reddit",
    "TikTok",
    "YouTube",
    "WhatsApp",
    "Facebook",
    "Instagram",
    "Twitter",
    "Snapchat",
    "LinkedIn",
    "Pinterest",
    "Reddit",
    "TikTok",
]

function setup() {
    createCanvas(windowWidth, windowHeight - 60);

    engine = Engine.create();

    ground = Bodies.rectangle(width/2, height -20, width, 10, {
        isStatic: true,

    });

    wallLeft = Bodies.rectangle(0, height /2, 10, height, {
        isStatic: true,
    });

    wallRight = Bodies.rectangle(width, height /2, 10, height, {
        isStatic: true,
    });

    World.add(engine.world, [ground, wallLeft, wallRight]);

    for(let i =0; i< wordsToDisplay.length; i++) {

        words.push(new Word(random(width), -200, wordsToDisplay[i]));
    }
}

function draw() {
    background("#111111");
    Engine.update(engine);
    for(let word of words) {
        word.show();
    }
}

class Word {
    constructor(x, y, word) {
        this.body = Bodies.rectangle(x, y, word.length * 20, 40);
        this.word = word;

        //for random colors
        this.color = '#' + Math.floor(Math.random()*16777215).toString(16);
        World.add(engine.world, this.body);
    }

    show() {
        let pos = this.body.position;
        let angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);

        //apply  the color

        fill(this.color); 
        strokeWeight(0);
        rect(0, 0, this.word.length * 20, 60, 30);
        noStroke();
        textFont(customFont);
        fill("#000");
        textSize(20);
        textAlign(CENTER, CENTER);
        text(this.word, 0, 0);
        pop();
    }
}

function mouseMoved() {

    for(let word of words) {
        if(dist(mouseX, mouseY, word.body.position.x, word.body.position.y) 
            < 60) {

            Body.applyForce(
                word.body,
                {x: word.body.position.x, y: word.body.position.y},
                {x: random(-0.3, 0.3), y: random(-0.3, 0.3)}
            );
        }
    }
}