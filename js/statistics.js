// Time Tracker and Mortality Counter for 'Statistics' Page
const TIMER_DISPLAY = document.getElementById("counterStats");
const MORTALITY_COUNTER = document.getElementById("deathStats");

let elapsedMinutes = 0;
let elapsedSeconds = 0;
let estimatedDeaths = 0;

document.addEventListener("DOMContentLoaded", initializeTimer);

// Update the counters periodically
function initializeTimer() {
    TIMER_DISPLAY.innerHTML = `<p class='stats-banner-text'>Time spent here: <span class='blue-seconds'>${elapsedMinutes}:${elapsedSeconds}</span> minutes.</p>`;
    MORTALITY_COUNTER.innerHTML = `<p class='stats-banner-text'>Approximate deaths worldwide: <span class='red-count-statistics'>${estimatedDeaths}</span></p>`;

    elapsedSeconds++;
    estimatedDeaths += 2;

    // Reset seconds to 0 and increment minutes
    if (elapsedSeconds % 60 === 0) {
        elapsedSeconds = 0;
        elapsedMinutes++;
        elapsedMinutes = elapsedMinutes < 10 ? `0${elapsedMinutes}` : elapsedMinutes;
    }

    // Format seconds with leading zeros
    elapsedSeconds = elapsedSeconds < 10 ? `0${elapsedSeconds}` : elapsedSeconds;
}

setInterval(initializeTimer, 1000);

// Close notification pop-up
const notificationBox = document.getElementById("notice-wrap");
const closeIcon = document.getElementById("closeX");

closeIcon.addEventListener("click", hideNotification);

function hideNotification() {
    notificationBox.style.display = "none";
}

// Fetch and process JSON data for visualizations
queue()
    .defer(d3.json, "data/data.json")
    .defer(d3.json, "data/data2.json")
    .defer(d3.json, "data/data3.json")
    .defer(d3.json, "data/data4.json")
    .await(processData);

// Main visualization function
function processData(error, data1, data2, data3, data4) {
    renderChart1(error, data1);
    renderChart2(error, data2);
    renderChart3(error, data3);
    renderChart4(error, data4);

    dc.renderAll();
}

// GDP and Gini Visualizations
function renderChart1(error, gdpData) {
    const gdpFilter = crossfilter(gdpData);
    const countryDimension = gdpFilter.dimension(dc.pluck('country'));

    const gdpGroup = countryDimension.group().reduceSum(dc.pluck('gdp'));
    dc.barChart('#gdp-per-capita-chart')
        .width(725)
        .height(270)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(countryDimension)
        .group(gdpGroup)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel('Country')
        .yAxisLabel('GDP Per Capita ($)')
        .yAxis().ticks(8);

    const giniGroup = countryDimension.group().reduceSum(dc.pluck('gini-coefficient'));
    dc.barChart('#gini-coefficient-chart')
        .width(725)
        .height(270)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(countryDimension)
        .group(giniGroup)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel('Country')
        .yAxisLabel('Gini Coefficient')
        .yAxis().ticks(8);
}

// Unemployment by Gender Visualization
function renderChart2(error, genderData) {
    const genderFilter = crossfilter(genderData);
    const genderDimension = genderFilter.dimension(dc.pluck('gender'));
    const genderGroup = genderDimension.group().reduceSum(dc.pluck('totalUnemploymentRate'));

    dc.pieChart("#gender-unemployment-rate-pie-chart")
        .height(330)
        .radius(90)
        .transitionDuration(1500)
        .dimension(genderDimension)
        .group(genderGroup);
}

// Meal Costs by Country
function renderChart3(error, costData) {
    const costFilter = crossfilter(costData);
    const countryDimension = costFilter.dimension(dc.pluck('countryCostsData'));
    const costGroup = countryDimension.group().reduceSum(dc.pluck('price'));

    dc.barChart('#costs-of-meals-chart')
        .width(725)
        .height(270)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(countryDimension)
        .group(costGroup)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel('Country')
        .yAxisLabel('Price of Food ($)')
        .yAxis().ticks(4);
}

// Unemployment Trends by Gender
function renderChart4(error, unemploymentData) {
    const unempFilter = crossfilter(unemploymentData);

    unemploymentData.forEach(d => {
        d.year = new Date(d.year);
    });

    const yearDimension = unempFilter.dimension(dc.pluck('year'));

    const femaleGroups = ['DRC', 'MZ', 'UG', 'TJ', 'YE', 'HT', 'ET', 'TZ', 'KG', 'UZ']
        .map(country => yearDimension.group().reduceSum(d => d.unemploymentRateCountry === country ? +d.femaleUnemploymentRate : 0));

    const maleGroups = ['DRC', 'MZ', 'UG', 'TJ', 'YE', 'HT', 'ET', 'TZ', 'KG', 'UZ']
        .map(country => yearDimension.group().reduceSum(d => d.unemploymentRateCountry === country ? +d.maleUnemploymentRate : 0));

    dc.compositeChart('#unemployment-rate-female')
        .width(768)
        .height(480)
        .x(d3.scale.linear().domain([2015, 2018]))
        .yAxisLabel("Unemployment Rate")
        .xAxisLabel("Year")
        .legend(dc.legend().x(580).y(13).itemHeight(20).gap(5))
        .renderHorizontalGridLines(true)
        .compose(femaleGroups.map((group, i) => dc.lineChart().dimension(yearDimension).group(group).colors(d3.schemeCategory10[i])))
        .brushOn(false)
        .render();

    dc.compositeChart('#unemployment-rate-male')
        .width(768)
        .height(480)
        .x(d3.scale.linear().domain([2015, 2018]))
        .yAxisLabel("Unemployment Rate")
        .xAxisLabel("Year")
        .legend(dc.legend().x(580).y(13).itemHeight(20).gap(5))
        .renderHorizontalGridLines(true)
        .compose(maleGroups.map((group, i) => dc.lineChart().dimension(yearDimension).group(group).colors(d3.schemeCategory10[i])))
        .brushOn(false)
        .render();
}
