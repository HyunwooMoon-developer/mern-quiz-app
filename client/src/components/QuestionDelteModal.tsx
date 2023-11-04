import { Button, Col, Modal, Row } from 'react-bootstrap';

const QuestionDeleteModal = ({
  open,
  onClose,
  onDelete,
}: {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}) => (
  <Modal show={open} onHide={onClose} centered>
    <Modal.Header closeButton>Are your sure to delete question?</Modal.Header>
    <Modal.Footer>
      <Row>
        <Col>
          <Button onClick={onDelete} variant="outline-primary">
            Confirm
          </Button>
        </Col>
        <Col>
          <Button onClick={onClose} variant="outline-danger">
            Cancel
          </Button>
        </Col>
      </Row>
    </Modal.Footer>
  </Modal>
);

export default QuestionDeleteModal;
