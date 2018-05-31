import React, { Component } from 'react';
import {
  Button, ButtonGroup,
  Container, Row, Col,
  Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle
} from 'reactstrap';
import Plot from 'react-plotly.js';


class Candhis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cSelected: [],
      waves: {
        date: [],
        h13: [],
        hmax: [],
        t13: [],
        dirP: [],
        spread: [],
      },
      waterTemp: [],
    };

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }

  onRadioBtnClick(rSelected) {
    this.setState({ rSelected });
  }

  componentDidMount = () => {
    const waves = [];
    fetch('http://localhost:3333/').then((resp) => resp.text()).then((val) => {
      let dates = val.split('<td align="center" nowrap="NOWRAP">')
      console.log('val: ', dates[1])
      for (let i = 1; i < dates.length; i++) {
        let params = dates[i].split('</td>\n\t\t\t<td align="center">')
        waves.push({
          date: params[0],
          h13: params[1],
        });
      }
      console.log('waves: ', waves)

      this.setState({ waves })
      console.log('state', this.state.waves)
      console.log('date2', this.state.waves.date)
      console.log('h132', this.state.waves.h13)
    }).then((error) => { console.log('error', error) })
    return
  }

  get plotData() {
    let data = {
      x: this.state.waves.h13,
      y: this.state.waves.h13,
      type: 'scatter',
      mode: 'lines+points',
      marker: { color: 'red' },
    };
    return data
  }

  render() {
    return (
      <Container>
        <Card>
          <CardBody>
            <CardTitle>Etats de mer</CardTitle>
            <CardSubtitle>houlographe Candhis</CardSubtitle>
          </CardBody>
          <iframe ref="candhisTable" src="http://candhis.cetmef.developpement-durable.gouv.fr/campagne/inc-tempsreel.php?idcampagne=6c8349cc7260ae62e3b1396831a8398f" width="100%" />
          {console.log('date', this.state.waves.date)}
          {console.log('h13', this.state.waves.h13)}
          <Plot
            data={[
              this.plotData,
            ]}
            layout={{ width: 600, height: 300, title: 'A Fancy Plot' }}
          />
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

export default Candhis;
