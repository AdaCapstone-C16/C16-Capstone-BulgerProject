import Accordion from 'react-bootstrap/Accordion';

const Mountain = ({ name, id }) => {
    return (
        <>
            <Accordion>
                <Accordion.Item aria-expanded='false' eventKey={id}>
                    <Accordion.Header>
                        {name}
                    </Accordion.Header>
                    <Accordion.Body>
                        <p>Temp: </p>
                        <p>Wind Speed: </p>
                        <p>Precipitation: </p>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
};


export default Mountain;