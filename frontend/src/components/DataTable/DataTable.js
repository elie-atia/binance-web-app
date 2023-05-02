import React from 'react'
import BigNumber from 'bignumber.js'
import { TableRow, TextDanger, TextSuccess, InlineMobile, MobileRow, Col12, Col4, Bold, MutedSmall, Small, TableHeader } from './DataTable.styles';

const Row = (props) => (
    <React.Fragment>
        <div className="d-none d-sm-inline">
            <TableRow to={`trade/${props.new_symbol}`}>
                <div>{props.symbol}</div>
                <div>{new BigNumber(props.lastPrice).toFormat(null, 1)}</div>
                {props.priceChangePercent < 0 ? (
                    <TextDanger>{`${new BigNumber(props.priceChangePercent).toFormat(2, 1)}%`}</TextDanger>
                ) : (
                    <TextSuccess>{`${new BigNumber(props.priceChangePercent).toFormat(2, 1)}%`}</TextSuccess>
                )}
                <div>{new BigNumber(props.highPrice).toFormat(null, 1)}</div>
                <div>{new BigNumber(props.lowPrice).toFormat(null, 1)}</div>
                <div>{new BigNumber(props.quoteVolume).toFormat(null, 1)}</div>
            </TableRow>
        </div>
        <InlineMobile>
            <MobileRow to={`trade/${props.new_symbol}`}>
                <Col12>
                    <Bold>{props.symbol}</Bold> <span>{new BigNumber(props.lastPrice).toFormat(null, 1)}</span>{' '}
                    {props.priceChangePercent < 0 ? (
                        <TextDanger>{`${new BigNumber(props.priceChangePercent).toFormat(2, 1)}%`}</TextDanger>
                    ) : (
                        <TextSuccess>{`${new BigNumber(props.priceChangePercent).toFormat(2, 1)}%`}</TextSuccess>
                    )}
                </Col12>
                <Col4>
                    <MutedSmall>24h High</MutedSmall>
                    <Small>{new BigNumber(props.highPrice).toFormat(null, 1)}</Small>
                </Col4>
                <Col4>
                    <MutedSmall>24h Low</MutedSmall>
                    <Small>{new BigNumber(props.lowPrice).toFormat(null, 1)}</Small>
                </Col4>
                <Col4>
                    <MutedSmall>24h Volume</MutedSmall>
                    <Small>{new BigNumber(props.quoteVolume).toFormat(null, 1)}</Small>
                </Col4>
            </MobileRow>
        </InlineMobile>
    </React.Fragment>
);





const DataTable = (props) => {
    let rows = [];
    let tickerArray = Object.values(props.ticker);
    let numRows = tickerArray.length;

    for (var i = 0; i < numRows; i++) {
        if (props.filter.includes(tickerArray[i].symbol)) {
            const new_symbol = (tickerArray[i].symbol).replace(props.quoteAsset, '_' + props.quoteAsset);
            rows.push(
                <Row {...tickerArray[i]} key={tickerArray[i].symbol} new_symbol={new_symbol} />
            );
        }
    }
    return (
        <React.Fragment>
            <div className="d-none d-sm-inline">
                <TableHeader>
                    <div>Pair</div>
                    <div>Last Price</div>
                    <div>24h Change</div>
                    <div>24h High</div>
                    <div>24h Low</div>
                    <div>24h Volume</div>
                </TableHeader>
            </div>
            {rows}
        </React.Fragment>
    );
};


export default DataTable;