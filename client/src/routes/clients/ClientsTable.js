import React from 'react';
import { compose } from 'recompose';
import * as R from 'ramda';
import { Table, Dropdown, Icon, Menu, withModal, Link } from '@8base/boost';
import { graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';

import { ClientCreateDialog } from './ClientCreateDialog';
import { ClientDeleteDialog } from './ClientDeleteDialog';
import { ClientEditDialog } from './ClientEditDialog';

let ClientsTable = ({ clients, openModal }) => {
  return (
    <Table>
      <Table.Header columns="repeat(5, 1fr) 60px">
        <Table.HeaderCell>First Name</Table.HeaderCell>
        <Table.HeaderCell>Last Name</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Phone</Table.HeaderCell>
        <Table.HeaderCell>Birthday</Table.HeaderCell>
        <Table.HeaderCell/>
      </Table.Header>

      <Table.Body loading={clients.loading} data={R.pathOr([], ['clientsList', 'items'], clients)}
                  action="Create Client" onActionClick={() => openModal(ClientCreateDialog.id)}>
        {
          (client) => (
            <Table.BodyRow columns="repeat(5, 1fr) 60px" key={client.id}>
              <Table.BodyCell>
                {client.firstName}
              </Table.BodyCell>
              <Table.BodyCell>
                {client.lastName}
              </Table.BodyCell>
              <Table.BodyCell>
                {client.email}
              </Table.BodyCell>
              <Table.BodyCell>
                {client.phone}
              </Table.BodyCell>
              <Table.BodyCell>
                {client.birthday}
              </Table.BodyCell>
              <Table.BodyCell>
                <Dropdown defaultOpen={false}>
                  <Dropdown.Head>
                    <Icon name="More" color="LIGHT_GRAY2"/>
                  </Dropdown.Head>
                  <Dropdown.Body pin="right">
                    {
                      ({closeDropdown}) => (
                        <Menu>
                          <Menu.Item><Link target="_blank" href={`clients/${client.id}`} size="sm">Client Orders</Link></Menu.Item>
                          <Menu.Item onClick={() => { openModal(ClientEditDialog.id, { initialValues: client }); closeDropdown(); } }>Edit</Menu.Item>
                          <Menu.Item onClick={() => { openModal(ClientDeleteDialog.id, {id: client.id}); closeDropdown(); } }>Delete</Menu.Item>
                        </Menu>
                      )
                    }
                  </Dropdown.Body>
                </Dropdown>
              </Table.BodyCell>
            </Table.BodyRow>
          )
        }
      </Table.Body>
    </Table>
  )
};

ClientsTable = compose(
  withModal,
  graphql(sharedGraphQL.CLIENTS_LIST_QUERY, { name: 'clients' }),
)(ClientsTable);

export { ClientsTable };
