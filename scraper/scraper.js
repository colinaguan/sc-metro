const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const weekday = "https://www.scmtd.com/en/routes/schedule/20201/10/wd";
const weekend = "https://www.scmtd.com/en/routes/schedule/20201/10/we";
const operateApi = "https://www.scmtd.com/en/?option=com_schedule&task=optoday&format=raw&route=10";
const scheduleApi = "https://www.scmtd.com/en/?option=com_schedule&task=picker&format=raw&bkg=20201&route=10&schedule=wd";

let getData = (wd, we, opApi, schApi) => {

  var data = [];
  const $ = cheerio.load(wd);
  const $$ = cheerio.load(we);
  const $$$ = cheerio.load(opApi);
  const $$$$ = cheerio.load(schApi);

  var operatingText = $$$('.header4').text();

  var fullRouteName = $('span[id=scheduleRouteTitle]').text().split(' - ');

  var twoWay = false;
  var scheduleOpt = $$$$('select[id=schedule_direction]').children()[0];
  scheduleOpt = $$$$(scheduleOpt).text();
  if (scheduleOpt.includes("Outbound") || scheduleOpt.includes("Inbound")) {
    twoWay = true;
  }

  var stops = [];
  $('table.schedule thead tr th div small').each((i, elem) => {
    if ($(elem).text() !== "Time Point") {
      var stopName = $(elem).html().toString();
      stopName = stopName.replace("&amp;", "&");
      stops.push(stopName);
    }
  });

  var wdTimetable = [];
  $('table.schedule tbody tr').each((i, elem) => {
    row = [];
    $(elem).children().each((k, e) => {
      var text = $(e).text();
      if (text.endsWith(' trip'))
        row.push(text.substring(0, text.length - 5))
      else
        row.push(text)
    })
    wdTimetable.push(row);
  });

  var weTimetable = [];
  $$('table.schedule tbody tr').each((i, elem) => {
    row = [];
    $(elem).children().each((k, e) => {
      var text = $(e).text();
      if (text.endsWith(' trip'))
        row.push(text.substring(0, text.length - 5))
      else
        row.push(text)
    })
    weTimetable.push(row);
  });

  var weekday = [];
  var weekend = [];

  for (var i = 0; i < stops.length; i++) {
    var times = wdTimetable[i]
    var st = (times[0] === 'ST') ? true : false;

    var operating =
      (!st || st && !operatingText.endsWith('NOT Operating')) ? true : false;

    var wdDepartures = [];
    wdTimetable.forEach((elem) => {
      wdDepartures.push(elem[1 + i]);
    });

    var weDepartures = [];
    weTimetable.forEach((elem) => {
      weDepartures.push(elem[1 + i]);
    });

    weekday.push({
      stop: stops[i],
      departures: wdDepartures,
      schoolTerm: st,
      operating: operating
    });

    weekend.push({
      stop: stops[i],
      departures: weDepartures,
      schoolTerm: false,
      operating: true
    })
  }

  data.push({
    route: fullRouteName[0],
    label: fullRouteName[1],
    twoWay: twoWay,
    inbound: {
      weekday: weekday,
      weekend: weekend
    },
    outbound: {}
  })

  // console.log(data);
  // console.log(weekday);
  // console.log(weekend);

  // write data to .json file
  let jsonString = JSON.stringify(data);
  fs.writeFileSync('./output.json', jsonString, 'utf-8');

  // no database implementation yet
}

axios.all([
  axios.get(weekday),
  axios.get(weekend),
  axios.get(operateApi),
  axios.get(scheduleApi)
])
  .then(axios.spread((wdRes, wkRes, apiRes, schRes) => {
    getData(wdRes.data, wkRes.data, apiRes.data, schRes.data);
  }))
  .catch((err) => {
    console.log(err);
  });