import './App.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Mountain from './components/Mountain';
import data from './assets/json_data.json';


// Import Mountain Data from JSON file
const generateMountainList = () => {
  const mountains = [];
  const mtn_data = data["Bulger Peaks"]

  // Creates list of all Mountains in JSON file
  mtn_data.forEach((mtn) => {
    mountains.push(mtn);
  });

  // Generates Mountain components from 'mountains' array
  const mountainComponents = mountains.map((mtn, index) => {
    return (
      <Mountain
        id={index}
        key={index}
        rank={mtn["Rank"]}
        name={mtn["Name"]}
        indig_name={mtn["Indigenous Name"]}
        elevation={mtn["Elevation"]}
        link={mtn["Link"]}
        coords={mtn["Coordinates"]}
        range={mtn["Range"]}
      />
    );
  });
  return <>{mountainComponents}</>
};

function App() {
  return (
    <>
      <header>
        {/* TODO: Float LOGIN right with Flexbox */}
        <Container fluid="md">
          <Row lg={6}>
            <Col lg={{ span: 6 }}>
              <h1>Weathering Heights</h1>
            </Col>
            <Col lg={{ span: 1, offset: 4 }}>
              <h4>Login</h4>
            </Col>
          </Row>
        </Container> 
      </header>
      <body>
        <Container fluid="md">
          {/* Array of Mountain Components */}
          <>{generateMountainList()}</>
        </Container>
      </body>
    </>
  );
}

export default App;
