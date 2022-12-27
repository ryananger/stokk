import React, {useState, useEffect} from 'react';

const Draw = function({data}) {
  const [ctx, setContext] = useState(null);

  var mountCanvas = function() {
    var canvas = document.getElementById('canvas');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    var context = canvas.getContext('2d');


    setContext(context);
  };

  var drawXaxis = function(box) {
    var onYear, onMonth;

    var xWidth = ctx.canvas.width - 24;
    var xSpace = Math.floor(xWidth/box.data.length);

    var brX = ctx.canvas.width - 48;

    box.data.map(function(entry, i) {
      let year  = Number(entry.date.slice(0, 4));
      let month = Number(entry.date.slice(5, 7));
      let day   = Number(entry.date.slice(8));

      onYear  = !onYear  ? year : onYear;
      onMonth = !onMonth ? month : onMonth;

      if (box.data[i + 1]) {
        let mNext = Number(box.data[i + 1].date.slice(5, 7));

        if (mNext !== month) {
          ctx.fillText(month, brX - (xSpace * i) - 12, box.h + 20);
        }
      }

      ctx.fillText(day, brX - (xSpace * i), box.h + 12);
    })
  };

  var drawYaxis = function(box) {
    var yMin = null;
    var yMax = null;

    box.data.map(function(entry) {
      if (!yMin) {
        yMin = entry.open;
      }

      if (!yMax) {
        yMax = entry.open;
      }

      if (entry.open < yMin) {
        yMin = entry.open;
      }

      if (entry.open > yMax) {
        yMax = entry.open;
      }
    });

    var diff = yMax - yMin;
    var yScale = 0.01;

    if (diff > 1) {
      yScale = 0.1;
    }

    if (diff > 2) {
      yScale = 0.25;
    }

    if (diff > 10) {
      yScale = 1;
    }

    if (diff > 100) {
      yScale = 10;
    }

    var yInc   = 1;
    var yTicks = Math.ceil(diff/yScale) + 1;
    var ySpace = Math.floor(box.h/yTicks);

    if (yTicks > 20) {
      yTicks = Math.ceil(yTicks/5);
      ySpace *= 5;
      yInc = 5;
    }

    var yTop, yBot;
    // draw y-axis ticks;
    for (var i = 0; i < yTicks; i++) {
      var tickY = box.h - (i * ySpace);
      var tick = (yScale * yInc * i) + (yMin - yScale);

      tick = Math.floor((tick*100)/10)/10;

      if (yScale === 0.01 || yScale === 0.1) {
        tick = tick.toFixed(2);
      }

      if (i !== 0 && tickY > 12) {
        ctx.fillText(tick, box.w - 24, tickY + 4);
      };

      switch (i) {
        case 0:
          yBot = tick;
          break;
        case yTicks - 1:
          yTop = tick;
          break;
      }
    }

    box.min = yBot;
    box.max = yTop;
    box.range = yTop - yBot;
    box.ySpace = box.range/box.h;
  };

  var plot = function(box) {
    box.data.map(function(entry, i) {
      var plotY = (entry.open - box.min)/box.ySpace;

      ctx.fillRect(box.w - 36 - (i * box.xSpace), box.h - plotY, 4, 4);
      ctx.fillText(entry.open, box.w - 36 - (i * box.xSpace), box.h - plotY + 16);
    })
  };

  var draw = function() {
    if (data.length === 0) {
      return;
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'rgb(134 100 145)';

    var box = {
      x: 12,
      y: 12,
      w: ctx.canvas.width  - 12,
      h: ctx.canvas.height - 30,
      data: data.slice(0, 30),
      min: null,
      max: null
    };

    box.xSpace = Math.floor(box.w/box.data.length);

    ctx.fillRect(box.x, box.y, box.w - 12, 1);
    ctx.fillRect(box.x, box.h, box.w - 12, 1);
    ctx.fillRect(box.x, box.y, 1, box.h - 12);
    ctx.fillRect(box.w, box.y, 1, box.h - 12);

    drawXaxis(box);
    drawYaxis(box);
    plot(box);

    console.log(box)
  };

  useEffect(mountCanvas, []);
  useEffect(draw, [data]);

  return (
    <canvas id='canvas'/>
  )
}

export default Draw;