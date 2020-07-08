import React from 'react';
import { compose } from 'recompose';
import * as R from 'ramda';
import { Table, withModal } from '@8base/boost';
import { graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';

let ClientOrdersTable = ({ clientOrders }) => {
  return (
    <Table>
      <Table.Header columns="repeat(5, 1fr) 60px">
        <Table.HeaderCell>Client</Table.HeaderCell>
        <Table.HeaderCell>Address</Table.HeaderCell>
        <Table.HeaderCell>Delivery Date</Table.HeaderCell>
        <Table.HeaderCell>Comment</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
      </Table.Header>

      <Table.Body loading={ clientOrders.loading } data={ R.pathOr([], ['ordersList', 'items'], clientOrders) }>
        {
          (order) => (
            <Table.BodyRow columns="repeat(5, 1fr) 60px" key={ order.id }>
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
            </Table.BodyRow>
          )
        }
      </Table.Body>
    </Table>
)};

ClientOrdersTable = compose(
  withModal,
  graphql(sharedGraphQL.CLIENT_ORDERS_LIST_QUERY, { name: 'clientOrders' }),
)(ClientOrdersTable);

export { ClientOrdersTable };
