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

const options = {
  bar: {
    minBarLength: 5,
    borderWidth: 1,
    borderSkipped: false,
    backgroundColor: colorize(),
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        reverse: true,
        ticks: {
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
    }
  },
  line: {
    fill: false,
    radius: 0,
    borderWidth: 1,
    borderColor: yellow,
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        reverse: true,
        ticks: {
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
    }
  }
};

export default options;