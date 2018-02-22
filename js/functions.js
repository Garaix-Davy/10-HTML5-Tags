

function resize_canvas(element)
{
	var w = element.offsetWidth;
  var h = element.offsetHeight;
  var cv = document.getElementById("overlay");
  cv.width = w;
  cv.height =h;

}

var canvas = document.getElementById('overlay');
var context = canvas.getContext('2d');
var size = 0;
var keepDrawing;
var randomColor;

canvas.addEventListener("mousedown", function(evt){
  randomColor = "#"+dec2webhex(Math.random(16581375)*16581375);
  document.getElementById("sfx").play();
  keepDrawing = setInterval( function() {

    var mousePos = getMousePos(canvas, evt);
    drawCircle(mousePos.x,mousePos.y,size);
    size+=2;

  }, 10)

});

canvas.addEventListener("mouseup", function(evt){
  size = 0;
  clearInterval(keepDrawing);
    document.getElementById("sfx").load();
});

canvas.addEventListener("mousemove", function(evt){
  var mousePos = getMousePos(canvas, evt);
  var red = Math.round((mousePos.x/mousePos.maxX)*255);
  var green = Math.round((mousePos.y/mousePos.maxY)*255);
  var blue = Math.round(((255-red)+(255-green)/2)*255);
  document.getElementById("overlay").style.background = "rgba(" + red + "," + green + "," + "0,0.3)";
  // document.getElementById("debug").innerHTML = red + "," + green + "("+ Math.round(mousePos.y) +")"+ Math.round(Math.random(255)*255);
});


function drawCircle(x,y,z){
  //context.fillStyle = randomColor;
  context.strokeStyle = randomColor;
  context.beginPath();
  context.arc(x,y,size,0,2*Math.PI);
  //context.fill();
  context.stroke();
}

function getMousePos(canvas, evt) {
var rect = canvas.getBoundingClientRect();
return {
  x: evt.clientX - rect.left,
  y: evt.clientY - rect.top,
  maxX: rect.width,
  maxY: rect.height
};
}


function dec2webhex(numString){
  var num = parseInt(numString).toString(16);
  while (num.length<6){
    var tmp = "0";
    num = tmp + num;
  }
  return num.toUpperCase();
}


function resetCanvas(){
  context.clearRect(0,0,canvas.width,canvas.height);
}
