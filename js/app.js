// some constants
var ip = "127.0.0.1";
var port = "3000";

$(function () {

    $(document).ready(function () {

        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        $('#currentDraw').highcharts({
            chart: {
                type: 'areaspline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {
                        updateWindow();
                        updateCurrent();
                    }
                }
            },
            credits: {
                enabled: false
            },
            title: {
                text: 'Total Current Draw'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Amps'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
}]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + Highcharts.numberFormat(this.y, 2) + ' Amps';
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: true
            },
            series: [{
                name: 'Current Draw',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random() * 100
                        });
                    }
                    return data;
                }())
}]
        });
    });

    var gaugeOptions = {

        chart: {
            type: 'solidgauge',
            events: {
                load: function () {
                    // set up the updating of the chart each second
                    updatePressure();
                }
            }
        },

        title: null,

        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            stops: [
[0.1, '#DF5353'], // green
 [0.5, '#DDDF0D'], // yellow
 [0.9, '#55BF3B'] // red
],
            lineWidth: 0,
            minorTickInterval: 10,
            tickPixelInterval: 120,
            tickWidth: 0,
            title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    // The pressure gauge
    $('#pressureChart').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 120,
            title: {
                text: 'Pressure'
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Pressure',
            data: [80],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                    '<span style="font-size:12px;color:silver">PSI</span></div>'
            },
            tooltip: {
                valueSuffix: ' PSI'
            }
}]

    }));

    $('#gyroChart').highcharts({
        chart: {
            type: 'gauge',
            events: {
                load: function () {
                    // set up the updating of the chart each second
                    updateAngle();
                }
            },
            spacingBottom: 1,
            spacingTop: 1,
            spacingLeft: 1,
            spacingRight: 1,
            marginBottom: 1,
            marginTop: 20,
            marginLeft: 1,
            marginRight: 1,
        },
        title: {
            text: 'Gyroscope Heading'
        },
        credits: {
            enabled: false
        },
        yAxis: {
            title: {
                text: 'Angle in °'
            },
            min: 0,
            max: 360,
            showLastLabel: true,
            tickInterval: 45,
            labels: {
                formatter: function () {
                    var direction,
                        directions = {
                            0: '0',
                            45: '45',
                            90: '90',
                            135: '135',
                            180: '180',
                            225: '225',
                            270: '270',
                            315: '315'
                        };
                    direction = directions[this.value] || '';
                    return '<b>' + direction + '</b>'
                }
            }
        },
        tooltip: {
            enabled: false
        },
        series: [{
            name: 'Angle',
            animation: true,
            dataLabels: {
                enabled: true,
                formatter: function () {
                    return Highcharts.numberFormat(this.y, 2);
                }
            },
            data: [{
                id: 'heading',
                y: 0,
                dial: {
                    radius: '90%',
                    backgroundColor: '#f66',
                    borderColor: '#faa',
                    baseWidth: 5,
                    baseLength: '90%'
                }
 }],
            tooltip: {
                valueSuffix: '°'
            }
 }]

    });

    $('#ultraChart').highcharts({
        chart: {
            type: 'areaspline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {
                    updateUltra();
                }
            }
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Ultrasonic Data'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Distance (cm)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
                }]
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'Distance (cm)',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: Math.random() * 160
                    });
                }
                return data;
            }())
            }]
    });

    // update ultrasonic graph
    function updateUltra() {
        var chart = $('#ultraChart').highcharts();
        var socket = io.connect('http://' + ip + ':' + port);
        
        socket.on('ultra', function (time, data) {
            console.log(parseFloat(data));
            var series = chart.series[0];
            series.addPoint([time, parseFloat(data)]);
        });
    };

    // update gyro graph
    function updateAngle() {
        var chart = $('#gyroChart').highcharts();
        var socket = io.connect('http://' + ip + ':' + port);
        
        socket.on('gyro', function (time, data) {
            console.log(parseFloat(data));
            var series = chart.get('heading');
            series.update(data, true, true);
        });
        // random data
        var series = chart.get('heading');
        setInterval(function () {
            y = Math.random() * 360;
            series.update(y, true, true);
        }, 1000);
    };
    
    // update solenoid buttons
    function updateSolenoid() {
        // what should we do here?
        var button = $('#button'));
        
        var socket = io.connect('http://' + ip + ':' + port);
        socket.on('solenoid', function (time, data) {
            console.log(parseFloat(data));
            // add code for updating buttons here
        });
    };
    
    // update solenoid buttons
    function updateEncoder() {
        // create encoder chart somewhere
        var chart = $('#encoder').highcharts();
        var socket = io.connect('http://' + ip + ':' + port);
        
        socket.on('encoder', function (time, data) {
            console.log(parseFloat(data));
            // add code for updating encoder data here
        });
    };

    var yMax = 0;
    
    function updateCurrent() {
        var chart = $('#currentDraw').highcharts();
        var socket = io.connect('http://' + ip + ':' + port);
        
        socket.on('current', function (time, data) {
            console.log(parseFloat(data));
            var series = chart.series[0];
            series.addPoint([time, parseFloat(data)]);
            drawMax();
        });
        drawMax();
    };

    function drawMax() {
        var chart = $('#currentDraw').highcharts()
        var series = chart.series[0];
        extremes = chart.yAxis[0].getExtremes();
        if (extremes.dataMax > yMax) {
            chart.yAxis[0].removePlotLine('plot-line-1');
            yMax = extremes.dataMax;
            chart.yAxis[0].addPlotLine({
                value: yMax,
                dashStyle: 'shortdash',
                color: 'red',
                width: 2,
                id: 'plot-line-1'
            });
            $('#label-1').remove();
            chart.renderer.label(
                    'Max Current Draw: ' + Highcharts.numberFormat(yMax, 2),
                    100,
                    20)
                .attr({
                    id: 'label-1',
                    zIndex: 8
                })
                .add();
        }
    }

    function updatePressure() {
        var socket = io.connect('http://' + ip + ':' + port);
        socket.on('pressure', function (time, data) {
            console.log(parseFloat(data));
            
            var chart = $('#pressureChart').highcharts(),
            point,
            newVal,
            inc;
            
            if (chart) {
                point = chart.series[0].points[0];
                inc = Math.round((Math.random() - 0.5) * 100);
                newVal = point.y + inc;
                if (newVal < 0 || newVal > 120) {
                    newVal = point.y - inc;
                }

                point.update(newVal);
            }
        });
        // random data
        setInterval(function () {
            // Speed
            var chart = $('#pressureChart').highcharts(),
                point,
                newVal,
                inc;
            if (chart) {
                point = chart.series[0].points[0];
                inc = Math.round((Math.random() - 0.5) * 100);
                newVal = point.y + inc;
                if (newVal < 0 || newVal > 120) {
                    newVal = point.y - inc;
                }

                point.update(newVal);
            }
        }, 1000);
    };

    function updateWindow() {
        setInterval(function () {
            $(window).resize();
        }, 1000);
    };
});