import processing.serial.*;

Serial myPort;
int xPos = 1;
float height_old = 0;
float height_new = 0;
float inByte = 0;
int BPM = 0;
int beat_old = 0;
float[] beats = new float[500];
int beatIndex;
float threshold = 620.0;
boolean belowThreshold = true;
PFont font;

void setup () {
  size(1000, 400);
  println(Serial.list());
  myPort = new Serial(this, Serial.list()[2], 9600);
  myPort.bufferUntil('\n');
  background(0xff);
  font = createFont("Ariel", 12, true);
}

void draw () {
  inByte = map(inByte, 0, 1023, 0, height);
  height_new = height - inByte; 
  line(xPos - 1, height_old, xPos, height_new);
  height_old = height_new;
  if (xPos >= width) {
    xPos = 0;
    background(0xff);
  } else {
    xPos++;
  }
  if (millis() % 128 == 0){
    fill(0xFF);
    rect(0, 0, 200, 20);
    fill(0x00);
    text("BPM: " + inByte, 15, 10);
  }
}

void serialEvent (Serial myPort) {
  String inString = myPort.readStringUntil('\n');
  if (inString != null) {
    inString = trim(inString);
    if (inString.equals("!")) { 
      stroke(0, 0, 0xff);
      inByte = 512;
    } else {
      stroke(0xff, 0, 0);
      inByte = float(inString); 
      if (inByte > threshold && belowThreshold == true) {
        calculateBPM();
        belowThreshold = false;
      } else if(inByte < threshold) {
        belowThreshold = true;
      }
    }
  }
}
  
void calculateBPM () {  
  int beat_new = millis();    
  int diff = beat_new - beat_old;    
  float currentBPM = 60000 / diff;    
  beats[beatIndex] = currentBPM;
  float total = 0.0;
  for (int i = 0; i < 500; i++){
    total += beats[i];
  }
  BPM = int(total / 500);
  beat_old = beat_new;
  beatIndex = (beatIndex + 1) % 500;
}
