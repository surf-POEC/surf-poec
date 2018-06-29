import React, { Component } from 'react';
import {
  Button, ButtonGroup,
  Container, Row, Col,
  Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle
} from 'reactstrap';

// import https from 'https';
// import fetch from 'node-fetch';




class Vague extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cSelected: [],
      date: '2018062800',
    };

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }

  onRadioBtnClick(rSelected) {
    this.setState({ rSelected });
  }

  componentDidMount() {
    console.log('Setting fnmoc last run')
    fetch('http://localhost:3333/?fnmoc=atn')
      .then((resp) => resp.json())
      .then((val) => {

        let date = val[0].date;
        console.log('date :',date)
        this.setState({ date })
      })
  }

  render() {
    return (
      <Container>
        <Card>
          <CardBody>


            <CardTitle>Prévision FNMOC</CardTitle>
            <CardSubtitle>Altantic Nord</CardSubtitle>
          </CardBody>
          <img src={`https://www.fnmoc.navy.mil//wxmap_cgi/dynamic/NVG/${this.state.date}/nvg10.sgwvht.012.atlantic.gif`} width="100%" />
          <CardBody>
            <CardText>Selected: {this.state.rSelected}</CardText>
            <ButtonGroup>
              <Button color="primary" onClick={() => this.onRadioBtnClick("vague")} active={this.state.rSelected === 1}>Vague</Button>
              <Button color="primary" onClick={() => this.onRadioBtnClick("vent")} active={this.state.rSelected === 2}>Vent</Button>
              <Button color="primary" onClick={() => this.onRadioBtnClick("date")} active={this.state.rSelected === 3}>Date</Button>
            </ButtonGroup>
          </CardBody>
        </Card>
      </Container >
    );
  }
}

export default Vague;
