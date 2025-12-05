import axios from "axios";

export const getPrice = async () => {
  return axios.get(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,ripple,dogecoin,cardano,tron,toncoin,chainlink,polygon,litecoin,stellar,polkadot,avalanche,binancecoin,uniswap,cosmos,vechain,aptos&order=market_cap_desc&sparkline=false&price_change_percentage=24h"
  );
};
