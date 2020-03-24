// Create the chart
window.chart =
Highcharts.stockChart('container', {
    rangeSelector: {
        allButtonsEnabled: true,
        buttons: [{
            type: 'month',
            count: 3,
            text: 'Day',
            dataGrouping: {
                forced: true,
                units: [['day', []]]
            }
        }, {
            type: 'year',
            count: 1,
            text: 'Week',
            dataGrouping: {
                forced: true,
                units: [['week', [1]]]
            }
        }, {
            type: 'all',
            text: 'Month',
            dataGrouping: {
                forced: true,
                units: [['month', [1]]]
            }
        }, {
            type: 'all',
            text: 'Year',
            dataGrouping: {
                forced: true,
                units: [['year', [1]]]
            }
        }],
        buttonTheme: {
            width: 60
        },
        selected: 2
    },

    title: {
        // text: 'График',
        colors: ['#d8803c', '#233a0e', '#bc3ab5', '#910000', '#1aadce',
            '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a']
    },
    legend: {
        enabled: true
    },

    plotOptions: {
        series: {
            showInLegend: true
        }
    },
    series: [{
        id: 'original',
        name: '$USD/RUB',
        data: window.data,
        color: '#492970',
        tooltip: {
            valueDecimals: 2
        }
    }, {
        linkedTo: 'original',
        type: 'sma',
        color: '#233A0E',
        visible: false,
        params: {
            period: 10
        }
    },
        {
            linkedTo: 'original',
            type: 'sma',
            color: '#C42525',
            visible: false,
            params: {
                period: 100
            }
        }]
})
