int x,y;
Brush[] brushes;
boolean start;
color bgColor = color(#dddddd);

void setup() {
    size(screenWidth, screenHeight);
    start = false;
    x = 0;
    y = 0;
    frameRate(30);
    smooth();
    background(bgColor);
    noLoop();
}

void draw() {
    if (brushes) {
    for (int i=0; i<brushes.length; i=i+1) {
        brushes[i].paint();
    }
    }
}

void clean() {
    background(bgColor);
}

void setupBrush(int number) {
    brushes = new Brush[number];
    for (int i=0; i<number; i=i+1) {
        brushes[i] = new Brush();
    }
}

void addBrush(int index, color brushColor) {
}

class Brush {
    float x, y;
    float brushWidth;
    color c;

    Brush () {
        setRandomPosition();
        setRandomColor();
        brushWidth = random(40, 90);
    }

    void paint() {
        x = x + random(-15, 15);
        y = y + random(-15, 15);

        if (brushWidth > 0) {
            fill(c);
            noStroke();
            ellipse(x, y, brushWidth, brushWidth);
            brushWidth = brushWidth - 0.5;
        } else {
        }
    }

    void setRandomPosition() {
        //x = random(0, screenWidth);
        //y = random(0, screenHeight);
        x = screenWidth/2 + random(-10, 10);
        y = screenHeight/2 + random(-10, 10);
    }

    void setRandomColor() {
        c = color(random(255), random(255), random(255));
    }

}
