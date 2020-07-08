import React from 'react';
import {Card, Heading, Grid,} from '@8base/boost';

import { OrderItemsTable } from './OrderItemsTable';
import { OrderInfoTable } from './OrderInfoTable';
import { OrderItemCreateDialog } from "./OrderItemCreateDialog";

let OrderItems = ({ computedMatch }) => (
  <Grid.Layout padding="xs">
    <Grid.Box>
      <Card padding="md" stretch>
        <Card.Header>
          <Heading type="h4" text="Order Info" />
        </Card.Header>

        <Card.Body padding="none" stretch scrollable>
          <OrderInfoTable orderId={computedMatch.params.id}/>
        </Card.Body>
      </Card>
    </Grid.Box>
    <Grid.Box>
      <Card padding="md" stretch>
        <Card.Header>
          <Heading type="h4" text="Order Items" />
        </Card.Header>

        <OrderItemCreateDialog orderId={computedMatch.params.id}/>

        <Card.Body padding="none" stretch scrollable>
          <OrderItemsTable orderId={computedMatch.params.id}/>
        </Card.Body>
      </Card>
    </Grid.Box>
  </Grid.Layout>

);

export { OrderItems };
