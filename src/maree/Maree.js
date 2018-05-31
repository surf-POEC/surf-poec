import React, { Component } from 'react';
import {
  Button, ButtonGroup, DropdownButton,
  Container, Row, Col,
  Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle
} from 'reactstrap';
import Chart from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Scatter } from 'react-chartjs-2';

class Maree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cSelected: [],

    };

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }

  recupData= () => {
    const data = {
      labels: ['Scatter'],
      datasets: [
        {
          label: 'My First dataset',
          fill: false,
          showLine: true,  
          backgroundColor: 'rgba(75,192,192,0.4)',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [
            { x: 65, y: 75 },
            { x: 59, y: 49 },
            { x: 80, y: 90 },
            { x: 81, y: 29 },
            { x: 56, y: 36 },
            { x: 55, y: 25 },
            { x: 40, y: 18 },
          ]
        }
      ]
    };
    return data;
  }

  onRadioBtnClick(rSelected) {
    this.setState({ rSelected });
  }

  render() {
    return (
      <Container>
        <Card>
          <CardBody>
            <CardTitle>Marée</CardTitle>
            <CardSubtitle>Graphe des marées</CardSubtitle>
          </CardBody>

        <div className="text">
            <iframe className="MareeJourDetail" src="http://maree.info/134" width="100%" height="500px"></iframe>
        </div>

          
          <img src="http://maree.info/maree-graph.php?p=134&d=20180528&ut=2&scale=1" />
          <Scatter data={this.recupData}/>

          <CardBody>
            <CardText>Selected: {this.state.rSelected}</CardText>
            <ButtonGroup className="ButtonGroup">
              <Button color="primary" onClick={() => this.onRadioBtnClick("spot")} active={this.state.rSelected === 1}>Spot</Button>
            </ButtonGroup>
            <ButtonGroup className="ButtonGroup">
              <Button color="primary" onClick={() => this.onRadioBtnClick("spot")} active={this.state.rSelected === 1}>Spot1</Button>
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
