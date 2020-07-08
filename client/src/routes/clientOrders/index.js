import React from 'react';
import { Card, Heading } from '@8base/boost';

import { ClientOrdersTable } from './ClientOrdersTable';

const ClientOrders = ({ computedMatch }) => (
  <Card padding="md" stretch>
    <Card.Header>
      <Heading type="h4" text="Client Orders" />
    </Card.Header>

    <Card.Body padding="none" stretch scrollable>
      <ClientOrdersTable clientId={computedMatch.params.id}/>
    </Card.Body>
  </Card>
);

export { ClientOrders };
