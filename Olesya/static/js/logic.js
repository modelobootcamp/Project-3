// var data = d3.json("db/top_apps.json")
// data.then(d => {console.log("data", data)})


// function zoom(d) {
//   const focus0 = focus;

//   focus = d;

//   const transition = svg.transition()
//       .duration(d3.event.altKey ? 7500 : 750)
//       .tween("zoom", d => {
//         const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
//         return t => zoomTo(i(t));
//       });

//   label
//     .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
//     .transition(transition)
//       .style("fill-opacity", d => d.parent === focus ? 1 : 0)
//       .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
//       .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
// }


d3.json("top_apps").then(function(data) {
    console.log(data);

    pack = data => d3.pack()
    .size([width, height])
    .padding(3)(d3.hierarchy(data)
    .sum(d => d.installs)
    .sort((a, b) => b.installs - a.installs));

    console.log(pack);

    format = d3.format(",d")

    console.log(format)

    const width = 400
    const height = width


    color = d3.scaleLinear()
    .domain([0, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl)


    const root = pack(data);
    let focus = root;
    let view;

    console.log(root);

    function zoom(d) {
        const focus0 = focus;
    
        focus = d;
    
        const transition = svg.transition()
            .duration(d3.event.altKey ? 7500 : 750)
            .tween("zoom", d => {
              const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
              return t => zoomTo(i(t));
            });
    
        label
          .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
          .transition(transition)
            .style("fill-opacity", d => d.parent === focus ? 1 : 0)
            .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
            .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
      }

    function newBarChart(data, category) {

      var apps = data.map(d => d.name);
      var installs = data.map(d => d.installs);
      var rating = data.map(d => d.rating);
      var reviews = data.map(d => d.reviews);
      console.log(data, category);

      new Chart(document.getElementById("bar-chart-horizontal"), {
        type: 'horizontalBar',
        data: {
          labels: apps,
          datasets: [
            {
            label: "Average Rating",
            backgroundColor: '#ff6384',
            xAxisID: "Rating",
            data: rating
          },
          {
            label: "Reviews",
            backgroundColor: '#36a2eb',
            xAxisID: "Reviews",
            data: reviews
          }
        ]
        },
        options: {
          scales:{
            xAxes: [{
              id:"Rating",
              type: "linear",
              position: "top"
            },{
              id:"Reviews",
              type: "linear",
              position: "bottom"
            },
          ]

          },
          legend: { display: true },
          title: {
            display: true,
            text: `Top 10 apps in ${category} category`
          }
        }
    });
    };

      const svg = d3.select("#bubble").append("svg")
      .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
      .attr("width", width)
      .attr("height", height)
      // .attr('transform', `translate(${width/2}, ${height/2})`)
      .style("display", "block")
      .style("margin", "0 -14px")
      .style("width", "calc(100% + 28px)")
      .style("height", "auto")
      .style("background", color(0))
      .style("cursor", "pointer")
      .on("click", () => zoom(root));
  
      const node = svg.append("g")
      .selectAll("circle")
      .data(root.descendants().slice(1))
      .enter().append("circle")
        .attr("fill", d => d.children ? color(d.depth) : "white")
        .attr("pointer-events", d => !d.children ? "none" : null)
        .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
        .on("mouseout", function() { d3.select(this).attr("stroke", null); })
        .on("click", d => {focus !== d && (zoom(d), d3.event.stopPropagation()), 
          newBarChart(d.data.children, d.data.name)});
  
        const label = svg.append("g")
        .style("font", "10px sans-serif")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
      .selectAll("text")
      .data(root.descendants())
      .enter().append("text")
        .style("fill-opacity", d => d.parent === root ? 1 : 0)
        .style("display", d => d.parent === root ? "inline" : "none")
        .text(d => d.data.name);
  

  zoomTo([root.x, root.y, root.r * 2]);

  function zoomTo(v) {
    const k = width / v[2];

    view = v;

    label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("r", d => d.r * k);
  }



  return svg.node();
})






