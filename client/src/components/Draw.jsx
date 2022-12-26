import React, {useState, useEffect} from 'react';

const Draw = function({data}) {
  const [ctx, setContext] = useState(null);

  var mountCanvas = function() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    setContext(context);
  };

  var draw = function() {
    if (data.length === 0) {
      return;
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'rgb(134 100 145)';

    var yMin = 0;
    var yMax = null;

    let [cw, ch] = [ctx.canvas.offsetWidth, ctx.canvas.offsetHeight];
    let spacing  = cw/data.length;

    console.log(data.length, cw, spacing);

    data.map(function(entry) {
      if (!yMax) {
        yMax = entry.open;
      }

      if (entry.open > yMax) {
        yMax = entry.open;
      }
    })

    var diff = yMax - yMin;
    var yScale = 0.01;

    if (diff > 1) {
      yScale = 0.1;
    }

    if (diff > 10) {
      yScale = 1;
    }

    var yInc   = 1;
    var yTicks = Math.ceil(yMax/yScale) + 1;
    var ySpace = Math.floor(ch/yTicks);

    if (yTicks > 20) {
      yTicks = Math.ceil(yTicks/5);
      ySpace *= 5;
      yInc = 5;
    }

    for (var i = 0; i < yTicks; i++) {
      var brX = ctx.canvas.width - 12;
      var brY = ctx.canvas.height - 12;
      var tickY = brY - (i * ySpace);

      ctx.fillRect(12, brY, ctx.canvas.width - 24, 1);
      //ctx.fillRect(brX - 12, tickY, 4, 1);
      var tick = yScale * yInc * i;

      if (yScale === 0.01 || yScale === 0.1) {
        tick = tick.toFixed(2);
      }

      if (i !== 0) {
        ctx.fillText(tick, brX - 12, tickY + 4);
      }
    }
  };

  useEffect(mountCanvas, []);
  useEffect(draw, [data]);

  return (
    <canvas id='canvas'/>
  )
}

export default Draw;