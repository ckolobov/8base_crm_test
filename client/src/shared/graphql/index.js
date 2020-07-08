import gql from 'graphql-tag';

export const BROKER_CREATE_MUTATION = gql`
  mutation BrokerCreate($data: BrokerCreateInput!) {
    brokerCreate(data: $data) {
      id
    }
  }
`;

export const BROKER_DELETE_MUTATION = gql`
  mutation BrokerDelete($id: ID!) {
    brokerDelete(data: { id: $id }) {
      success
    }
  }
`;

export const BROKERS_LIST_QUERY = gql`
  query BrokersList {
    brokersList {
      items {
        id
        user {
          email
          firstName
          lastName
        }
        listings {
          count
        }
      }
    }
  }
`;

export const CLIENT_CREATE_MUTATION = gql`
  mutation ClientCreate($data: ClientCreateInput!) {
    clientCreate(data: $data) {
      id
    }
  }
`;

export const CLIENT_DELETE_MUTATION = gql`
  mutation ClientDelete($id: ID!) {
    clientDelete(data: { id: $id }) {
      success
    }
  }
`;

export const CLIENT_UPDATE_MUTATION = gql`
  mutation ClientUpdate($data: ClientUpdateInput!) {
    clientUpdate(data: $data) {
      id
    }
  }
`;

export const CLIENTS_LIST_QUERY = gql`
  query ClientsList {
    clientsList {
      items {
        id
        firstName
        lastName
        email
        phone
        birthday
      }
    }
  }
`;

export const PRODUCT_CREATE_MUTATION = gql`
  mutation ProductCreate($data: ProductCreateInput!) {
    productCreate(data: $data) {
      id
    }
  }
`;

export const PRODUCT_DELETE_MUTATION = gql`
  mutation ProductDelete($id: ID!) {
    productDelete(data: { id: $id }) {
      success
    }
  }
`;

export const PRODUCT_UPDATE_MUTATION = gql`
  mutation ProductUpdate($data: ProductUpdateInput!) {
    productUpdate(data: $data) {
      id
    }
  }
`;

export const PRODUCTS_LIST_QUERY = gql`
  query ProductsList {
    productsList {
      items {
        id
        name
        description
        picture {
          id
          downloadUrl
          shareUrl
        }
        price
      }
    }
  }
`;

export const ORDER_CREATE_MUTATION = gql`
  mutation OrderCreate($data: OrderCreateInput!) {
    orderCreate(data: $data) {
      id
    }
  }
`;

export const ORDER_DELETE_MUTATION = gql`
  mutation OrderDelete($id: ID!) {
    orderDelete(data: { id: $id }) {
      success
    }
  }
`;

export const ORDER_UPDATE_MUTATION = gql`
  mutation OrderUpdate($data: OrderUpdateInput!) {
    orderUpdate(data: $data) {
      id
    }
  }
`;

export const ORDERS_LIST_QUERY = gql`
  query OrdersList {
    ordersList {
      items {
        id
        client {
          id
          firstName
          lastName
        }
        address
        deliveryDt
        comment
        status
        orderItems {
          items {
            quantity
            product {
              price
            }
          }
        }
      }
    }
  }
`;

export const ORDER_INFO_QUERY = gql`
  query OrderInfo($orderId: ID!) {
    order(id: $orderId) {
      id
      client {
        id
        firstName
        lastName
      }
      address
      deliveryDt
      comment
      status
      orderItems {
        items {
          quantity
          product {
            price
          }
        }
      }
    }
  }
`;

export const CLIENT_ORDERS_LIST_QUERY = gql`
  query OrdersList($clientId: ID) {
    ordersList(filter: {client: {id: {equals: $clientId}}}) {
      items {
        id
        client {
          id
          firstName
          lastName
        }
        address
        deliveryDt
        comment
        status
      }
    }
  }
`;

export const ORDER_ITEMS_LIST_QUERY = gql`
  query OrderItemsList($orderId: ID) {
    orderItemsList(filter: {order: {id: {equals: $orderId}}}) {
      items {
        product {
          name
          price
        }
        quantity
      }
    }
  }
`;

export const ORDER_ITEM_CREATE_MUTATION = gql`
  mutation OrderItemCreate($data: OrderItemCreateInput!) {
    orderItemCreate(data: $data) {
      id
    }
  }
`;