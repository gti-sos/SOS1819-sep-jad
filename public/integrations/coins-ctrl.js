/* global angular */

angular
    .module("EmploymentsApp")
    .controller("CoinsCtrl", ["$scope", "$http", function($scope, $http) {

        console.log("Currency exchange controller initialized");
        var API = "https://awesomeapi-exchange.p.rapidapi.com/json/all";
        
        refresh();
    
        function refresh() {
            var config = {
                headers: {
                    "X-RapidAPI-Host": "awesomeapi-exchange.p.rapidapi.com",
                    "X-RapidAPI-Key": "e2602a8e3fmsha2e3bde47f7b582p1b8057jsnb0ebc55ccbb3",
                }
            };
            
            console.log("Requesting currency exchange to <" + API + ">...");
            
            $http.get(API, config).then(function(response) {
                console.log("Data received:" + JSON.stringify(response.data, null, 2));
                
				coins = response.data;
		
				am4core.ready(function() {
					am4core.useTheme(am4themes_animated);
					var chart = am4core.create("chartdiv", am4charts.XYChart);

					var data = [];
					var names = [];
					var open = [];
					var close = [];

					var names = [coins.USD.name, coins.CAD.name, coins.EUR.name, coins.GBP.name, coins.ARS.name, coins.JPY.name, 									coins.CHF.name, coins.CNY.name];
					
					var open = [(coins.USD.low).replace("," , "."), 
								(coins.CAD.low).replace("," , "."), 
								(coins.EUR.low).replace("," , "."), 
								(coins.GBP.low).replace("," , "."), 
								(coins.ARS.low).replace("," , "."), 
								(coins.JPY.low).replace("," , "."), 
								(coins.CHF.low).replace("," , "."), 
								(coins.CNY.low).replace("," , ".")];
					
					var close = [(coins.USD.high).replace("," , "."), 
								(coins.CAD.high).replace("," , "."), 
								(coins.EUR.high).replace("," , "."), 
								(coins.GBP.high).replace("," , "."), 
								(coins.ARS.high).replace("," , "."), 
								(coins.JPY.high).replace("," , "."), 
								(coins.CHF.high).replace("," , "."), 
								(coins.CNY.high).replace("," , ".")];
					
					for (var i = 0; i < names.length; i++) {
					  data.push({ category: names[i], open: open[i], close: close[i] });
					}

					chart.data = data;
					
					var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
					categoryAxis.renderer.grid.template.location = 0;
					categoryAxis.dataFields.category = "category";
					categoryAxis.renderer.minGridDistance = 15;
					categoryAxis.renderer.grid.template.location = 0.5;
					categoryAxis.renderer.grid.template.strokeDasharray = "1,3";
					categoryAxis.renderer.labels.template.rotation = -90;
					categoryAxis.renderer.labels.template.horizontalCenter = "left";
					categoryAxis.renderer.labels.template.location = 0.5;
					categoryAxis.renderer.inside = true;
					categoryAxis.renderer.labels.template.adapter.add("dx", function(dx, target) {
						return -target.maxRight / 2;
					})

					var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
					valueAxis.tooltip.disabled = true;
					valueAxis.renderer.ticks.template.disabled = true;
					valueAxis.renderer.axisFills.template.disabled = true;

					var series = chart.series.push(new am4charts.ColumnSeries());
					series.dataFields.categoryX = "category";
					series.dataFields.openValueY = "open";
					series.dataFields.valueY = "close";
					series.tooltipText = "open: {openValueY.value} close: {valueY.value}";
					series.sequencedInterpolation = true;
					series.fillOpacity = 0;
					series.strokeOpacity = 1;
					series.columns.template.width = 0.01;
					series.tooltip.pointerOrientation = "horizontal";

					var openBullet = series.bullets.create(am4charts.CircleBullet);
					openBullet.locationY = 1;

					var closeBullet = series.bullets.create(am4charts.CircleBullet);

					closeBullet.fill = chart.colors.getIndex(4);
					closeBullet.stroke = closeBullet.fill;

					chart.cursor = new am4charts.XYCursor();

					chart.scrollbarX = new am4core.Scrollbar();
					chart.scrollbarY = new am4core.Scrollbar();
					}); 				
				
            });
        }
    }]);



