export default async function handler(req, res) {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets" +
    "?vs_currency=usd" +
    "&ids=bitcoin,ethereum,solana,ripple,dogecoin,cardano,tron,toncoin,chainlink,polygon,litecoin,stellar,polkadot,avalanche,binancecoin,uniswap,cosmos,vechain,aptos" +
    "&order=market_cap_desc" +
    "&sparkline=false" +
    "&price_change_percentage=24h";

  try {
    const response = await fetch(url, {
      headers: {
        "x-cg-api-key": process.env.VITE_API_KEY,
      },
    });

    const data = await response.json();

    if (!Array.isArray(data)) {
      return res.status(500).json([]);
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json([]);
  }
}
