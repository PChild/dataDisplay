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
                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = Math.random() * 120;
                            series.addPoint([x, y], true, true);
                            drawMax();
                        }, 1000);
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

        var yMax = 0;

        function drawMax() {
            var chart = $('#currentDraw').highcharts()
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
        };
    });

    var gaugeOptions = {

        chart: {
            type: 'solidgauge'
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


    // Bring life to the dials
    setInterval(function () {
        $(window).resize();
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
    }, 2000);
});