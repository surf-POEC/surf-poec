import React, { Component } from 'react';
import { Button, ButtonGroup,
         Container, Row, Col,
         Card, CardImg, CardText, CardBody, CardLink,
         CardTitle, CardSubtitle  } from 'reactstrap';
         



class Vague extends Component {
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

            
              <CardTitle>titre</CardTitle>
              <CardSubtitle>soustitre</CardSubtitle>
            </CardBody>
            <img src='https://www.fnmoc.navy.mil//wxmap_cgi/dynamic/NVG/2018052906/nvg10.sgwvht.012.atlantic.gif' width="100%" />
            <CardBody>
              <CardText>Selected: {this.state.rSelected}</CardText>
              <ButtonGroup>
                <Button color="primary" onClick={() => this.onRadioBtnClick("vague")} active={this.state.rSelected === 1}>Vague</Button>
                <Button color="primary" onClick={() => this.onRadioBtnClick("vent")} active={this.state.rSelected === 2}>Vent</Button>
                <Button color="primary" onClick={() => this.onRadioBtnClick("date")} active={this.state.rSelected === 3}>Date</Button>
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

export default Vague;
