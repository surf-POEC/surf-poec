import React, { Component } from 'react';
import { Button, ButtonGroup,
  Container, Row, Col,
  Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle  } from 'reactstrap';

class Maree extends Component {
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
            <img src="http://maree.info/maree-graph.php?p=134&amp;d=20180529&amp;ut=2&amp;scale=1"/>
            <CardBody>
              <CardText>Selected: {this.state.rSelected}</CardText>
              <ButtonGroup>
                <Button color="primary" onClick={() => this.onRadioBtnClick("spot")} active={this.state.rSelected === 1}>Spot</Button>
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

export default Maree;
