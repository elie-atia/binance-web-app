import React from 'react';
import BigNumber from 'bignumber.js';
import { ListItem, Row, Col, ProgressBar, Card, CardHeader, ListGroup, OrderBookProgress} from './OrderBook.styles';

const OrderRow = (props) => (
    <ListItem className="list-group-item small py-0" key={`${props.i}:${props.ba[0]}:${props.ba[1]}`}>
    <Row>
      <Col>
      <OrderBookProgress>
          <ProgressBar
            role="progressbar"
            bgColor={props.bgColor}
            // width={new BigNumber(props.diff).minus(props.ba[0]).div(props.max).multipliedBy(100).toFormat(2)}
            width = {50}
          ></ProgressBar>
        </OrderBookProgress>
      </Col>
      <Col>{new BigNumber(props.ba[0]).toFormat(null, 1)}</Col>
      <Col>{new BigNumber(props.ba[1]).toFormat(null, 1)}</Col>
    </Row>
  </ListItem>
)

const OrderBook = (props) => {
    let bids = [];
    let asks = [];
    let numRowsBid = Math.min(20, props.bids.length);
    let numRowsAsk = Math.min(20, props.asks.length);
    let maxBid = BigNumber.maximum(props.bids.map((bid) => bid[0])).toFormat();
    let minAsk = BigNumber.minimum(props.asks.map((ask) => ask[0])).toFormat();
    let minBid = new BigNumber(maxBid).minus(BigNumber.minimum(props.bids.map((bid) => bid[0]))).toFormat();
    let maxAsk = new BigNumber(minAsk).minus(BigNumber.maximum(props.asks.map((ask) => ask[0]))).toFormat();
    for (var b = 0; b < numRowsBid; b++) {
      bids.push(
        <OrderRow i={b} ba={props.bids[b]} diff={maxBid} max={minBid} bgColor="#28a745" key={b} />
      );
    }
    for (var a = 0; a < numRowsAsk; a++) {
      asks.unshift(
        <OrderRow i={a} ba={props.asks[a]} diff={minAsk} max={maxAsk} bgColor="#dc3545" key={a} />
      );
    }
    return (
        <Card>
        <CardHeader>
          Order Book <span className="text-muted small">Bid-Ask Spread</span>
        </CardHeader>
        <ListGroup>
          {asks}
          {bids}
        </ListGroup>
      </Card>
    );
  };
  
  export default OrderBook;