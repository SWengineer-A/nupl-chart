import React, {
  Component
} from 'react';
import './App.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import nupl from "./nupl.json"
import price from "./price.json"
am4core.useTheme(am4themes_animated);

class App extends Component {
  componentDidMount() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.paddingRight = 20;
    chart.data = this.getChartData();

    let title = chart.titles.create();
    title.text = "Bitcoin Net Unrealized Profit/Loss";
    title.fontSize = 25;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "NUPL (Net Unrealized Profit/Loss)"
    valueAxis.tooltip.disabled = true;
    let valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis1.title.text = "Price(US$)"
    valueAxis1.renderer.opposite = true;
    valueAxis1.syncWithAxis = valueAxis;
    valueAxis1.renderer.grid.template.disabled = true;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "valueNupl";
    series.strokeWidth = 2;
    series.tensionX = 0.77;
    series.tooltipText = "{valueNupl}";

    let series1 = chart.series.push(new am4charts.LineSeries());
    series1.dataFields.valueY = "valuePrice";
    series1.dataFields.dateX = "date";
    series1.tooltipText = "{valuePrice}";
    series1.yAxis = valueAxis1;

    let range = valueAxis.createSeriesRange(series);
    range.value = 1000;
    range.endValue = 0.75;
    range.contents.stroke = am4core.color("blue");
    range.contents.fill = range.contents.stroke;

    let range1 = valueAxis.createSeriesRange(series);
    range1.value = 0.75;
    range1.endValue = 0.5;
    range1.contents.stroke = am4core.color("green");
    range1.contents.fill = range1.contents.stroke;

    let range2 = valueAxis.createSeriesRange(series);
    range2.value = 0.5;
    range2.endValue = 0.25;
    range2.contents.stroke = am4core.color("yellow");
    range2.contents.fill = range2.contents.stroke;

    let range3 = valueAxis.createSeriesRange(series);
    range3.value = 0.25;
    range3.endValue = 0;
    range3.contents.stroke = am4core.color("orange");
    range3.contents.fill = range3.contents.stroke;

    let range4 = valueAxis.createSeriesRange(series);
    range4.value = 0;
    range4.endValue = -1000;
    range4.contents.stroke = am4core.color("red");
    range4.contents.fill = range4.contents.stroke;

    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    // scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;
    chart.scrollbarX.minHeight = 20
    chart.scrollbarX.parent = chart.bottomAxesContainer;

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  getChartData() {
    return nupl.map((item) => {
      const priceItem = price.find((pItem) => pItem.t === item.t);
      return {
        date: new Date(item.t * 1000),
        valueNupl: item.v,
        valuePrice: priceItem.o.c
      }
    })
  }
  render() {
    return ( <
      div id = "chartdiv"
      style = {
        {
          width: "100%",
          height: "90vh"
        }
      } > < /div>
    );
  }
}

export default App;