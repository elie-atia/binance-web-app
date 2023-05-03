import React, { useState, useRef, useEffect } from 'react'
import HmacSHA256 from 'crypto-js/hmac-sha256';
import { CWrapper, Content, CBox, H3, Li, UlList, UlTable, P } from './OrderHistory.styles.js';
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
      // const res = axios.post(`${serverBaseUrl}/ordersHistory/history`, json)
      //   .then((response) => {
      //     let temp_arr = (response.data).sort(compare_date);
      //     temp_arr.map(order => {
      //       // initialize new Date object
      //       let date_ob = new Date(order['time']);
      //       // year as 4 digits (YYYY)
      //       let year = date_ob.getFullYear();
      //       // month as 2 digits (MM)
      //       let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      //       // date as 2 digits (DD)
      //       let date = ("0" + date_ob.getDate()).slice(-2);
      //       // hours as 2 digits (hh)
      //       let hours = ("0" + date_ob.getHours()).slice(-2);
      //       // minutes as 2 digits mm)
      //       let minutes = ("0" + date_ob.getMinutes()).slice(-2);
      //       // seconds as 2 digits (ss)
      //       let seconds = ("0" + date_ob.getSeconds()).slice(-2);
      //       // date as YYYY-MM-DD format
      //       order['time'] = (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
      //     })
      //     setOrdersHistory(temp_arr);
      //   }, (error) => {
      //     console.log(error);
      //   });
      console.log('fetch something...')
    } catch (err) {
      // Handle Error Here   
      console.error(err);
    }
  }, []);
  return (
    <>
    <CWrapper>
      <Content>
        <CBox>
          <H3>Your Open Orders</H3>
          <P>View your current open orders.</P>
          <UlTable>
            <UlList className="lheader">
              <Li>Date</Li>
              <Li>Pair</Li>
              <Li>Type</Li>
              <Li>Side</Li>
              <Li>Total</Li>
              <Li>Status</Li>
              <Li>Cancel</Li>
            </UlList>
            {ordersHistory.filter(order => order.status === 'NEW')
              .map((order, index) =>
                <UlList key={index}>
                  <Li>{order.time}</Li>
                  <Li>{order.symbol}</Li>
                  <Li>{order.type}</Li>
                  <Li>{order.side}</Li>
                  <Li>{`${Number(order.price) * Number(order.origQty)} ${props.symbol.split("_")[1]}`}</Li>
                  <Li>{order.status}</Li>
                  <Li>
                    <Button onClick={() => handleCancelOrder(order.clientOrderId)}>Cancel</Button>
                  </Li>
                </UlList>)}
          </UlTable>
        </CBox>
      </Content>
    </CWrapper>

    <CWrapper>
      <Content>
        <CBox>
          <H3>Order History</H3>
          <P>View your current order history.</P>
          <UlTable>
            <UlList className="lheader">
              <Li>Date</Li>
              <Li>Pair</Li>



              <Li>Type</Li>
                <Li>Side</Li>
                <Li>Executed</Li>
                <Li>Total</Li>
                <Li>Status</Li>
              </UlList>
              {ordersHistory.filter(order => order.status !== 'NEW')
                .map((order, index) =>
                  <UlList key={index}>
                    <Li>{order.time}</Li>
                    <Li>{order.symbol}</Li>
                    <Li>{order.type}</Li>
                    <Li>{order.side}</Li>
                    <Li>{order.executedQty}</Li>
                    <Li>{order.cummulativeQuoteQty}</Li>
                    <Li>{order.status}</Li>
                  </UlList>)}
            </UlTable>
          </CBox>
        </Content>
      </CWrapper>
    </>
  );
}

export default OrderHistory;