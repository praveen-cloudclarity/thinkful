var etfs = (function($) {

var etfData =  {"root":10, "children":[]};
var etfList = ["SPY", "EEM", "XLF", "VXX", "EWJ", "IWM", "QQQ", "GDX", "VWO", "FXI", "EFA", "UVXY", "EWZ",
				"TZA", "NUGT", "SLV", "GLD", "IYR", "XLE", "SDS", "XLU", "XLI", "TNA", "XLP", "TLT",
				"XLK", "FAZ", "XLV", "XLB", "SSO", "IAU", "DIA", "XHB", "EWT", "SPXU", "USO", "XLY", "UNG",
				"JNK", "DXJ", "FAS", "ITB", "TBT", "IVV", "XOP", "XRT", "HYG", "OIH", "QID", "RSX", "EPI", "EWH", "SH", "EWG", "VEA",
				"EWW", "AMLP", "XME", "VNQ", "VGK", "GDXJ", "EZU", "SPXS", "BKLN", "MDY", "KRE"
				];

var margin = {top:100, right:100, bottom:100, left:80};

var color = d3.scale.category20();

var gotETFData = false, etfReqs = 0, canvas, xpos = 0, ypos = 0, graphWidth = 1200 - margin.left - margin.right,
      graphHeight = 1600 - margin.top - margin.bottom;
var gridWidth = 100, gridHeight = 100;

var colorScale = d3.scale.linear().domain([, -10.0, -5.0, -1.0, 0, 1, 2])
				.range(['#ff2c00', '#ff3900', '#ff3d00', '#ffae73', '#ffc973', '#9db82e', '#819f00']);

function setETFData(data) {
	var obj1 = {};
	obj1.symbol = data.query.results.quote.Symbol;
	obj1.closePrice = data.query.results.quote.LastTradePriceOnly;
	obj1.volume = data.query.results.quote.Volume;
	obj1.pctChg = data.query.results.quote.PercentChange;
	obj1.value = 1;
	obj1.xpos = xpos;
	obj1.ypos = ypos;
	etfData.children.push(obj1);
	
};

function getETFData() {
	var symbol;

	etfList.forEach(function(symbol) {
		
		var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20WHERE%20symbol%3D' + "'" + symbol + 
		"'" + '&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

		++etfReqs;
		$.getJSON(url, function(data) {
			setETFData(data);
			--etfReqs;
			if (! etfReqs) {
				gotETFData = true;
			}
		});
	});
};

function waitToCreateGrid() {
	if (! gotETFData) {
		setTimeout(waitToCreateGrid, 100);
	} else {
		etfData.children.sort(function(a, b) {
		var a1 = getPct(a.pctChg), b1 = getPct(b.pctChg);
		return (b1 < a1 ? -1 : b1 > a1 ? 1 : 0);
		});
		var symIndex = 0;
		etfData.children.forEach(function(d) {
			d.value = ++symIndex;
			if (xpos > graphWidth) {
				xpos = 0;
				ypos += gridHeight;
			}
			d.xpos = xpos;
			d.ypos = ypos;
			xpos += gridWidth;
		});
		console.log("createGridMap");
		createGridMap();
		d3.select("svg").selectAll('g text').each(insertLineBreaks);
	}
}

function getPct(pctIn) {
	var pctOut = pctIn.substring(0, pctIn.length - 1);
	return (parseFloat(pctOut));
}
var insertLineBreaks = function(d) {
	var x = d3.select(this);
	x.append('tspan').text(d.symbol).attr('x', d.xpos + gridWidth/4).attr('y', d.ypos + gridHeight/3)
	.attr('style', 'font-weight:bold; font-size:1.5em; opacity:0.6;');
	x.append('tspan').text(d.closePrice).attr('x', d.xpos + gridWidth/4).attr('y', d.ypos + 10 + gridHeight/2)
	.attr('style', 'opacity:0.6');
	x.append('tspan').text(d.pctChg).attr('x', d.xpos-5 + gridWidth/4).attr('y', d.ypos + 30 + gridHeight/2)
	.attr('style', 'opacity:0.6');
	
}

var valueAccessor = function (d) {
	return d.value;
}
function createGridMap()
{
	var treemap = d3.layout.treemap().size([graphWidth, graphHeight]).value(valueAccessor).nodes(etfData);

	var cells = canvas.selectAll("g").data(treemap, 
								function(d) {
									if (typeof d.symbol === 'undefined') return;
									return d.value;
								})
								.enter().append("g")
								.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	cells.append("rect")
	.attr("x", function(d) {
		 return d.xpos;})
	.attr("y", function(d) { return d.ypos;})
	.attr("width", function(d) {return gridWidth;})
	.attr("height", function(d) {return gridHeight;})
	.attr("fill", function(d) {
		if (typeof d.pctChg === 'undefined') return;
		return colorScale(getPct(d.pctChg));
	});
	cells.append("text").attr("x", function(d) {return d.xpos + gridWidth/6;})
	.attr("y", function(d) {return d.ypos + gridHeight/2;});
	//.text(function(d, i) {
	//	if (typeof d.symbol == 'undefined')
	//		return;
	//	return d.symbol + ' ' + d.closePrice + ' ';});
}

function initModule() {

	canvas = d3.select("body").append("svg").attr("width", graphWidth + margin.left + margin.right)
						.attr("height", graphHeight + margin.top + margin.bottom);
	getETFData();
	waitToCreateGrid();
};

return {initModule : initModule};

}(jQuery));

jQuery(document).ready(function() {
	etfs.initModule();
});