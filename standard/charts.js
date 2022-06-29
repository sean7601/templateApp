var charts = {};

charts.createPieChart = function(data, container, title, subtitle, xAxisTitle, yAxisTitle, tooltipTitle, tooltipUnit) {
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: container,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: title
        },
        subtitle: {
            text: subtitle
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.point.name +'</b>: '+ this.y +' '+ tooltipUnit;
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    formatter: function() {
                        return '<b>'+ this.point.name +'</b>: '+ this.y +' '+ tooltipUnit;
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: data
        }]
    });
}

charts.createLineChart = function(data, container, title, subtitle, xAxisTitle, yAxisTitle, tooltipTitle, tooltipUnit) {
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: container,
            type: 'line'
        },
        title: {
            text: title
        },
        subtitle: {
            text: subtitle
        },
        xAxis: {
            title: {
                text: xAxisTitle
            },
            categories: data.categories
        },
        yAxis: {
            title: {
                text: yAxisTitle
            }
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.series.name +'</b><br/>'+ this.x +': '+ this.y +' '+ tooltipUnit;
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: true
            }
        },
        series: data.series
    });
}

charts.createHistogram = function(data, container, title, subtitle, xAxisTitle, yAxisTitle, tooltipTitle, tooltipUnit) {
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: container,
            type: 'column'
        },
        title: {
            text: title
        },
        subtitle: {
            text: subtitle
        },
        xAxis: {
            title: {
                text: xAxisTitle
            },
            categories: data.categories
        },
        yAxis: {
            title: {
                text: yAxisTitle
            }
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.series.name +'</b><br/>'+ this.x +': '+ this.y +' '+ tooltipUnit;
            }
        },
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: true
            }
        },
        series: data.series
    });
}

