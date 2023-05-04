import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import { useSelector } from 'react-redux';
import { CWrapper, Content, CBox, FList, P, Input, Button } from './BuyOrSell.styles.js';

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
    const authState = useSelector((state) => state.auth);
    var buySellAtmarketPrice = document.querySelector('input[value="atmarketPrice"]:checked');

    const handleSetKey = (value) => {
        setKey(value);
        localStorage.setItem("binanceKey", value);
    }

    const handleSetSecret = (value) => {
        setSecret(value);
        localStorage.setItem("binanceSecret", value);
    }

    const placeAnOrder = async (isBuy) => {
        const newSymbol = props.symbol.replace('_', '');
        const totalParams = `symbol=${newSymbol}&side=${isBuy ? 'BUY' : 'SELL'}&quantity=${isBuy ? buyAmount : sellAmount}&price=${isBuy ? buyPrice : sellPrice}&timestamp=${Date.now()}`;
        const json = {
            token: authState?.token,
            totalParams: totalParams
        }

        const response = await fetch('http://localhost:3001/placeOrder', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(json),
          });
      
          if (response.ok) {   
            console.log('place order successfully')
      
          } else {
            // Affichez une erreur si le statut de la réponse n'est pas OK
            console.error(`Erreur lors de la connexion: ${response.status}`);
          }

    }

    
    useEffect(() => {
        if (buySellAtmarketPrice) {
            setBuyPrice(ticker.c);
            setSellPrice(ticker.c);
        }
    }, [buySellAtmarketPrice, ticker]);

    return (
        <CWrapper className="alt">
            <Content>

                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="atmarketPrice" value='atmarketPrice' />
                    <label class="form-check-label" for="atmarketPrice">Buy/Sell at market Price</label>
                </div>


                <CBox className="fleft col-12 col-md-6">
                    <h3>Sell {props.symbol.split("_")[1]} for {props.symbol.split("_")[0]}</h3>
                    <FList>
                        <P>Amount:</P>
                        <Input type="text" placeholder={props.symbol.split("_")[0]} onChange={e => setSellAmount(e.target.value)} value={sellAmount} />
                    </FList>
                    <FList>
                        <P>Price:</P>
                        <Input disabled={buySellAtmarketPrice} type="text" placeholder={props.symbol.split("_")[1]} onChange={e => setSellPrice(e.target.value)} value={sellPrice} />
                    </FList>
                    <div className="flist" style={{ backgroundColor: '#FFF' }}>
                        <p>Total:</p>
                        <span>{`${sellPrice * sellAmount} ${props.symbol.split("_")[1]}`}</span>

                    </div>
                    <FList>
                        <P>&nbsp;</P>
                        <Button className="blue" onClick={() => placeAnOrder(false)}>
                            {`Sell ${props.symbol.split("_")[0]}`}
                        </Button>
                    </FList>


                </CBox>
                <CBox className="fright col-12 col-md-6">
                    <h3>Buy {props.symbol.split("_")[0]} with {props.symbol.split("_")[1]}</h3>
                    <FList>
                        <P>Amount:</P>
                        <Input type="text" placeholder={props.symbol.split("_")[0]} onChange={e => setBuyAmount(e.target.value)} value={buyAmount} />
                    </FList>
                    <FList>
                        <P>Price:</P>
                        <Input disabled={buySellAtmarketPrice} type="text" placeholder={props.symbol.split("_")[1]} onChange={e => setBuyPrice(e.target.value)} value={buyPrice} />
                    </FList>
                    <FList style={{ backgroundColor: '#FFF' }}>
                        <P>Total:</P>
                        <span>{`${buyPrice * buyAmount} ${props.symbol.split("_")[1]}`}</span>
                    </FList>
                    <FList>
                        <P>&nbsp;</P>
                        <Button className="blue" onClick={() => placeAnOrder(true)}>
                            {`Buy ${props.symbol.split("_")[0]}`}
                        </Button>
                    </FList>

                </CBox>
            </Content>

        </CWrapper>
    );
}

export default BuyOrSell;