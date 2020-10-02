var icon = d3.select("#icon").attr("src", "rocket.svg").attr("width", "100px");

const timeSteps = 100;
const duration = 20;
const transXRange = 5;
const transYRange = 5;
const scaleRange = 0;

const timeAdapt = function (t, range) {
  var timeEffect = 1 - t / timeSteps;
  return range * timeEffect;
};

for (var t = 0; t < timeSteps; t++) {
  //var angle = d3.randomUniform(-45, 45)();
  var angle = 0;
  var adaptedScaleRange = timeAdapt(t, scaleRange);
  var adaptedTransXRange = timeAdapt(t, transXRange);
  var adaptedTransYRange = timeAdapt(t, transYRange);
  var scale = d3.randomUniform(1 - adaptedScaleRange, 1 + adaptedScaleRange)();
  var translateX = d3.randomUniform(-adaptedTransXRange, adaptedTransXRange)();
  var translateY = d3.randomUniform(-adaptedTransYRange, adaptedTransYRange)();
  icon = icon
    .transition()
    .style(
      "transform",
      `translateX(${translateX}px) translateY(${translateY}px) rotate(${angle}deg) scale(${scale})`
    )
    .duration(duration);
}
