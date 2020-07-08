import React from 'react';
import { compose } from 'recompose';
import * as R from 'ramda';
import {Table, withModal} from '@8base/boost';
import { graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';

let OrderInfoTable = ({ orderInfo }) => (
  <Table>
    <Table.Header columns="repeat(6, 1fr)">
      <Table.HeaderCell>Client</Table.HeaderCell>
      <Table.HeaderCell>Address</Table.HeaderCell>
      <Table.HeaderCell>Delivery Date</Table.HeaderCell>
      <Table.HeaderCell>Comment</Table.HeaderCell>
      <Table.HeaderCell>Status</Table.HeaderCell>
      <Table.HeaderCell>Total Price</Table.HeaderCell>
    </Table.Header>

    <Table.Body loading={ orderInfo.loading } data={ orderInfo.order ? [orderInfo.order] : [] }>
      {
        (order) => {
          const totalPrice = order.orderItems.items.reduce((accumulator, currentValue) => (accumulator + currentValue.quantity * currentValue.product.price), 0);
          return (
            <Table.BodyRow columns="repeat(6, 1fr)" key={ order.id }>
              <Table.BodyCell>
                { `${R.pathOr('Client not selected', ['client', 'firstName'], order)} ${(R.path(['client', 'lastName'], order) || '')}`}
              </Table.BodyCell>
              <Table.BodyCell>
                { order.address }
              </Table.BodyCell>
              <Table.BodyCell>
                { order.deliveryDt }
              </Table.BodyCell>
              <Table.BodyCell>
                { order.comment }
              </Table.BodyCell>
              <Table.BodyCell>
                { order.status }
              </Table.BodyCell>
              <Table.BodyCell>
                { totalPrice.toFixed(2) }
              </Table.BodyCell>
            </Table.BodyRow>
          )
        }
      }
    </Table.Body>
  </Table>
);

OrderInfoTable = compose(
  withModal,
  graphql(sharedGraphQL.ORDER_INFO_QUERY, { name: 'orderInfo' }),
)(OrderInfoTable);

export { OrderInfoTable };
