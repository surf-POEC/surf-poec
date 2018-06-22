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
      param: [],
      buoy: 'capferret', // capferret, saintjean
      date: [],
      waves: {
        h13: [],
        hmax: [],
        t13: [],
        dirP: [],
        spread: [],
      },
      waterTemp: [],
      active: 'hs',
    };

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }

  onRadioBtnClick(param) {
    this.setState({ param });
    this.setState({ active: 'temp' })
  }

  componentDidMount = () => {

    fetch(`http://localhost:3333/?buoy=${this.state.buoy}`).then((resp) => resp.json()).then((val) => {

      let date = val[0].date;
      let waves = val[0].waves;
      let waterTemp = val[0].waterTemp;

      this.setState({ date })
      this.setState({ waves })
      this.setState({ waterTemp })

    }).then((error) => { console.log('error', error) })
    return
  }

  get plotData() {
    let data = {
      x: this.state.date,
      y: this.state.waves.h13,
      type: 'scatter',
      mode: 'lines+points',
      marker: { color: 'red' },
    };
    if (this.state.active == 'tp') {
      data.y = this.state.waves.tp
    }
    if (this.state.active == 'temp') {
      data.y = this.state.waterTemp
    }
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
          
          <Plot
            data={[
              this.plotData,
            ]}
            layout={{ width: 600, height: 300, title: 'A Fancy Plot' }}
          />
          <CardBody>
            <CardText>Paramètre: {this.state.param}</CardText>
            <ButtonGroup>
              <Button color="primary" onClick={() => this.onRadioBtnClick("Hauteur significative des vagues")} active={this.state.active === 'hs'}>Hs</Button>
              <Button color="primary" onClick={() => this.onRadioBtnClick("Période des vagues")} active={this.state.active === 'tp'}>Tp</Button>
              <Button color="primary" onClick={() => this.onRadioBtnClick("Température de l'eau")} active={this.state.active === 'temp'}>Temp</Button>
            </ButtonGroup>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default Candhis;
