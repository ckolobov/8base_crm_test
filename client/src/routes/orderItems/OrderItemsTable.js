import React from 'react';
import { compose } from 'recompose';
import * as R from 'ramda';
import { Table, withModal } from '@8base/boost';
import { graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';
import { OrderItemCreateDialog } from "./OrderItemCreateDialog";

let OrderItemsTable = ({ orderItems, openModal }) => {
  return (
    <Table>
      <Table.Header columns="repeat(3, 1fr) 60px">
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Price</Table.HeaderCell>
        <Table.HeaderCell>Quantity</Table.HeaderCell>
      </Table.Header>

      <Table.Body loading={ orderItems.loading } data={ R.pathOr([], ['orderItemsList', 'items'], orderItems) } action="Create Order Item" onActionClick={() => openModal(OrderItemCreateDialog.id)}>
        {
          (item) => (
            <Table.BodyRow columns="repeat(3, 1fr) 60px" key={ item.id }>
              <Table.BodyCell>
                { R.pathOr('Product name is empty', ['product', 'name'], item) }
              </Table.BodyCell>
              <Table.BodyCell>
                { R.pathOr('Product price is empty', ['product', 'price'], item) }
              </Table.BodyCell>
              <Table.BodyCell>
                { item.quantity }
              </Table.BodyCell>
            </Table.BodyRow>
          )
        }
      </Table.Body>
    </Table>
)};

OrderItemsTable = compose(
  withModal,
  graphql(sharedGraphQL.ORDER_ITEMS_LIST_QUERY, { name: 'orderItems' }),
)(OrderItemsTable);

export { OrderItemsTable };
