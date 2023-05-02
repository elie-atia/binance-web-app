import React, { useState, useRef, useEffect } from 'react';
import Loading from '../../components/Loading/Loading';
import DataTable from '../../components/DataTable/DataTable';
import { useSelector, useDispatch } from 'react-redux';
import { update_market_pairs, set_active_market } from '../../state//marketSlice';
import { Nav, NavItem, NavLink, MarketsLink } from './Market.styles';

function Market() {
   
    const dispatch = useDispatch();
    const market_pairs = useSelector((state) => state.market.market_pairs);
    const active_market = useSelector((state) => state.market.active_market);
    const ws = useRef(null);
    const [isLoaded, setIsLoaded] = useState(market_pairs && active_market && active_market.filtered_pairs);
    let connectionObj = {};


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
        connectionObj[connection] = new WebSocket(`ws://localhost:3002`);
        connectionObj[connection].onmessage = async (evt) => {
            try {
                const data = JSON.parse(evt.data);
                let ticker = data;
                dispatch(update_market_pairs(ticker));
                setIsLoaded(true);
            } catch (error) {
                console.error("Erreur lors de la lecture des données :", error);
            }
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
    
    const renderMarketNavItems = (markets) => {
        return markets.map(market => (
            <NavItem key={market}>
                <NavLink
                    className={active_market.market === market ? 'active' : ''}
                    onClick={() => handleTabClick(market)}
                >
                    {market}
                    <MarketsLink> Markets</MarketsLink>
                </NavLink>
            </NavItem>
        ));
    };

    return (
        <React.Fragment>
             <Nav>
                {renderMarketNavItems(['BNB', 'BTC', 'ETH', 'USDT'])}
            </Nav>
            {(market_pairs && active_market.filtered_pairs) ?
                <DataTable ticker={market_pairs} filter={active_market.filtered_pairs} quoteAsset={active_market.market} />
                : <Loading />}
        </React.Fragment>
    );
}

export default Market;