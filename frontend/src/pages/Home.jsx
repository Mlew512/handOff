import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home = () => {
  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Row className="gx-4 gy-4">
        <Col md={12} lg={12} xl={12}>
          <Card className="shadow">
            <Card.Body>
              <header className="text-center">
                <h2>HandOff Overview</h2>
              </header>
              <section className="mt-4">
                <p>
                  Nurse-centric and designed Hand-off app curated to streamline and improve
                  the patient hand-off process. The primary goal of this app is to pull
                  relevant patient information and present it in an easy-to-read and
                  organized format for a smooth transition between nursing shifts.
                </p>
              </section>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={6} xl={6}>
          <Card className="shadow">
            <Card.Body>
              <h2>Key Features</h2>
              <ul>
                <li>User Authentication</li>
                <li>Patient Information Database</li>
                <li>Real-time Sync</li>
                <li>Ai Generated Summaries of multiple assessments</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={6} xl={6}>
          <Card className="shadow">
            <Card.Body>
              <h2>Benefits</h2>
              <ul>
                <li>Efficiency: Streamlines the hand-off process, saving time for patient care</li>
                <li>Accuracy: Minimizes the risk of errors</li>
                <li>Communication: Enhances communication between shifts</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={6} xl={6}>
          <Card className="shadow">
            <Card.Body>
              <h2>HandOff App Mission</h2>
              <p>
                HandOff aims to enhance patient care by ensuring a
                smooth transition of information between nursing shifts, ultimately
                improving the overall efficiency and effectiveness of healthcare
                delivery.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={6} xl={6}>
          <Card className="shadow">
            <Card.Body>
              <h2>Additional Notes for Next Release</h2>
              <ul>
                <li>Expanding data interpretation to include labs, medications, and intake and output data</li>
                <li>An improved assessment documentation interface</li>
                <li>More advanced and detailed Ai responses with the latest Ai models.</li>
                <li>Role-based access</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
