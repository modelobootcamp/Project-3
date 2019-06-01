
     
               var  SizeChart = dc.rowChart("#Size"),
                    Android_VerChart = dc.rowChart("#Android_Ver"),
                    CategoryChart = dc.rowChart("#Category"),
                    TypeChart = dc.rowChart("#Type"),
                    Content_RatingChart = dc.rowChart("#Content_Rating"),
                    GenresChart = dc.rowChart("#Genres"),
                    visCount = dc.dataCount(".dc-data-count")
     
     
     
               d3.csv("data.csv", function(data) {
     
     
                    var ndx = crossfilter(data);
                    var all = ndx.groupAll();
     
                    var SizeDim = ndx.dimension(function (d) { return d["Size"]; });	
                    var Android_VerDim = ndx.dimension(function (d) { return d["Android_Ver"]; });	
                    var CategoryDim = ndx.dimension(function (d) { return d["Category"]; });			
                    var TypeDim = ndx.dimension(function (d) { return d["Type"]; });
                    var Content_RatingDim = ndx.dimension(function (d) { return d["Content_Rating"]; });
                    var GenresDim = ndx.dimension(function (d) { return d["Genres"]; });
     
                    var SizeGroup = SizeDim.group();
                    var Android_VerGroup = Android_VerDim.group();
                    var CategoryGroup = CategoryDim.group();
                    var TypeGroup = TypeDim.group();
                    var Content_RatingGroup = Content_RatingDim.group();
                    var GenresGroup = GenresDim.group();
     
     
                    SizeChart
                         .dimension(SizeDim)
                         .group(SizeGroup)
                         .elasticX(true)
                         .width(400)
                         .height(500);
     
                    Android_VerChart
                         .dimension(Android_VerDim)
                         .group(Android_VerGroup)
                         .elasticX(true)
                         .width(400)
                         .height(500);                    
     
                    CategoryChart
                         .dimension(CategoryDim)
                         .group(CategoryGroup)
                         .elasticX(true)
                         .width(400)
                         .height(500);
                         

                    
                    TypeChart
                         .dimension(TypeDim)
                         .group(TypeGroup)
                         .elasticX(true)
                         .width(400)
                         .height(500);
     
                    Content_RatingChart
                         .dimension(Content_RatingDim)
                         .group(Content_RatingGroup)
                         .elasticX(true)
                         .width(400)
                         .height(500)
     
                    GenresChart
                         .dimension(GenresDim)
                         .group(GenresGroup)
                         .elasticX(true)
                         .width(400)
                         .height(500)     
                         .data(function (group) { return group.top(10); });
     
     
     
     
                    dc.renderAll();
     
               });
