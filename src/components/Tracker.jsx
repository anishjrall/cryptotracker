import { useEffect, useState } from "react";
import { getPrice } from "../api/trackerApi";

export default function Tracker() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await getPrice();
      if (response.status === 200) {
        setError("");
        const result = response.data;
        setData(Array.isArray(result) ? result : []);
      }
    } catch (err) {
      setError("Something went wrong");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleClick();
    const intervalId = setInterval(() => {
      handleClick();
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col justify-center items-center p-6">
      <h1 className="text-4xl font-bold text-white mb-6">Crypto Tracker 🟢</h1>

      <div className="bg-zinc-800 shadow-xl rounded-xl p-6 w-full overflow-x-auto">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-7 text-white font-bold border-b border-zinc-600 pb-2 mb-3">
            <div>Symbol</div>
            <div>Name</div>
            <div>Price</div>
            <div>Market Cap</div>
            <div>24h Volume</div>
            <div>High</div>
            <div>Low</div>
          </div>

          {Array.isArray(data) &&
            data.map((coin) => (
              <div
                key={coin.id}
                className="grid grid-cols-7 items-center bg-zinc-700 hover:bg-zinc-600 p-2 rounded-md transition mb-2"
              >
                <div className="flex items-center gap-2">
                  <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                  <span className="text-white">
                    {coin.symbol.toUpperCase()}
                  </span>
                </div>

                <div className="text-white font-medium">{coin.name}</div>

                <div className="text-lime-400 font-bold">
                  ${coin.current_price?.toLocaleString()}
                </div>

                <div className="text-white">
                  ${coin.market_cap?.toLocaleString()}
                </div>

                <div className="text-white">
                  ${coin.total_volume?.toLocaleString()}
                </div>

                <div className="text-white">
                  ${coin.high_24h?.toLocaleString()}
                </div>

                <div className="text-white">
                  ${coin.low_24h?.toLocaleString()}
                </div>
              </div>
            ))}
        </div>
      </div>

      {error && <p className="text-red-400 mt-3">{error}</p>}

      <button
        onClick={handleClick}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
      >
        {loading ? "Loading..." : "Refresh"}
      </button>
    </div>
  );
}
