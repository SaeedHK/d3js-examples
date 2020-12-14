console.log("index.js is called");

d3.select("body")
  .append("div")
  .text("HELLO")
  .style("font-size", "100px")
  .attr("class", "class1");

const width = 100;

const svg = d3
  .select("body")
  .append("svg")
  .attr("viewBox", [0, 0, width, 33])
  .attr("font-family", "sans-serif")
  .attr("font-size", 10)
  .style("display", "block");

const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

const myfunction = function () {
  var letters = d3
    .shuffle(alphabet.slice())
    .slice(Math.floor(Math.random() * 10) + 5)
    .sort(d3.ascending);
  const t = svg.transition().duration(750);
  svg
    .selectAll("text")
    .data(letters, (d) => d)
    .join(
      (enter) =>
        enter
          .append("text")
          .attr("y", -7)
          .attr("dy", "0.35em")
          .attr("x", (d, i) => i * 17)
          .text((d) => d),
      (update) => update,
      (exit) => exit.call((text) => text.transition(t).remove().attr("y", 41))
    )
    .call((text) =>
      text
        .transition(t)
        .attr("y", 17)
        .attr("x", (d, i) => i * 17)
    );
};
setInterval(() => myfunction(), 3000);
