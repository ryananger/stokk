var yellow  = 'rgb(230, 195, 130)';
var purple  = 'rgb(134, 100, 145)';
var purple2 = 'rgb(75, 54, 82)';

const colorize = function() {
  return (ctx) => {
    var open  = ctx.raw[0];
    var close = ctx.raw[1];

    if (open > close) {
      return purple;
    }

    return yellow;
  };
};

const scales = {
  x: {
    reverse: true,
    ticks: {
      align: 'center',
      color: purple
    },
    border: {
      display: false
    },
    grid: {
      display: false
    }
  },
  y: {
    position: 'right',
    ticks: {
      color: purple
    },
    border: {
      display: false
    },
    grid: {
      color: purple2
    }
  }
};

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  layout: {
    padding: 12
  },
  scales: scales
};

const options = {
  bar: {
    ...baseOptions,

    minBarLength: 5,
    borderWidth: 1,
    borderSkipped: false,
    backgroundColor: colorize()

  },
  line: {
    ...baseOptions,

    fill: false,
    radius: 0,
    borderWidth: 1,
    borderColor: yellow
  }
};

export default options;