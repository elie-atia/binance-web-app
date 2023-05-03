import React, { useState, useRef, useEffect } from 'react'
import HmacSHA256 from 'crypto-js/hmac-sha256';

// ** Define here env-like variables
const isProd = false; // set it to false when wanting to connect to local server running on port 8080
const serverBaseUrl = isProd ? 'https://react-binance-app-server.web.app' : 'http://localhost:8080';

const OrderHistory = (props) => {

  const [key, setKey] = useState(localStorage?.getItem('binanceKey') || "");
  const [secret, setSecret] = useState(localStorage?.getItem('binanceSecret') || "");
  const [ordersHistory, setOrdersHistory] = useState([]);

  function compare_date( a, b ) {
    if ( a.time < b.time ){
      return 1;
    }
    if ( a.time > b.time ){
      return -1;
    }
    return 0;
  }

  const handleCancelOrder = (clientOrderId) => {
      const newSymbol = props.symbol.replace('_', '');
      const totalParams = `symbol=${newSymbol}&origClientOrderId=${clientOrderId}&timestamp=${Date.now()}`;
      const signature = HmacSHA256(totalParams, secret).toString();
      const json = {
          signature: signature,
          key: key,
          totalParams: totalParams
      }
      try {
          // const res = axios.post(`${serverBaseUrl}/cancelOrder/cancelOrder`, json)
          //     .then((response) => {
          //         console.log(response);
          //     }, (error) => {
          //         console.log(error);
          //     });
          console.log('handleCancelOrder');
      } catch (err) {
          // Handle Error Here
          console.error(err);
      }
  
}
  useEffect(() => {
    const newSymbol = props.symbol.replace('_', '');
    const totalParams = `symbol=${newSymbol}&timestamp=${Date.now()}`;
    const signature = HmacSHA256(totalParams, secret).toString();
    const json = {
      signature: signature,
      key: key,
      totalParams: totalParams
    }
    try {
      const res = axios.post(`${serverBaseUrl}/ordersHistory/history`, json)
        .then((response) => {
          let temp_arr = (response.data).sort(compare_date);
          temp_arr.map(order => {
            // initialize new Date object
            let date_ob = new Date(order['time']);
            // year as 4 digits (YYYY)
            let year = date_ob.getFullYear();
            // month as 2 digits (MM)
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            // date as 2 digits (DD)
            let date = ("0" + date_ob.getDate()).slice(-2);
            // hours as 2 digits (hh)
            let hours = ("0" + date_ob.getHours()).slice(-2);
            // minutes as 2 digits mm)
            let minutes = ("0" + date_ob.getMinutes()).slice(-2);
            // seconds as 2 digits (ss)
            let seconds = ("0" + date_ob.getSeconds()).slice(-2);
            // date as YYYY-MM-DD format
            order['time'] = (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
          })
          setOrdersHistory(temp_arr);
        }, (error) => {
          console.log(error);
        });
    } catch (err) {
      // Handle Error Here   
      console.error(err);
    }
  }, []);
  return (
    <>
      <div className="col-12">
        <div className="cwrapper">
          <div className="content">
            <div className="cbox" style={{ marginBottom: "20px" }}>
              <h3>Your Open Orders</h3>
              <p>View your current open orders.</p>
              <div className="ultable">
              <ul className="lister lheader">
                  <li>Date</li>
                  <li>Pair</li>
                  <li>Type</li>
                  <li>Side</li>
                  <li>Total</li>
                  <li>Status</li>
                  <li>Cancel</li>


                </ul>
                {ordersHistory.filter(order=>order.status ==='NEW')
                .map((order,index) =>
                  <ul className="lister" key={index}>
                    <li>{order.time}</li>
                    <li>{order.symbol}</li>
                    <li>{order.type}</li>
                    <li>{order.side}</li>
                    <li>{`${Number(order.price)*Number(order.origQty)} ${props.symbol.split("_")[1]}`}</li>
                    <li>{order.status}</li>

                    <button onClick={()=>handleCancelOrder(order.clientOrderId)}>Cancel</button>

                  </ul>)}
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="col-12">
        <div className="cwrapper">
          <div className="content">
            <div className="cbox" style={{ marginBottom: "20px" }}>
              <h3>Order History</h3>
              <p>View your current order history.</p>
              <div className="ultable">
                <ul className="lister lheader">
                  <li>Date</li>
                  <li>Pair</li>
                  <li>Type</li>
                  <li>Side</li>
                  <li>Executed</li>
                  <li>Total</li>
                  <li>Status</li>

                </ul>
                {ordersHistory.filter(order=>order.status !='NEW')
                .map((order,index) =>
                  <ul className="lister" key={index}>
                    <li>{order.time}</li>
                    <li>{order.symbol}</li>
                    <li>{order.type}</li>
                    <li>{order.side}</li>
                    <li>{order.executedQty}</li>
                    <li>{order.cummulativeQuoteQty}</li>
                    <li>{order.status}</li>

                  </ul>)}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderHistory;