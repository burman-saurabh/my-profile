function showCovidScreen() {
    event.preventDefault();
    // console.log(window.getComputedStyle(document.getElementsByClassName('chart-container')[0]).display);
    let el = document.getElementsByClassName('chart-container')[0];
    el.style.display = 'block';
    populateCountryDropdown();
}

function hideChartContainer() {
    let el = document.getElementsByClassName('chart-container')[0];
    el.style.display = 'none';
}

function populateCountryDropdown() {
    fetch("https://api.covid19api.com/countries", {
            method: 'GET',
            // headers: myHeaders,
            redirect: 'follow'
        })
        .then(response => response.json())
        .then(
            result => {
                result.sort(function (a, b) {
                    let ca = a.Country.toLowerCase(),
                        cb = b.Country.toLowerCase();

                    if (ca < cb) {
                        return -1;
                    }
                    if (ca > cb) {
                        return 1;
                    }
                    return 0;
                });
                console.log(result);

                let dropdownElement = document.getElementById('countryId');
                result.forEach((value, index, arr) => {
                    let option = document.createElement('option');
                    option.value = value.Slug;
                    option.innerHTML = value.Country
                    dropdownElement.appendChild(option);
                })

                updateChart();
            }
        )
        .catch(error => console.log('error', error));
}


let country;
let timeRange;
let caseType;

let dataArray;

let myChartLine;
let myChartBar;

console.log(document.getElementById('timeRangeId').value);

function updateChart() {
    country = document.getElementById('countryId').value;
    timeRange = document.getElementById('timeRangeId').value
    caseType = document.getElementById('caseTypeId').value;

    // https://api.covid19api.com/total/dayone/country/india/status/confirmed
    // https://api.covid19api.com/summary
    // https://api.covid19api.com/world

    if (country === 'Worldwide') {
        fetch("https://api.covid19api.com/world", {
                method: 'GET',
                // headers: myHeaders,
                redirect: 'follow'
            })
            .then(response => response.json())
            .then(
                result => {
                    let sortedData = result.sort(function (a, b) {
                        return new Date(a.Date) - new Date(b.Date)
                    });
                    console.log(sortedData);
                    dataArray = sortedData;
                    // let firstDayOfMonthDataArray = sortedData.filter(function (item) {
                    //     return new Date(item.Date).getUTCDate() === 1;
                    // });
                    // console.log(firstDayOfMonthDataArray);
                    createCharts(timeRange, caseType);
                    [...document.getElementsByTagName('canvas')].forEach((el) => {
                        el.style.visibility = 'visible';
                    });
                    document.getElementById('loading').style.display = 'none';
                }
            )
            .catch(error => console.log('error', error));
    } else {
        fetch(`https://api.covid19api.com/dayone/country/${country}`, {
                method: 'GET',
                // headers: myHeaders,
                redirect: 'follow'
            })
            .then(response => response.json())
            .then(
                result => {
                    let sortedData = result.sort(function (a, b) {
                        return new Date(a.Date) - new Date(b.Date)
                    });
                    dataArray = sortedData.map((value, index, arr) => {
                        let obj = {};
                        obj['Country'] = value.Country;
                        obj['Date'] = value.Date;
                        obj['TotalConfirmed'] = value.Confirmed;
                        obj['TotalDeaths'] = value.Deaths;
                        obj['TotalRecovered'] = value.Recovered;
                        if (index === 0) {
                            obj['NewConfirmed'] = value.Confirmed;
                            obj['NewDeaths'] = value.Deaths;
                            obj['NewRecovered'] = value.Recovered;
                        } else {
                            obj['NewConfirmed'] = value.Confirmed - arr[index - 1].Confirmed;
                            obj['NewDeaths'] = value.Deaths - arr[index - 1].Deaths;
                            obj['NewRecovered'] = value.Recovered - arr[index - 1].Recovered;
                        }

                        return obj;
                    });

                    console.log(dataArray);
                    createCharts(timeRange, caseType);
                    [...document.getElementsByTagName('canvas')].forEach((el) => {
                        el.style.visibility = 'visible';
                    });
                    document.getElementById('loading').style.display = 'none';
                }
            )
            .catch(error => console.log('error', error));
    }

}




function createCharts(timeRange, caseType) {
    // let monthCountMap = new Map();

    // dataArray.forEach(value => {
    //     let date = new Date(value.Date);
    //     let month = date.getUTCMonth();
    //     let year = date.getUTCFullYear();
    //     monthCountMap.set(`${monthsEnum[month]}, ${year}`, {
    //         'TotalConfirmed': value.TotalConfirmed,
    //         'TotalDeaths': value.TotalDeaths,
    //         'TotalRecovered': value.TotalRecovered,
    //         'NewConfirmed': value.NewConfirmed,
    //         'NewDeaths': value.NewDeaths,
    //         'NewRecovered': value.NewRecovered
    //     });
    // });

    if (timeRange !== 'allTime') {
        dataArray = dataArray.slice(-timeRange);
        console.log(dataArray);
    }

    let labels = dataArray.map(value => {
        return value.Date.substr(0, value.Date.indexOf('T'));
    });

    let data;

    if (caseType === 'allCases') {
        let countsTotalConfirmed = dataArray.map(value => {
            return value.TotalConfirmed;
        });
        let countsTotalDeaths = dataArray.map(value => {
            return value.TotalDeaths;
        });
        let countsTotalRecovered = dataArray.map(value => {
            return value.TotalRecovered;
        });

        data = {
            labels: labels,
            datasets: [{
                label: `Total Confirmed Till Date : ${country}`,
                backgroundColor: 'lightblue',
                borderColor: 'blue',
                data: countsTotalConfirmed
            }, {
                label: `Total Deaths Till Date : ${country}`,
                backgroundColor: 'grey',
                borderColor: 'black',
                data: countsTotalDeaths
            }, {
                label: `Total Recovered Till Date : ${country}`,
                backgroundColor: 'lightgreen',
                borderColor: 'green',
                data: countsTotalRecovered
            }]
        };

    } else if (caseType === 'newCases') {
        console.log('okkkkkkkkkkkkk');
        let countsNewConfirmed = dataArray.map(value => {
            return value.NewConfirmed;
        });
        let countsNewDeaths = dataArray.map(value => {
            return value.NewDeaths;
        });
        let countsNewRecovered = dataArray.map(value => {
            return value.NewRecovered;
        });

        data = {
            labels: labels,
            datasets: [{
                label: `New Confirmed On Date : ${country}`,
                backgroundColor: 'lightblue',
                borderColor: 'blue',
                data: countsNewConfirmed
            }, {
                label: `New Deaths on Date : ${country}`,
                backgroundColor: 'grey',
                borderColor: 'black',
                data: countsNewDeaths
            }, {
                label: `New Recovered on Date: ${country}`,
                backgroundColor: 'lightgreen',
                borderColor: 'green',
                data: countsNewRecovered
            }]
        };
    }

    let configLine = {
        type: 'line',
        data,
        options: {}
    };
    // let configBar = {
    //     type: 'bar',
    //     data,
    //     options: {}
    // };
    // let configDoughnut = {
    //     type: 'doughnut',
    //     data,
    //     options: {}
    // };

    if (myChartLine) {
        myChartLine.destroy();
    }
    // if (myChartBar) {
    //     myChartBar.destroy();
    // }

    myChartLine = new Chart(
        document.getElementById('myChartLine'),
        configLine
    );
    // myChartBar = new Chart(
    //     document.getElementById('myChartBar'),
    //     configBar
    // );
    // let myChartDoughnut = new Chart(
    //     document.getElementById('myChartDoughnut'),
    //     configDoughnut
    // );

}