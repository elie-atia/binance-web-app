import React, { useState, useRef, useEffect } from 'react';
import Loading from '../../components/Loading/Loading';
import DataTable from '../../components/DataTable/DataTable';
import { useSelector, useDispatch } from 'react-redux';
import { update_market_pairs, set_active_market } from '../../state/MarketSlice/marketSlice';

function Market() {

    const dispatch = useDispatch();

    const market_pairs = useSelector((state) => state.market.market_pairs);
    const active_market = useSelector((state) => state.market.active_market);
    const ws = useRef(null);
    const [isLoaded, setIsLoaded] = useState(market_pairs && active_market && active_market.filtered_pairs);
    let connectionObj = {};

    const getTickerBySymbol = (data) => {
        let ticker = {};  
        data?.forEach(item => {
            let symbol = item.symbol || item.s;
            ticker[symbol] = {
                symbol: symbol,
                lastPrice: item.lastPrice || item.c,
                priceChange: item.priceChange || item.p,
                priceChangePercent: item.priceChangePercent || item.P,
                highPrice: item.highPrice || item.h,
                lowPrice: item.lowPrice || item.l,
                quoteVolume: item.quoteVolume || item.q,
            }
        })
        return ticker;
    }

    const handleTabClick = (e) => {
        let market = e.currentTarget ? e.currentTarget.getAttribute('data-tab') : e;
        dispatch(set_active_market({
            filtered_pairs: Object.keys(market_pairs).filter(item => item.endsWith(market)),
            market: market
        })
        );
    }

    const connectSocketStreams = (streams) => {
        streams = streams.join('/');
        let connection = btoa(streams);
        connectionObj[connection] = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);
        connectionObj[connection].onmessage = evt => {
            let ticker = getTickerBySymbol(JSON.parse(evt.data).data);
            dispatch(update_market_pairs(ticker));
            setIsLoaded(true);
        }
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
            ws.current && ws.current.close();
        }  
    }

    useEffect(() => {
        handleTabClick(active_market?.market || 'USDT')
    }, [market_pairs]);


    useEffect(() => {
        connectSocketStreams(['!ticker@arr']);
        return () => {
            disconnectSocketStreams(['!ticker@arr'])
        }
    }, []);


    if (!isLoaded) {
        return <Loading />;
    }
    return (
        <React.Fragment>
            <ul className="nav nav-tabs pt-2">
                <li className="nav-item">
                    <a className={active_market.market === 'BNB' ? 'nav-link active' : 'nav-link'} onClick={handleTabClick} data-tab="BNB">BNB<span className="d-none d-sm-inline"> Markets</span></a>
                </li>
                <li className="nav-item">
                    <a className={active_market.market === 'BTC' ? 'nav-link active' : 'nav-link'} onClick={handleTabClick} data-tab="BTC">BTC<span className="d-none d-sm-inline"> Markets</span></a>
                </li>
                <li className="nav-item">
                    <a className={active_market.market === 'ETH' ? 'nav-link active' : 'nav-link'} onClick={handleTabClick} data-tab="ETH">ETH<span className="d-none d-sm-inline"> Markets</span></a>
                </li>
                <li className="nav-item">
                    <a className={active_market.market === 'USDT' ? 'nav-link active' : 'nav-link'} onClick={handleTabClick} data-tab="USDT">USDT<span className="d-none d-sm-inline"> Markets</span></a>
                </li>
                {/* <li className="nav-item">
                    <a className={active_market.market === 'BUY-SELL' ? 'nav-link active' : 'nav-link'} onClick={handleTabClick} data-tab="BUY-SELL">Buy/Sell</a>
                </li> */}
            </ul>

             {(market_pairs && active_market.filtered_pairs) ?
                    <DataTable ticker={market_pairs} filter={active_market.filtered_pairs} quoteAsset={active_market.market} />
                    : <Loading />} 

        </React.Fragment>
    );

}

export default Market;