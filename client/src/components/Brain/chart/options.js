var colors = {
  yellow1: 'rgb(230, 195, 130)',
  yellow2: 'rgb(232, 193, 121)',
  purple1: 'rgb(134, 100, 145)',
  purple2: 'rgb(75, 54, 82)',
};

const colorize = function() {
  return (ctx) => {
    var open  = ctx.raw[0];
    var close = ctx.raw[1];

    if (open > close) {
      return colors.purple1;
    }

    return colors.yellow1;
  };
};

const scales = {
  x: {
    ticks: {
      align: 'center',
      color: colors.purple1
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
      color: colors.purple1
    },
    border: {
      display: false
    },
    grid: {
      color: colors.purple2
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
    borderWidth: 0,
    borderSkipped: false,
    backgroundColor: colorize()
  },
  line: {
    ...baseOptions,

    fill: false,
    radius: 0,
    borderWidth: 1,
    borderColor: colors.yellow1
  }
};

export default options;