type Candle = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

const demoCandles: Candle[] = [
  { time: "09:15", open: 24782, high: 24798, low: 24768, close: 24792, volume: 34 },
  { time: "09:20", open: 24792, high: 24808, low: 24784, close: 24801, volume: 42 },
  { time: "09:25", open: 24801, high: 24806, low: 24776, close: 24784, volume: 29 },
  { time: "09:30", open: 24784, high: 24817, low: 24781, close: 24812, volume: 56 },
  { time: "09:35", open: 24812, high: 24822, low: 24802, close: 24808, volume: 38 },
  { time: "09:40", open: 24808, high: 24834, low: 24802, close: 24828, volume: 63 },
  { time: "09:45", open: 24828, high: 24837, low: 24811, close: 24817, volume: 45 },
  { time: "09:50", open: 24817, high: 24849, low: 24812, close: 24844, volume: 74 },
  { time: "09:55", open: 24844, high: 24858, low: 24831, close: 24838, volume: 52 },
  { time: "10:00", open: 24838, high: 24862, low: 24829, close: 24856, volume: 66 },
  { time: "10:05", open: 24856, high: 24868, low: 24841, close: 24848, volume: 48 },
  { time: "10:10", open: 24848, high: 24878, low: 24844, close: 24873, volume: 81 },
  { time: "10:15", open: 24873, high: 24883, low: 24859, close: 24864, volume: 59 },
  { time: "10:20", open: 24864, high: 24893, low: 24858, close: 24886, volume: 88 },
  { time: "10:25", open: 24886, high: 24896, low: 24868, close: 24874, volume: 61 },
  { time: "10:30", open: 24874, high: 24904, low: 24870, close: 24898, volume: 92 },
  { time: "10:35", open: 24898, high: 24911, low: 24882, close: 24889, volume: 72 },
  { time: "10:40", open: 24889, high: 24918, low: 24884, close: 24909, volume: 98 },
  { time: "10:45", open: 24909, high: 24915, low: 24890, close: 24897, volume: 76 },
  { time: "10:50", open: 24897, high: 24920, low: 24891, close: 24914, volume: 89 },
  { time: "10:55", open: 24914, high: 24917, low: 24894, close: 24901, volume: 64 },
  { time: "11:00", open: 24901, high: 24924, low: 24896, close: 24918, volume: 85 },
];

const chart = {
  left: 12,
  right: 692,
  top: 12,
  bottom: 226,
  volumeTop: 252,
  volumeBottom: 306,
};

const minimumPrice = 24750;
const maximumPrice = 24940;
const maximumVolume = Math.max(...demoCandles.map((candle) => candle.volume));

function yForPrice(price: number) {
  return chart.bottom - ((price - minimumPrice) / (maximumPrice - minimumPrice)) * (chart.bottom - chart.top);
}

export function CandlestickChart({ compact = false }: { compact?: boolean }) {
  const candleWidth = Math.max(8, Math.min(14, (chart.right - chart.left) / demoCandles.length * 0.48));
  const priceTicks = [24920, 24880, 24840, 24800, 24760];
  const timeTicks = [0, 5, 10, 15, 20];
  const candleStep = (chart.right - chart.left) / demoCandles.length;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#07131f]">
      <div className="flex items-center justify-between border-b border-slate-800 px-3 py-2 text-[10px] uppercase tracking-[0.14em]">
        <span className="text-slate-400">NIFTY 50 · 5m</span>
        <span className="rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 font-medium text-cyan-300">DEMO DATA</span>
      </div>
      <div className={compact ? "px-2 py-2" : "px-2 py-3"}>
        <svg
          viewBox="0 0 760 336"
          className="h-auto w-full"
          role="img"
          aria-label="Illustrative NIFTY candlestick chart with volume bars using demo data"
        >
          <rect x="0" y="0" width="760" height="336" fill="#07131f" />
          {priceTicks.map((tick) => {
            const y = yForPrice(tick);
            return (
              <g key={tick}>
                <line x1={chart.left} x2={chart.right} y1={y} y2={y} stroke="#243244" strokeDasharray="3 5" />
                <text x="706" y={y + 4} fill="#8493a7" fontSize="11">{tick.toLocaleString("en-IN")}</text>
              </g>
            );
          })}

          <line x1={chart.left} x2={chart.right} y1={yForPrice(24800)} y2={yForPrice(24800)} stroke="#38bdf8" strokeOpacity="0.65" strokeDasharray="5 5" />
          <line x1={chart.left} x2={chart.right} y1={yForPrice(24760)} y2={yForPrice(24760)} stroke="#00d6a0" strokeOpacity="0.65" strokeDasharray="5 5" />
          <text x="17" y={yForPrice(24800) - 5} fill="#7dd3fc" fontSize="9">RESISTANCE</text>
          <text x="17" y={yForPrice(24760) - 5} fill="#6ee7b7" fontSize="9">SUPPORT</text>

          {demoCandles.map((candle, index) => {
            const x = chart.left + index * candleStep + candleStep / 2;
            const openY = yForPrice(candle.open);
            const closeY = yForPrice(candle.close);
            const rising = candle.close >= candle.open;
            const color = rising ? "#00d6a0" : "#fb7185";
            const bodyTop = Math.min(openY, closeY);
            const bodyHeight = Math.max(2, Math.abs(closeY - openY));
            const volumeHeight = (candle.volume / maximumVolume) * (chart.volumeBottom - chart.volumeTop);

            return (
              <g key={candle.time}>
                <line x1={x} x2={x} y1={yForPrice(candle.high)} y2={yForPrice(candle.low)} stroke={color} strokeWidth="1.5" />
                <rect
                  x={x - candleWidth / 2}
                  y={bodyTop}
                  width={candleWidth}
                  height={bodyHeight}
                  fill={rising ? color : "#fb7185"}
                  stroke={color}
                  rx="1"
                />
                <rect
                  x={x - candleWidth / 2}
                  y={chart.volumeBottom - volumeHeight}
                  width={candleWidth}
                  height={volumeHeight}
                  fill={color}
                  fillOpacity="0.42"
                  rx="1"
                />
              </g>
            );
          })}

          <line x1={chart.left} x2={chart.right} y1={chart.volumeTop - 7} y2={chart.volumeTop - 7} stroke="#243244" />
          {timeTicks.map((index) => {
            const x = chart.left + index * candleStep + candleStep / 2;
            return (
              <text key={demoCandles[index].time} x={x} y="327" fill="#8493a7" fontSize="10" textAnchor="middle">
                {demoCandles[index].time}
              </text>
            );
          })}
          <text x="17" y="246" fill="#8493a7" fontSize="9">VOLUME</text>
        </svg>
      </div>
    </div>
  );
}
