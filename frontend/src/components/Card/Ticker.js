import React from 'react'
import BigNumber from 'bignumber.js'
import { Card, CardBody, Row, Col, TickerSymbol, Label, Value, ValueChange } from './Ticker.styles';

const Ticker = (props) => (
    <Card>
        <CardBody>
            <Row>
                <Col>
                    <TickerSymbol>{props.s}</TickerSymbol>
                </Col>
                <Col>
                    <Label>Last Price</Label>
                    <ValueChange change={new BigNumber(props.c).minus(new BigNumber(props.lastc))}>
                        {new BigNumber(props.c).toFormat(null, 1)}
                    </ValueChange>                </Col>
                <Col>
                    <Label>24h Change</Label>
                    <ValueChange change={props.p}>
                        {`${new BigNumber(props.p).toFormat(null, 1)} (${new BigNumber(props.P).toFormat(2, 1)}%)`}
                    </ValueChange>
                </Col>
                <Col>
                    <Label>24h High</Label>
                    <Value>{new BigNumber(props.h).toFormat(null, 1)}</Value>
                </Col>
                <Col>
                    <Label>24h Low</Label>
                    <Value>{new BigNumber(props.l).toFormat(null, 1)}</Value>
                </Col>
                <Col>
                    <Label>24h Volume</Label>
                    <Value>
                        {new BigNumber(props.q).toFormat(2, 1)} {props.s.length === 7 ? props.s.slice(-4) : props.s.slice(-3)}
                    </Value>
                </Col>
            </Row>
        </CardBody>
    </Card>
)

export default Ticker;