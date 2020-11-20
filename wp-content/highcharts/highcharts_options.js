var x = {},
	y = {};

Highcharts.setOptions({
	lang: {
		thousandsSep: ','
	}
});

var options_all = {
	chart: {
		events: {
			load: function () {
				x[this.index] = this.chartWidth - 190;		// using this as something unique to each chart
				y[this.index] = this.chartHeight - 60;
				if (this.chartWidth >= 700) {
					this.renderer.image('https://ffteducationdatalab.org.uk/wp-content/uploads/2018/03/fft_education_datalab_logo_lo.png', x[this.index], y[this.index], 180, 45)
						.attr('class', 'datalab-logo')
						.on('click' , function () {location.href = 'https://ffteducationdatalab.org.uk';})
						.add();
				}
			},
			redraw: function () {
				if (this.chartWidth - 190 != x[this.index]) {		// chart has changed width
					x[this.index] = this.chartWidth - 190;		// using this as something unique to each chart
					y[this.index] = this.chartHeight - 60;
					if (document.getElementsByClassName('datalab-logo')) {
						var elements = document.getElementsByClassName('datalab-logo');
						while (elements.length > 0) {
							elements[0].parentNode.removeChild(elements[0]);		// yep
						}
					}
					if (this.chartWidth >= 700) {
						this.renderer.image('https://ffteducationdatalab.org.uk/wp-content/uploads/2018/03/fft_education_datalab_logo_lo.png', x[this.index], y[this.index], 180, 45)
							.attr('class', 'datalab-logo')
							.on('click' , function () {location.href = 'https://ffteducationdatalab.org.uk';})
							.add();
					}
				}
			}
		},
		marginTop: 70,		// enough for one-line title and one-line subtitle on large devices
		styledMode: true,		// NB: only applies for High* v7+
		spacingBottom: 70
	},
	exporting: {
		buttons: {
			contextButton: {
				menuItems: ['downloadCSV']
			}
		},
		sourceWidth: 700,
		sourceHeight: 600
	},
	tooltip: {
		useHTML: true,		// used so that we can set line-height
	}
};

var options_bandedscatter = {
	chart: {
		type: 'scatter',
	},
	plotOptions: {
		series: {
			states: {
				hover: {
					enabled: false
				}
			},
			stickyTracking: false
		},
		scatter: {
			events: {
				show: function () {
					var chart = this.chart,
						series = chart.series,
						i = series.length,
						otherSeries;
					while (i--) {
						otherSeries = series[i];
						if (otherSeries != this && otherSeries.visible) {
							otherSeries.hide();
						}
					}
				},
				legendItemClick: function () {
					if (this.visible) {
						return false;
					}
				}
			},
			jitter: {
				x: 0.24
			},
			marker: {
				symbol: 'circle',
				radius: 3
			},
		}
	}
};

var options_column = {
	chart: {
		type: 'column'
	},
	plotOptions: {
		column: {
			minPointLength: 2
		},
	},
};

var options_line = {
	chart: {
		type: 'line',
	},
	plotOptions: {
		series: {
			states: {
				hover: {
					enabled: false
				}
			},
			stickyTracking: false
		},
		line: {
			marker: {
				symbol: 'circle',
				radius: 3
			},
		}
	},
	yAxis: {
		title: {
			enabled: false
		}
	}
};

var options_scatter = {
	chart: {
		type: 'scatter',
	},
	plotOptions: {
		series: {
			states: {
				hover: {
					enabled: false,
				}
			},
			stickyTracking: false
		},
		scatter: {
			events: {
				show: function () {
					var chart = this.chart,
						series = chart.series,
						i = series.length,
						otherSeries;
					while (i--) {
						otherSeries = series[i];
						if (otherSeries != this && otherSeries.visible) {
							otherSeries.hide();
						}
					}
				},
				legendItemClick: function () {
					if (this.visible) {
						return false;
					}
				}
			},
			marker: {
				symbol: 'circle',
				radius: 3
			},
		}
	}
};

var options_stackedbar = {
	chart: {
		type: 'bar'
	},
	plotOptions: {
		bar: {
			events: {
				legendItemClick: function () {
					return false;
				}
			},
			stacking: 'normal',
		},
	},
	tooltip: {
		shared: true,
		formatter: function () {		// restricts the tooltip to to just non-zero values. Uses the series name as the class - but with spaces replaced with dashes, to handle 'Requires improvement'
			return this.points.reduceRight(function (s, point) {
				if (point.y != 0) {
					return s + '<br/>' + '<span class=' + point.series.name.replace(/ /g, '-').toLowerCase() + '>\u25CF</span> ' + point.series.name + ': ' + Math.round((point.y * 100) * 10) / 10 + '%';		// converting to percentage and rounding to 1 d.p.
				} else {
					return s;
				}
			}, '<span class=header>' + this.points[0].key + '</span>');
		},
	},
	xAxis: {
		min: 0,
		max: 7,		// if changing need to also change xAxis.scrollbar.step
		scrollbar: {
			enabled: true,
			step: 0.125		// i.e. 1 divided by 8
		},
		tickLength: 0,
		type: 'category',
	},
	yAxis: {
		min: 0,
		max: 1,
		reversedStacks: false,
		tickInterval: 0.2,
		title: {
			text: null
		},
		labels: {
			formatter: function () {
				return this.value * 100 + '%';
			}
		}
	},
};
