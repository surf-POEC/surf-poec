import React, { Component } from 'react';
import { Button, ButtonGroup,
  Container, Row, Col,
  Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle  } from 'reactstrap';
  


class Alphonse extends Component {
  constructor (props) {
    super(props);

    this.state = { cSelected: [] };

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }

  onRadioBtnClick(rSelected) {
    this.setState({ rSelected });
  }

  render() {
    return (
       <Container>
          <Card>
            <CardBody>
              <CardTitle>Titre</CardTitle>
              <CardSubtitle>soustitre</CardSubtitle>
            </CardBody>
            <iframe className="candhisTable" src="http://candhis.cetmef.developpement-durable.gouv.fr/campagne/inc-tempsreel.php?idcampagne=f7177163c833dff4b38fc8d2872f1ec6" width="100%"/>
            <CardBody>
              <CardText>Selected: {this.state.rSelected}</CardText>
              <ButtonGroup>
                <Button color="primary" onClick={() => this.onRadioBtnClick("option")} active={this.state.rSelected === 1}>Option</Button>
              </ButtonGroup>
              <CardText>
                <small className="text-muted">Last updated 3 mins ago</small>
              </CardText>
            </CardBody>
          </Card>
      </Container>
    );
  }
}

export default Alphonse;
