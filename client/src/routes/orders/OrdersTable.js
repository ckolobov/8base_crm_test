import React from 'react';
import { compose } from 'recompose';
import * as R from 'ramda';
import {Table, Dropdown, Icon, Menu, withModal, Link} from '@8base/boost';
import { graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';

import { OrderCreateDialog } from './OrderCreateDialog';
import { OrderDeleteDialog } from './OrderDeleteDialog';
import { OrderEditDialog } from './OrderEditDialog';

let OrdersTable = ({ orders, openModal }) => (
  <Table>
    <Table.Header columns="repeat(6, 1fr) 60px">
      <Table.HeaderCell>Client</Table.HeaderCell>
      <Table.HeaderCell>Address</Table.HeaderCell>
      <Table.HeaderCell>Delivery Date</Table.HeaderCell>
      <Table.HeaderCell>Comment</Table.HeaderCell>
      <Table.HeaderCell>Status</Table.HeaderCell>
      <Table.HeaderCell>Total Price</Table.HeaderCell>
      <Table.HeaderCell />
    </Table.Header>

    <Table.Body loading={ orders.loading } data={ R.pathOr([], ['ordersList', 'items'], orders) }  action="Create Order" onActionClick={() => openModal(OrderCreateDialog.id)}>
      {
        (order) => {
          const totalPrice = order.orderItems.items.reduce((accumulator, currentValue) => (accumulator + currentValue.quantity * currentValue.product.price), 0);
          return (
            <Table.BodyRow columns="repeat(6, 1fr) 60px" key={ order.id }>
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
              <Table.BodyCell>
                <Dropdown defaultOpen={ false }>
                  <Dropdown.Head>
                    <Icon name="More" color="LIGHT_GRAY2" />
                  </Dropdown.Head>
                  <Dropdown.Body pin="right">
                    {
                      ({ closeDropdown }) => (
                        <Menu>
                          <Menu.Item><Link target="_blank" href={`orders/${order.id}`} size="sm">Order Items</Link></Menu.Item>
                          <Menu.Item onClick={ () => { openModal(OrderEditDialog.id, {  initialValues: order }); closeDropdown(); } }>Edit</Menu.Item>
                          <Menu.Item onClick={ () => { openModal(OrderDeleteDialog.id, { id: order.id }); closeDropdown(); } }>Delete</Menu.Item>
                        </Menu>
                      )
                    }
                  </Dropdown.Body>
                </Dropdown>
              </Table.BodyCell>
            </Table.BodyRow>
          )
        }
      }
    </Table.Body>
  </Table>
);

OrdersTable = compose(
  withModal,
  graphql(sharedGraphQL.ORDERS_LIST_QUERY, { name: 'orders' }),
)(OrdersTable);

export { OrdersTable };
