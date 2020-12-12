var fgImg = null;
var bgImg = null;
var fgCanvas;
var bgCanvas;
var cmpstCanvas;

function loadForegroundImage() {
  var fgImageInput = document.getElementById("fgImage");
  fgImg = new SimpleImage(fgImageInput);
  fgCanvas = document.getElementById("fgCanvas");
  fgImg.drawTo(fgCanvas);
}
function loadBackgroundImage() {
  var bgImageInput = document.getElementById("bgImage");
  bgImg = new SimpleImage(bgImageInput);
  bgCanvas = document.getElementById("bgCanvas");
  bgImg.drawTo(bgCanvas);
}
function createComposite() {
  if (fgImg.width != bgImg.width){
    var w = bgImg.getWidth();
    var h = bgImg.getHeight();
    fgImg.setSize(w, h);
  }
  var output = new SimpleImage(bgImg.getWidth(), bgImg.getHeight());  
  for (var px of fgImg.values()) {
    var x = px.getX();
    var y = px.getY();
    if (px.getGreen() > px.getRed() + px.getBlue()) {
      output.setPixel(x, y, bgImg.getPixel(x, y));
    }
    else{
      output.setPixel(x, y, px);
    }
  }
  return output;
}
function doGreenScreen() {
  if (fgImg == null || !fgImg.complete()){
    alert('Your foreground image is not uploaded!')
  }
  if (bgImg == null || !bgImg.complete()){
    alert('Your Background image is not uploaded!')
  }
  else{
    var outputImg = createComposite();
    cmpstCanvas = document.getElementById("cmpstCanvas");
    outputImg.drawTo(cmpstCanvas);
  }
}
function makeClear() {
  clearOneCanvas(fgCanvas);
  clearOneCanvas(bgCanvas);
  clearOneCanvas(cmpstCanvas);
}
function clearOneCanvas(canvas){
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
}
