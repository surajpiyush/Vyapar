import React, { useState } from 'react';
import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap';

const App = () => {
  const [key, setKey] = useState('tab1');

  return (
    <Container>
      <Row>
        <Col>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="tab1" title="Tab 1">
              <p>This is the content for Tab 1.</p>
            </Tab>
            <Tab eventKey="tab2" title="Tab 2">
              <p>This is the content for Tab 2.</p>
            </Tab>
            <Tab eventKey="tab3" title="Tab 3">
              <p>This is the content for Tab 3.</p>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
