import React from 'react'
import BigNumber from 'bignumber.js'
import { Card, Header, List, ListItem, Text} from './TradeHistory.styles';
const TradeHistory = (props) => {
    let currentp = new BigNumber(0);
    let rows = [];
    let numRows = props.trades.length;
  
    for (var i = 0; i < numRows; i++) {
      let newp = new BigNumber(props.trades[i].p);
      rows.unshift(
        <ListItem
          key={`${i}:${props.trades[i].p}:${props.trades[i].q}:${props.trades[i].T}`}
        >
          <div className="col">
            <Text positive={newp.gte(currentp)}>
              {newp.toFormat(null, 1)}
            </Text>
          </div>
          <div className="col">
            {new BigNumber(props.trades[i].q).toFormat(null, 1)}
          </div>
          <div className="col text-muted">
            {new Date(props.trades[i].T).toLocaleTimeString()}
          </div>
        </ListItem>
      );
      currentp = new BigNumber(props.trades[i].p);
    }
  
    return (
      <Card className="trade-history">
        <Header>Trade History</Header>
        <List className="list-group list-group-flush">
          {rows}
        </List>
      </Card>
    );
  };
  
  export default TradeHistory;