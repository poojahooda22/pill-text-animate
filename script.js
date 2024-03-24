let customFont;

function preload() {
    customFont = loadFont("./MonaspaceNeon-Bold.ttf");
}

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
    "YouTube",
    "WhatsApp",
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
        this.body = Bodies.rectangle(x,y,word.length * 20, 40);
        this.word = word;
        World.add(engine.world, this.body);
    }

    show() {
        let pos = this.body.position;
        let angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        fill(255);
        stroke("#000000");
        strokeWeight(1);
        rect(0, 0, this.word.length * 20, 60, 40);
        noStroke();
        textFont(customFont);
        fill("#000000");
        textSize(20);
        textAlign(CENTER, CENTER);
        text(this.word, 0, 0);
        pop();
    }
}


function mouseMoved() {
    for(let word of words) {
        if(dist(mouseX, mouseY, word.body.position.x, word.body.position.y) < 50) {
            Body.applyForce(
                word.body,
                {x: word.body.position.x, y: word.body.position.y},
                {x: random(-0.3, 0.2), y: random(-0.2, 0.2)}
            );
        }
    }
}