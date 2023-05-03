import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import { useSelector } from 'react-redux';

// ** Define here env-like variables
const isProd = false; // set it to false when wanting to connect to local server running on port 8080
const serverBaseUrl = isProd ? 'https://react-binance-app-server.web.app' : 'http://localhost:8080';


const BuyOrSell = (props) => {
    const [buyPrice, setBuyPrice] = useState('');
    const [sellPrice, setSellPrice] = useState('');
    const [buyAmount, setBuyAmount] = useState('');
    const [sellAmount, setSellAmount] = useState('');
    const [key, setKey] = useState(localStorage?.getItem('binanceKey') || "");
    const [secret, setSecret] = useState(localStorage?.getItem('binanceSecret') || "");
    const ticker = useSelector((state) => state.trade.ticker);
    var buySellAtmarketPrice = document.querySelector('input[value="atmarketPrice"]:checked');

    const handleSetKey = (value) => {
        setKey(value);
        localStorage.setItem("binanceKey", value);
    }

    const handleSetSecret = (value) => {
        setSecret(value);
        localStorage.setItem("binanceSecret", value);
    }

    const placeAnOrder = (isBuy) => {
        const newSymbol = props.symbol.replace('_', '');
        const totalParams = `symbol=${newSymbol}&side=${isBuy ? 'BUY' : 'SELL'}&type=LIMIT&timeInForce=GTC&quantity=${isBuy ? buyAmount : sellAmount}&price=${isBuy ? buyPrice : sellPrice}&timestamp=${Date.now()}`;
        const signature = HmacSHA256(totalParams, secret).toString();
        const json = {
            signature: signature,
            key: key,
            totalParams: totalParams
        }
        try {
            const res = axios.post(`${serverBaseUrl}/takeOrder/order`, json)
                .then((response) => {
                    console.log(response);
                }, (error) => {
                    console.log(error);
                });
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }
    useEffect(() => {
        if(buySellAtmarketPrice){
            setBuyPrice(ticker.c);
            setSellPrice(ticker.c);
        }
    }, [buySellAtmarketPrice,ticker]);

    return (
        <div className="cwrapper alt">
            <div className="content">

                <div className="cbox  col-12 col-md-6">
                    <div className="flist">
                        <p>Api key:</p>
                        <input type="text" placeholder="binance-api-key" onChange={e => handleSetKey(e.target.value)} value={key} />
                    </div>
                    <div className="flist">
                        <p>Api secret:</p>
                        <input type="text" placeholder="binance-api-secret" onChange={e => handleSetSecret(e.target.value)} value={secret} />
                    </div>
                </div>

                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="atmarketPrice"  value='atmarketPrice'/>
                        <label class="form-check-label" for="atmarketPrice">Buy/Sell at market Price</label>
                </div>


                <div className="cbox fleft col-12 col-md-6">
                    <h3>Sell {props.symbol.split("_")[1]} for {props.symbol.split("_")[0]}</h3>
                    <div className="flist">
                        <p>Amount:</p>
                        <input type="text" placeholder={props.symbol.split("_")[0]} onChange={e => setSellAmount(e.target.value)} value={sellAmount} />
                    </div>
                    <div className="flist">
                        <p>Price:</p>
                        <input disabled={buySellAtmarketPrice} type="text" placeholder={props.symbol.split("_")[1]} onChange={e => setSellPrice(e.target.value)} value={sellPrice} />
                    </div>
                    <div className="flist" style={{ backgroundColor: '#FFF' }}>
                        <p>Total:</p>
                        <span>{`${sellPrice * sellAmount} ${props.symbol.split("_")[1]}`}</span>

                    </div>
                    <div className="flist">
                        <p>&nbsp;</p>
                        <button className="button blue" onClick={() => placeAnOrder(false)}>
                            {`Sell ${props.symbol.split("_")[0]}`}
                        </button>
                    </div>


                </div>
                <div className="cbox fright col-12 col-md-6">
                    <h3>Buy {props.symbol.split("_")[0]} with {props.symbol.split("_")[1]}</h3>
                    <div className="flist">
                        <p>Amount:</p>
                        <input type="text" placeholder={props.symbol.split("_")[0]} onChange={e => setBuyAmount(e.target.value)} value={buyAmount} />
                    </div>
                    <div className="flist">
                        <p>Price:</p>
                        <input disabled={buySellAtmarketPrice} type="text" placeholder={props.symbol.split("_")[1]} onChange={e => setBuyPrice(e.target.value)} value={buyPrice} />
                    </div>
                    <div className="flist" style={{ backgroundColor: '#FFF' }}>
                        <p>Total:</p>
                        <span>{`${buyPrice * buyAmount} ${props.symbol.split("_")[1]}`}</span>
                    </div>
                    <div className="flist">
                        <p>&nbsp;</p>
                        <button className="button blue" onClick={() => placeAnOrder(true)}>
                            {`Buy ${props.symbol.split("_")[0]}`}
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default BuyOrSell;