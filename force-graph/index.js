console.log("index.js is called");

d3.json("/miserables.json", (data) => {
  const height = 1500;
  const width = 1500;
  console.log(data);
  const scale = d3.scaleOrdinal(d3.schemeCategory10);
  const color = (d) => scale(d.group);
  const drag = (simulation) => {
    function dragstarted(event) {
      console.log("DRAG STARTED");
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.fx = d3.mouse(this)[0];
      event.fy = d3.mouse(this)[1];
    }

    function dragged(event) {
      event.fx = d3.mouse(this)[0];
      event.fy = d3.mouse(this)[1];
    }

    function dragended(event) {
      console.log("DRAG ENDED");
      if (!event.active) simulation.alphaTarget(0);
      event.fx = null;
      event.fy = null;
    }

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  };

  const links = data.links.map((d) => Object.create(d));
  const nodes = data.nodes.map((d) => Object.create(d));

  // FROM D3JS : To use this module, create a simulation for an array of nodes, and compose
  // the desired forces. Then listen for tick events to render the nodes as
  // they update in your preferred graphics system, such as Canvas or SVG.
  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3.forceLink(links).id((d) => d.id)
    )
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 3));

  var svg = d3
    .select("body")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  const link = svg
    .append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.1)
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("stroke-width", (d) => Math.sqrt(d.value));

  const node = svg
    .append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 2)
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("fill", color)
    .call(drag(simulation));

  node.append("title").text((d) => d.id);

  simulation.on("tick", () => {
    // console.log(`Alpha is ${simulation.alpha()}`);
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  });

  console.log(`Alpha min is ${simulation.alphaMin()}`);
  console.log(`Alpha target is ${simulation.alphaTarget()}`);
});
