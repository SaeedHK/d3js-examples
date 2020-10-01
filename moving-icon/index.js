var icon = d3.select("#icon");

var timeSteps = 300;
var duration = 50;
var translateXRange = 10;
var translateYRange = 10;
for (var i = 0; i < timeSteps; i++) {
  //var angle = d3.randomUniform(-45, 45)();
  var angle = 0;
  var scale = d3.randomUniform(0.8, 1.2)();
  var translateX = d3.randomUniform(-translateXRange, translateXRange)();
  var translateY = d3.randomUniform(-translateYRange, translateYRange)();
  icon = icon
    .transition()
    .style(
      "transform",
      `translateX(${translateX}px) translateY(${translateY}px) rotate(${angle}deg) scale(${scale})`
    )
    .duration(duration);
}
