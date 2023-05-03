import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading/Loading';
import Ticker from '../../components/Card/Ticker';
import MyChart from '../../components/Chart/MyChart';
import BuyOrSell from './BuyOrSell';
import OrderHistory from './OrderHistory';
import TradeHistory from '../../components/Card/TradeHistory';
import OrderBook from '../../components/Card/OrderBook';
import { useSelector, useDispatch } from 'react-redux';
import { set_depth, set_ticker, set_trades } from '../../state/tradeSlice';
import { formatData } from "../../components/utils/formatData";

function Trade(props) {
    const dispatch = useDispatch();
    const ticker = useSelector((state) => state.trade.ticker);
    const depth = useSelector((state) => state.trade.depth);
    const trades = useSelector((state) => state.trade.trades);

    const [loadedTrades, setLoadedTrades] = useState(false);
    const [loadedTicker, setLoadedTicker] = useState(false);
    const [loadedDepth, setLoadedDepth] = useState(false);
    const [loadedChart, setLoadedChart] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [tradesCount, setTradesCount] = useState(100);
    const [allStreams, setAllStreams] = useState(['@ticker', '@depth20', '@trade']);
    const [error, setError] = useState(null);
    const [pastData, setpastData] = useState({});
    const [chartInterval, setChartInterval] = useState('30m');
    const [refreshOrder, setRefreshOrder] = useState('30m');


    let connectionObj = {};
    const arr_interval = ['1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M'];

    const connectSocketStreams = (streams) => {
        streams = streams.join('/');
        let connection = btoa(streams);
        connectionObj[connection] = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);

        connectionObj[connection].onmessage = evt => {
            let eventData = JSON.parse(evt.data);
            if (eventData.stream.endsWith('@ticker')) {
                eventData.data.lastc = ticker ? ticker.c : 0;
                dispatch(set_ticker(eventData.data));
                setLoadedTicker(true);
            }
            if (eventData.stream.endsWith('@trade')) {
                dispatch(set_trades(new Array(eventData.data)));
                setLoadedTrades(true);
            }
            if (eventData.stream.endsWith('@depth20')) {
                dispatch(set_depth(eventData.data));
                setIsLoaded(true);
                setLoadedDepth(true);
            }
            setIsLoaded(true);
        };
        if (connectionObj[connection]) {
            connectionObj[connection].onerror = evt => {
                console.error(evt);
            }
        }
    }

    const disconnectSocketStreams = (streams) => {
        streams = streams.join('/');
        let connection = btoa(streams);
        if (connectionObj[connection].readyState === WebSocket.OPEN) {
            connectionObj[connection].close();
        }
    }

    useEffect(() => {
        const symbol = (props.match.params.symbol).replace('_', '');
        connectSocketStreams(allStreams.map(i => `${symbol.toLowerCase()}${i}`));

        // axios({
        //     method: 'get',
        //     url: `https://www.binance.com/api/v1/aggTrades?limit=${tradesCount}&symbol=${symbol}`
        // })
        //     .then(response => {
        //         console.log("update trades in useEffect")
        //         dispatch(set_trades(response.data));
        //         setIsLoaded(true);
        //         setLoadedTrades(true);
        //     })
        //     .catch(error => {
        //         setIsLoaded(false);
        //         setError(error);
        //     });


        return () => {
            let symbol = (props.match.params.symbol).replace('_', '').toLowerCase();
            disconnectSocketStreams(allStreams.map(i => `${symbol}${i}`));
        }
    }, []);

    //for the chart
    useEffect(() => {
        const symbol = (props.match.params.symbol).replace('_', '');
        fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${chartInterval}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setIsLoaded(true);
                setLoadedChart(true);
                let formattedData = formatData(data);
                setpastData(formattedData);
            })
            .catch(error => {
                setIsLoaded(false);
                setError(error);
            });

    }, [chartInterval]);



    // if (error) {
    //     return <div className="alert alert-danger">{error.message}</div>;
    // }
    if (!isLoaded) {
        return <Loading />;
    }

    const handleSelect = (e) => {

        setChartInterval(e.target.value);
    };
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-12">{loadedTicker ? <Ticker {...ticker} /> : <Loading />}</div>
            </div>

            <div className="row">
                <p style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                    Time
                </p>
                <select name="interval" value={chartInterval} onChange={handleSelect} >
                    {arr_interval.map((inter, idx) => {
                        return (
                            <option key={idx} value={inter}>
                                {inter}
                            </option>
                        );
                    })}
                </select>
            </div>

            <div className="row">
                <div className="col-12 col-md-6">{(pastData && pastData.labels && pastData.datasets && loadedChart) ?
                    <MyChart {...pastData} /> : <Loading />}
                </div>

                <div className="col-12 col-md-6"> <BuyOrSell symbol={(props.match.params.symbol)} /> </div>
            </div>
         
            <div className="row">
                <OrderHistory symbol = {(props.match.params.symbol)} />
            </div>

              <div className="row dashboard">
            </div>

            <div className="row">
                <div className="col-12 col-sm-6">{loadedTrades ? <TradeHistory trades={trades} /> : <Loading />}</div>
                <div className="col-12 col-sm-6">{loadedDepth ? <OrderBook bids={depth.bids} asks={depth.asks} /> : <Loading />}</div>
            </div>
        </React.Fragment>
    );
}

export default Trade;