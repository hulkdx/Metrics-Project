/*
Tommi Tuominen 99710
Metrics Monitoring Tool
Project Work 2014/2015
Updated: 5.1.2015
This file is used for easier chart creation
and manipulation. Charts use highcharts.js library
----------------------
TODO:
Fancier charts?
*/ 

var seriesIndex = 0;

//Create a chart with given attributes
function CreateChart(type, x_label, y_label, container_id, chart_title){
    //RandomizeData();
    
    $(function () {
    $('#'+container_id).highcharts({
        chart: {
            type: type
        },
        title: {
            text: chart_title
        },
        xAxis: {
            categories: months
        },
        yAxis: {
            title: {
                text: 'Hours'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        tooltip: {
            //valueSuffix: ' hours'
            /*crosshairs: true,
            shared: true*/
        },
        plotOptions: {
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                            seriesIndex = this.series.index;
                        }
                    }
                }
            },
            bar: {
                dataLabels: {
                    enabled: true
                }
            },
            line:{
                 dataLabels: {
                    enabled: true
                }               
            },
            column:{
                 dataLabels: {
                    enabled: true
                }               
            },
            spline:{
                 dataLabels: {
                    enabled: true
                }               
            }
        }
  
    });    
    }); 
}

var new_type = -1;
var old_type = -1;

function addLine(DataArray, xCategories, containername, chart_title, types, seriesname, chartno){

    var chart = $("#"+containername).highcharts();
    new_type = types;
    
    Highcharts.charts[chartno].xAxis[0].update({categories:xCategories}, true);
    
    if(new_type == old_type || old_type == -1){
    
      //console.log("DataArray: "+JSON.stringify(DataArray));
      
      chart.addSeries({name: seriesname,data: DataArray});

      if(chart_title != ""){
          chart.setTitle({text: chart_title});    
      }      
      Highcharts.charts[chartno].xAxis[0].update({categories:xCategories}, true);
      
      old_type = new_type;
    
    }else{
        
        while(chart.series.length > 0){
           chart.series[0].remove(true);
        }

        //console.log("DataArray: "+JSON.stringify(DataArray));
        chart.addSeries({name: seriesname, data: DataArray});
        
        if(chart_title != ""){
            chart.setTitle({text: chart_title});    
        }      
        Highcharts.charts[chartno].xAxis[0].update({categories:xCategories}, true);
        
        old_type = new_type;
    }
}

function removeSeries(){
    var chart = $("#container").highcharts();
     
    if(document.getElementById("affectall").checked || chart.series.length == 1 ){
        while(chart.series.length > 0){
            chart.series[0].remove(true);
        }
    }else{
        chart.series[seriesIndex].remove(true);
    }

}

function change(newstyle){
    var chart = $("#container").highcharts();
    
    if(document.getElementById("affectall").checked){
        for(var i = 0; i<chart.series.length; i++){
            chart.series[i].update({
                type: newstyle
            });            
        }
        chart.xAxis[0].setCategories([]);
    }else{
        chart.series[seriesIndex].update({
            type: newstyle
        });        
    }
}


/* RANDOMIZED DATA FOR TESTING PURPOSES */

//Create a chart with random attributes
function ChartWithRandomData(type){
    RandomizeData();
    
    $(function () {
        $('#container').highcharts({
            chart: {
                type: type
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'Hours'
                },
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                }
            },
            tooltip: {
                crosshairs: true,
                shared: true
            },
            plotOptions: {
                spline: {
                    marker: {
                        radius: 4,
                        lineColor: '#666666',
                        lineWidth: 1
                    }
                }
            },
            series: [{
                name: 'Hours1',
                marker: {
                    symbol: 'square',
                },
                data: dataArraya //[7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, {y: 26.5, marker:{symbol: 'url(images/warning.png)'}}, 23.3, 18.3, 13.9, 9.6]
    
            }]
        });
        
        
    $('#button').click(function() {
        var chart = $('#container').highcharts();
        chart.addSeries({
            data: dataArrayb
        });
    });
            
            
    });
}

//Where the randomizing happens
function RandomizeData(){
    
    dataArraya = [Math.round(Math.random()*200),Math.round(Math.random()*200),Math.round(Math.random()*200),
                      Math.round(Math.random()*200),Math.round(Math.random()*200),Math.round(Math.random()*200),
                      Math.round(Math.random()*200),Math.round(Math.random()*200)];
    dataArrayb = [Math.round(Math.random()*200),Math.round(Math.random()*200),Math.round(Math.random()*200),
                      Math.round(Math.random()*200),Math.round(Math.random()*200),Math.round(Math.random()*200),
                      Math.round(Math.random()*200),Math.round(Math.random()*200)];
    
    for(i = 0; i < dataArraya.length; i++){
            if(dataArraya[i] <= warning_treshold){
                    dataArraya[i] = {y: dataArraya[i], marker:{symbol: 'url(images/warning.png)'}};
            }else if(dataArraya[i] >= ok_treshold){
                    dataArraya[i] = {y: dataArraya[i], marker:{symbol: 'url(images/ok.png)'},
                            onclick: function() {
                            console.log('click!');
                        }
                    };	
            }
    }
    
    for(i = 0; i < dataArrayb.length; i++){		
            if(dataArrayb[i] <= warning_treshold){
                    dataArrayb[i] = {y: dataArrayb[i], marker:{symbol: 'url(images/warning.png)'}};
            }else if(dataArrayb[i] >= ok_treshold){
                    dataArrayb[i] = {y: dataArrayb[i], marker:{symbol: 'url(images/ok.png)'},
                            onclick: function() {
                            console.log('click!');
                        }
                    };	
            }
    }
    
}