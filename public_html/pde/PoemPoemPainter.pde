int x,y;
ArrayList brushes;
boolean start;
color bgColor = color(#dddddd);

void setup() {
    start = false;
    brushes = new ArrayList();
    x = 0;
    y = 0;

    size(screenWidth, screenHeight);
    frameRate(30);
    smooth();
    background(bgColor);
    noLoop();
}

void draw() {
    for (int i=0; i<brushes.size(); i=i+1) {
        Brush b = brushes.get(i);
        b.paint();
    }
}

void clean() {
    background(bgColor);
}

void addBrush(String colorString, float energy) {
    brushes.add(new Brush(colorString, energy));
}

class Brush {
    float x, y;
    float brushWidth, brushDynamics;
    color c;

    Brush (String colorString, float energy) {
        setRandomPosition();
        setColor(colorString);
        if (energy >= 0) {
            brushDynamics = energy;
            brushWidth = random(30, 70);
        } else {
            brushDynamics = random(15);
            brushWidth = abs(energy) + random(-5, 10);
        }
    }

    void paint() {
        x = x + random(brushDynamics*-1, brushDynamics);
        y = y + random(brushDynamics*-1, brushDynamics);

        if (brushWidth > 0) {
            fill(c);
            noStroke();
            ellipse(x, y, brushWidth, brushWidth);
            brushWidth = brushWidth - 0.5;
        } else {
        }
    }

    void setColor(String colorString) {
        c = color(unhex(colorString));
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
