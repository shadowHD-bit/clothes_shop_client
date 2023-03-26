import "bootstrap/dist/css/bootstrap.min.css";
import "./sliderPopular.scss";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function card() {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="./img/card/defaultCard.jpg" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default card;
