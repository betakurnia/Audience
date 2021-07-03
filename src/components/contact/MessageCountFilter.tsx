import React from "react";
import { Form, Row, Col } from "react-bootstrap";

interface MessageCountFilterProps {
  minMax: {
    min: number | undefined;
    max: number | undefined;
  };
  onChangeMessageCountFilter: Function;
  type: "Sent" | "Received";
}

const MessageCountFilter: React.FC<MessageCountFilterProps> = (props) => {
  const { minMax, onChangeMessageCountFilter, type } = props;

  return (
    <div className="mb-3">
      <h2 className="h6"> Message {type}:</h2>
      <Form>
        <Row>
          <Col>
            <Form.Control
              name="min"
              className="message-count-filter__button"
              placeholder="Min"
              type="number"
              value={minMax.min}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onChangeMessageCountFilter(event.target.value, type, "Min");
              }}
            />
          </Col>
          <Col>
            <Form.Control
              name="max"
              className="message-count-filter__button"
              placeholder="Max"
              type="number"
              value={minMax.max}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onChangeMessageCountFilter(event.target.value, type, "Max");
              }}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default MessageCountFilter;
