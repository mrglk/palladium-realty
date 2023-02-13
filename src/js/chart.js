const chartData = {
  2013: {
    cost: {
      uae: 1600,
      turkey: 4300,
      spain: 7400
    },
    increase: {
      uae: 20,
      turkey: 20,
      spain: 10,
    },
  },
  2018: {
    cost: {
      uae: 3150,
      turkey: 5400,
      spain: 10500
    },
    increase: {
      uae: 90,
      turkey: 40,
      spain: 40,
    },
  },
  2023: {
    cost: {
      uae: 4500,
      turkey: 6000,
      spain: 9000
    },
    increase: {
      uae: 120,
      turkey: 50,
      spain: 50,
    },
  },
  2028: {
    cost: {
      uae: 7700,
      turkey: 7800,
      spain: 11700
    },
    increase: {
      uae: 160,
      turkey: 80,
      spain: 60,
    },
  },
  2033: {
    cost: {
      uae: 10000,
      turkey: 8600,
      spain: 12900
    },
    increase: {
      uae: 190,
      turkey: 90,
      spain: 70,
    },
  },
};

const chartDates = document.querySelector('.js-range-dates');

const chartOverlay = document.querySelector('.js-chart-overlay');
const chartRange = document.querySelector('.js-chart-range');

const pricePlaceTurkey = document.querySelector('.js-chart-price-turkey');
const pricePlaceUae = document.querySelector('.js-chart-price-uae');
const pricePlaceSpain = document.querySelector('.js-chart-price-spain');

const increasePlaceTurkey = document.querySelector('.js-chart-increase-turkey');
const increasePlaceUae = document.querySelector('.js-chart-increase-uae');
const increasePlaceSpain = document.querySelector('.js-chart-increase-spain');

const chartController = document.querySelector('.js-chart-controller');

export function initChart() {
  if (!chartRange || !chartOverlay) {
    return;
  }

  chartDates.addEventListener('click', function(e) {
    const value = Number(e.target.innerText)

    if (value > 0) {
      chartRange.value = value
      setChartPosition(value)
    }
  })

  chartRange.addEventListener('input', function(e) {
    const value = e.target.value;

    setChartPosition(value)
  });
}


function setChartPosition(value) {
  const currentPercent = (value - chartRange.min) / (chartRange.max - chartRange.min) * 100;

  chartOverlay.style.width = `${currentPercent}%`;

  chartController.style.height = `${currentPercent * 1.2}%`;
  chartController.style.left = `${currentPercent}%`;

  pricePlaceTurkey.innerText = chartData[value].cost.turkey;
  pricePlaceUae.innerText = chartData[value].cost.uae;
  pricePlaceSpain.innerText = chartData[value].cost.spain;

  increasePlaceTurkey.innerText = chartData[value].increase.turkey
  increasePlaceUae.innerText = chartData[value].increase.uae
  increasePlaceSpain.innerText = chartData[value].increase.spain
}