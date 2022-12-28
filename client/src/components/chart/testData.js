const testData = [
{
    "ticker": "IBIO",
    "date": "2022-12-23",
    "open": 0.4309,
    "close": 0.4299,
    "high": 0.448,
    "low": 0.4,
    "volume": 191370,
    "vwap": 0.4266
},
{
    "ticker": "IBIO",
    "date": "2022-12-22",
    "open": 0.438,
    "close": 0.4257,
    "high": 0.4524,
    "low": 0.4201,
    "volume": 233450,
    "vwap": 0.4394
},
{
    "ticker": "IBIO",
    "date": "2022-12-21",
    "open": 0.412,
    "close": 0.451,
    "high": 0.4739,
    "low": 0.4101,
    "volume": 355191,
    "vwap": 0.4493
},
{
    "ticker": "IBIO",
    "date": "2022-12-20",
    "open": 0.4,
    "close": 0.4315,
    "high": 0.6,
    "low": 0.39,
    "volume": 2110324,
    "vwap": 0.4677
},
{
    "ticker": "IBIO",
    "date": "2022-12-19",
    "open": 0.4143,
    "close": 0.3961,
    "high": 0.4195,
    "low": 0.39,
    "volume": 230885,
    "vwap": 0.4051
},
{
    "ticker": "IBIO",
    "date": "2022-12-16",
    "open": 0.45,
    "close": 0.3884,
    "high": 0.4722,
    "low": 0.38,
    "volume": 867967,
    "vwap": 0.4327
},
{
    "ticker": "IBIO",
    "date": "2022-12-15",
    "open": 0.55,
    "close": 0.4522,
    "high": 0.5788,
    "low": 0.36,
    "volume": 2795380,
    "vwap": 0.4157
},
{
    "ticker": "IBIO",
    "date": "2022-12-14",
    "open": 0.615,
    "close": 0.55,
    "high": 0.615,
    "low": 0.55,
    "volume": 292097,
    "vwap": 0.5765
},
{
    "ticker": "IBIO",
    "date": "2022-12-13",
    "open": 0.595,
    "close": 0.59,
    "high": 0.63,
    "low": 0.56,
    "volume": 354795,
    "vwap": 0.5881
},
{
    "ticker": "IBIO",
    "date": "2022-12-12",
    "open": 0.6165,
    "close": 0.5719,
    "high": 0.65,
    "low": 0.56,
    "volume": 740408,
    "vwap": 0.5986
},
{
    "ticker": "IBIO",
    "date": "2022-12-09",
    "open": 0.6222,
    "close": 0.616,
    "high": 0.66,
    "low": 0.602,
    "volume": 575131,
    "vwap": 0.6242
},
{
    "ticker": "IBIO",
    "date": "2022-12-08",
    "open": 0.68,
    "close": 0.62,
    "high": 0.710101,
    "low": 0.5777,
    "volume": 1704370,
    "vwap": 0.6604
},
{
    "ticker": "IBIO",
    "date": "2022-12-07",
    "open": 0.8274,
    "close": 0.674,
    "high": 0.86,
    "low": 0.67,
    "volume": 3037773,
    "vwap": 0.7497
},
{
    "ticker": "IBIO",
    "date": "2022-12-06",
    "open": 1.67,
    "close": 1.6,
    "high": 1.71,
    "low": 1.58,
    "volume": 325906,
    "vwap": 1.0753
},
{
    "ticker": "IBIO",
    "date": "2022-12-05",
    "open": 1.79,
    "close": 1.68,
    "high": 1.79,
    "low": 1.66,
    "volume": 52755,
    "vwap": 1.7283
},
{
    "ticker": "IBIO",
    "date": "2022-12-02",
    "open": 1.57,
    "close": 1.7,
    "high": 1.76,
    "low": 1.5301,
    "volume": 96296,
    "vwap": 1.6704
},
{
    "ticker": "IBIO",
    "date": "2022-12-01",
    "open": 1.59,
    "close": 1.6,
    "high": 1.65,
    "low": 1.5545,
    "volume": 61789,
    "vwap": 1.5814
},
{
    "ticker": "IBIO",
    "date": "2022-11-30",
    "open": 1.49,
    "close": 1.54,
    "high": 1.569,
    "low": 1.48,
    "volume": 42144,
    "vwap": 1.5115
},
{
    "ticker": "IBIO",
    "date": "2022-11-29",
    "open": 1.53,
    "close": 1.52,
    "high": 1.5521,
    "low": 1.5,
    "volume": 30645,
    "vwap": 1.5246
},
{
    "ticker": "IBIO",
    "date": "2022-11-28",
    "open": 1.59,
    "close": 1.49,
    "high": 1.6,
    "low": 1.49,
    "volume": 33800,
    "vwap": 1.5459
},
    {
      "ticker": "RKT",
      "date": "2022-12-22",
      "open": 7.5,
      "close": 7.43,
      "high": 7.52,
      "low": 7.21,
      "volume": 2242406,
      "vwap": 7.3454
    },
    {
      "ticker": "RKT",
      "date": "2022-12-21",
      "open": 7.75,
      "close": 7.54,
      "high": 7.78,
      "low": 7.46,
      "volume": 3141678,
      "vwap": 7.5757
    },
    {
      "ticker": "RKT",
      "date": "2022-12-20",
      "open": 7.74,
      "close": 7.65,
      "high": 7.835,
      "low": 7.64,
      "volume": 2400615,
      "vwap": 7.6979
    },
    {
      "ticker": "RKT",
      "date": "2022-12-19",
      "open": 7.96,
      "close": 7.88,
      "high": 8.015,
      "low": 7.82,
      "volume": 2202055,
      "vwap": 7.9088
    },
    {
      "ticker": "RKT",
      "date": "2022-12-16",
      "open": 7.83,
      "close": 7.96,
      "high": 8.01,
      "low": 7.82,
      "volume": 5042422,
      "vwap": 7.9207
    },
    {
      "ticker": "RKT",
      "date": "2022-12-15",
      "open": 8.1,
      "close": 8,
      "high": 8.16,
      "low": 7.93,
      "volume": 3406847,
      "vwap": 7.9947
    },
    {
      "ticker": "RKT",
      "date": "2022-12-14",
      "open": 8.4,
      "close": 8.19,
      "high": 8.45,
      "low": 8.115,
      "volume": 2821908,
      "vwap": 8.2547
    },
    {
      "ticker": "RKT",
      "date": "2022-12-13",
      "open": 8.82,
      "close": 8.47,
      "high": 9.245,
      "low": 8.43,
      "volume": 5751419,
      "vwap": 8.6726
    },
    {
      "ticker": "RKT",
      "date": "2022-12-12",
      "open": 8.27,
      "close": 8.49,
      "high": 8.525,
      "low": 8.17,
      "volume": 1866596,
      "vwap": 8.4295
    },
    {
      "ticker": "RKT",
      "date": "2022-12-09",
      "open": 8.41,
      "close": 8.27,
      "high": 8.575,
      "low": 8.26,
      "volume": 1399297,
      "vwap": 8.3868
    },
    {
      "ticker": "RKT",
      "date": "2022-12-08",
      "open": 8.38,
      "close": 8.5,
      "high": 8.64,
      "low": 8.23,
      "volume": 2167791,
      "vwap": 8.4756
    },
    {
      "ticker": "RKT",
      "date": "2022-12-07",
      "open": 8.24,
      "close": 8.31,
      "high": 8.49,
      "low": 8.07,
      "volume": 2170826,
      "vwap": 8.3085
    },
    {
      "ticker": "RKT",
      "date": "2022-12-06",
      "open": 8.84,
      "close": 8.26,
      "high": 8.85,
      "low": 7.975,
      "volume": 3531009,
      "vwap": 8.2184
    },
    {
      "ticker": "RKT",
      "date": "2022-12-05",
      "open": 8.53,
      "close": 8.25,
      "high": 8.9,
      "low": 8.2,
      "volume": 3444951,
      "vwap": 8.531
    },
    {
      "ticker": "RKT",
      "date": "2022-12-02",
      "open": 8.3,
      "close": 8.41,
      "high": 8.43,
      "low": 8.2,
      "volume": 3276778,
      "vwap": 8.3416
    },
    {
      "ticker": "RKT",
      "date": "2022-12-01",
      "open": 8.36,
      "close": 8.54,
      "high": 8.65,
      "low": 8.16,
      "volume": 3417348,
      "vwap": 8.479
    },
    {
      "ticker": "RKT",
      "date": "2022-11-30",
      "open": 7.82,
      "close": 8.3,
      "high": 8.32,
      "low": 7.61,
      "volume": 3778619,
      "vwap": 8.0555
    },
    {
      "ticker": "RKT",
      "date": "2022-11-29",
      "open": 7.6,
      "close": 7.83,
      "high": 7.9,
      "low": 7.6,
      "volume": 1794551,
      "vwap": 7.7993
    },
    {
      "ticker": "RKT",
      "date": "2022-11-28",
      "open": 7.66,
      "close": 7.6,
      "high": 7.76,
      "low": 7.44,
      "volume": 2328931,
      "vwap": 7.565
    }
  ]

export default testData;