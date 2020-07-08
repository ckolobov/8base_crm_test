import React from 'react';
import { Form, Field } from '@8base/forms';
import {Dialog, Grid, Button, SelectField, ModalContext, InputField} from '@8base/boost';
import { Query, graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';
import { TOAST_SUCCESS_MESSAGE } from 'shared/constants';

const ORDER_ITEM_CREATE_DIALOG_ID = 'ORDER_ITEM_CREATE_DIALOG_ID';

class OrderItemCreateDialog extends React.Component {
  static contextType = ModalContext;

  onSubmit = async (data) => {
    data.order = {connect: {id: this.props.orderId}};
    await this.props.orderItemCreate({ variables: { data }});

    this.context.closeModal(ORDER_ITEM_CREATE_DIALOG_ID);
  };

  onClose = () => {
    this.context.closeModal(ORDER_ITEM_CREATE_DIALOG_ID);
  };

  renderFormContent = ({ handleSubmit, submitting }) => (
    <form onSubmit={ handleSubmit }>
      <Dialog.Header title="New Order Item" onClose={ this.onClose } />
      <Dialog.Body scrollable>
        <Grid.Layout gap="sm" stretch>
          <Grid.Box>
            <Grid.Box>
              <Query query={ sharedGraphQL.PRODUCTS_LIST_QUERY }>
                {
                  ({ data, loading }) => (
                    <Field
                      name="product"
                      label="Product"
                      placeholder="Select a product"
                      component={ SelectField }
                      loading={ loading }
                      options={ loading ? [] : (data.productsList.items || []).map((product) => ({ value: product.id, label: product.name })) }
                      stretch
                    />
                  )
                }
              </Query>
            </Grid.Box>
            <Grid.Box>
              <Field name="quantity" label="Quantity" type="number" placeholder="Quantity" component={ InputField } />
            </Grid.Box>
          </Grid.Box>
        </Grid.Layout>
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="neutral" variant="outlined" disabled={ submitting } onClick={ this.onClose }>Cancel</Button>
        <Button color="primary" type="submit" loading={ submitting }>Create Order Item</Button>
      </Dialog.Footer>
    </form>
  );

  render() {
    return (
      <Dialog id={ ORDER_ITEM_CREATE_DIALOG_ID } size="sm">
        <Form type="CREATE" tableSchemaName="OrderItems" onSubmit={ this.onSubmit }>
          { this.renderFormContent }
        </Form>
      </Dialog>
    );
  }
}

OrderItemCreateDialog = graphql(sharedGraphQL.ORDER_ITEM_CREATE_MUTATION, {
  name: 'orderItemCreate',
  options: {
    refetchQueries: ['OrderItemsList'],
    context: {
      [TOAST_SUCCESS_MESSAGE]: 'Order item successfully created'
    },
  },
})(OrderItemCreateDialog);

OrderItemCreateDialog.id = ORDER_ITEM_CREATE_DIALOG_ID;

export { OrderItemCreateDialog };
