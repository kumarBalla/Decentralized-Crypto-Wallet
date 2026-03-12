import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./TokenGraph.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const COINGECKO_IDS = {
  BTC: "bitcoin",
  ETH: "ethereum",
  BNB: "binancecoin",
  ADA: "cardano",
  SOL: "solana",
  DOGE: "dogecoin",
  XRP: "ripple",
  DOT: "polkadot",
  LTC: "litecoin",
  LINK: "chainlink",
  MATIC: "polygon",
  VET: "vechain",
  XLM: "stellar",
  UNI: "uniswap",
  THETA: "theta-token",
  AVAX: "avalanche",
  ATOM: "cosmos",
  ALGO: "algorand",
  XTZ: "tezos",
  EGLD: "elrond-erd-2",
};

const TokenGraph = () => {
  const { selectedCrypto } = useSelector((state) => state.crypto);
  const [chartData, setChartData] = useState(null);
  const [timeRange, setTimeRange] = useState("1d");
  const [stats, setStats] = useState({
    marketCap: 0,
    volume: 0,
    priceChange: 0,
    percentChange: 0,
    currentPrice: 0,
  });

  if (!selectedCrypto)
    return (
      <div className="token-graph-container">
        <p style={{ textAlign: "center", color: "#fff", padding: "20px" }}>
          Select a cryptocurrency to view its graph.
        </p>
      </div>
    );

  const generateMUSDGraph = () => {
    const labels = Array.from({ length: 30 }, (_, i) => `T-${30 - i}`);
    let lastPrice = 1;
    const dataPoints = labels.map(() => {
      lastPrice = +(lastPrice + (Math.random() - 0.5) * 0.01).toFixed(4);
      return lastPrice;
    });

    const priceChange = dataPoints[dataPoints.length - 1] - dataPoints[0];
    const percentChange =
      ((dataPoints[dataPoints.length - 1] - dataPoints[0]) / dataPoints[0]) * 100;

    setStats({
      marketCap: selectedCrypto.availableQuantity,
      volume: Math.floor(Math.random() * 1000),
      priceChange,
      percentChange,
      currentPrice: dataPoints[dataPoints.length - 1],
    });

    setChartData({
      labels,
      datasets: [
        {
          label: `${selectedCrypto.cryptoName} Price`,
          data: dataPoints,
          borderColor: "#4BC0C0",
          backgroundColor: "rgba(75,192,192,0.3)",
          fill: true,
          tension: 0.4,
        },
      ],
    });
  };

  const fetchCoinGeckoData = async (range) => {
    const symbol = selectedCrypto.cryptoSymbol.toUpperCase();

    if (symbol === "MUSD") {
      generateMUSDGraph();
      return;
    }

    try {
      const coingeckoId = COINGECKO_IDS[symbol];
      if (!coingeckoId) return;

      const daysMap = {
        "1d": 1,
        "1w": 7,
        "1m": 30,
        "1y": 365,
      };
      const days = daysMap[range] || 1;

      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coingeckoId}/market_chart?vs_currency=usd&days=${days}`
      );
      const data = await res.json();

      const prices = data.prices || [];
      const marketCaps = data.market_caps || [];
      const volumes = data.total_volumes || [];

      // Show only date on X-axis, but keep full timestamp for tooltip
      const labels = prices.map((p) => ({
        dateOnly: new Date(p[0]).toLocaleDateString(),
        fullTime: new Date(p[0]).toLocaleString(),
      }));

      const dataPoints = prices.map((p) => p[1]);
      const lastPrice = dataPoints[dataPoints.length - 1] || 0;
      const priceChange =
        dataPoints.length > 1 ? lastPrice - dataPoints[0] : 0;
      const percentChange =
        dataPoints.length > 1
          ? ((lastPrice - dataPoints[0]) / dataPoints[0]) * 100
          : 0;

      const lastMarketCap = marketCaps.length
        ? marketCaps[marketCaps.length - 1][1]
        : 0;
      const lastVolume = volumes.length ? volumes[volumes.length - 1][1] : 0;

      setStats({
        marketCap: lastMarketCap,
        volume: lastVolume,
        priceChange,
        percentChange,
        currentPrice: lastPrice,
      });

      setChartData({
        labels,
        datasets: [
          {
            label: `${selectedCrypto.cryptoName} Price (${range.toUpperCase()})`,
            data: dataPoints,
            borderColor: "#4BC0C0",
            backgroundColor: "rgba(75,192,192,0.3)",
            fill: true,
            tension: 0.4,
          },
        ],
      });
    } catch (err) {
      console.error("CoinGecko fetch error:", err);
    }
  };

  useEffect(() => {
    fetchCoinGeckoData(timeRange);
    const interval = setInterval(() => fetchCoinGeckoData(timeRange), 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [selectedCrypto, timeRange]);

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: "#ccc",
          // Show only the date on x-axis
          callback: function (value, index) {
            const label = chartData?.labels[index];
            return label?.dateOnly || "";
          },
        },
      },
      y: {
        ticks: { color: "#ccc" },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          // Show full date + time when hovering
          title: function (tooltipItems) {
            const label = tooltipItems[0]?.label;
            const realLabel = chartData?.labels[tooltipItems[0].dataIndex];
            return realLabel?.fullTime || label;
          },
        },
      },
      legend: { labels: { color: "#fff" } },
    },
  };

  return (
    <div className="token-graph-container full-width-graph">
      <div className="graph-header">
        <div className="header-left">
          <h2>{selectedCrypto.cryptoName}</h2>
          <p>Price: ${stats.currentPrice.toLocaleString()}</p>
        </div>
        <div className="header-right">
          {["1d", "1w", "1m", "1y"].map((range) => (
            <button
              key={range}
              className={`range-btn ${timeRange === range ? "active" : ""}`}
              onClick={() => setTimeRange(range)}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-wrapper full-width">
        {chartData ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <p style={{ color: "#ccc", textAlign: "center" }}>Loading chart...</p>
        )}
      </div>

      <div className="graph-stats-bottom">
        <p>Market Cap: ${stats.marketCap.toLocaleString()}</p>
        <p>Volume: ${stats.volume.toLocaleString()}</p>
        <p>
          Change: {stats.priceChange.toFixed(4)} ({stats.percentChange.toFixed(2)}%)
        </p>
      </div>
    </div>
  );
};

export default TokenGraph;
