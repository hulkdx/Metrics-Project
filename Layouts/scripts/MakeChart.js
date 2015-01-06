//  Tommi Tuominen
//  Project Work course work 2014
// 

var ok_treshold = 170;
var warning_treshold = 50;
var dataArraya = [];
var dataArrayb = [];

//Create a chart with given attributes
function CreateChart(type, objectid, x_max, y_max, x_label, y_label, container_id){
    RandomizeData();
    
    $(function () {
    $('#'+container_id).highcharts({
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
    }); 
}

function addLine(){
    RandomizeData();
    var chart = $('#container').highcharts();
    chart.addSeries({
        data: dataArrayb
    });
}

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