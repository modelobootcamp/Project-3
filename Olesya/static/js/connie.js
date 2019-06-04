
d3.json("all_apps", function(data) {

    pieChart = dc.pieChart("#pieCategory"),
    // TypeChart = dc.pieChart("#Type"),
    priceChart = dc.rowChart('#Type'),
    // RatingChart = dc.barChart('#Rating')
    Content_RatingChart = dc.rowChart("#Content_Rating"),
    GenresChart = dc.rowChart("#Genres"),
    visCount = dc.dataCount(".dc-data-count"),
    ScatterChart = dc.scatterPlot('#scatter')


    var ndx = crossfilter(data);
    var all = ndx.groupAll();

    // var SizeDim = ndx.dimension(function (d) { return d["Size"]; });	
    // var Android_VerDim = ndx.dimension(function (d) { return d["Android Ver"]; });	
    var CategoryDim = ndx.dimension(function (d) { return d["Category"]; });			
    var TypeDim = ndx.dimension(function (d) { return d["Type"]; });
    // var Content_RatingDim = ndx.dimension(function (d) { return d["Content Rating"]; });
    // var GenresDim = ndx.dimension(function (d) { return d["Genres"]; });

    // var SizeGroup = SizeDim.group();
    // var Android_VerGroup = Android_VerDim.group();
    var CategoryGroup = CategoryDim.group();
    var TypeGroup = TypeDim.group();
    // var Content_RatingGroup = Content_RatingDim.group();
    // var GenresGroup = GenresDim.group();

        

    pieChart
        .dimension(CategoryDim)
        .group(CategoryGroup)
        //  .elasticX(true)
        .width(400)
        .height(400)
        .radius(200)
        .label(function (d) {
            if (pieChart.hasFilter() && !pieChart.hasFilter(d.key)) {
            return d.key + '(0%)';
            }
            var label = d.key;
            if (all.value()) {
            label += '(' + Math.floor(d.value / all.value() * 100) + '%)';
            }
            return label;
        })  
        .renderLabel(true)
        .innerRadius(50);

    console.log(pieChart);
    // TypeChart
    //      .dimension(TypeDim)
    //      .group(TypeGroup)
    //     //  .elasticX(true)
    //      .width(200)
    //      .height(200)
    //      .radius(100)
    //      .label(function (d) {
    //     if (CategoryChart.hasFilter() && !CategoryChart.hasFilter(d.key)) {
    //       return d.key + '(0%)';
    //     }
    //     var label = d.key;
    //     if (all.value()) {
    //       label += '(' + Math.floor(d.value / all.value() * 100) + '%)';
    //     }
    //     return label;
    //   })  
    //      .renderLabel(true)
    //      .innerRadius(50);

    priceChart
        .dimension(TypeDim)
        .group(TypeGroup)
        .elasticX(true)
        .width(400)
        .height(200);

    //  data.forEach(function (x) {
    //    x.Rating = +x.Rating;
    //    x.Reviews = +x.Reviews;
    //  });

    //  var ndx = crossfilter(data),
    //    runDimension = ndx.dimension(function (d) { return [+d.Rating, +d.Reviews]; }),
    //    speedSumGroup = runDimension.group().reduceSum(function (d) { return d.Reviews; });

    //  ScatterChart
    //    .width(768)
    //    .height(480)
    //    .x(d3.scaleLinear().domain([0, 5]))
    //    .margins({ top: 20, left: 60, right: 10, bottom: 20 })
    //    .brushOn(false)
    //    .symbolSize(10)
    //    .clipPadding(10)
    //    .xAxisLabel("Total Reviews")
    //    .yAxisLabel('Rating (1-5)')
    //    .dimension(runDimension)
    //    .group(speedSumGroup);


    dc.renderAll();

});