import React from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import {
  Row,
  Col,
  FormSelect,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "shards-react";

import Chart from "../../utils/chart";

class UsersByDevice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      male: '',
      female: ''
    }

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = 'http://35.225.118.120:8080/api/29/analytics/dataValueSet.json?dimension=dx:FlLa6bYz9aH&dimension=CMrvZp5rmoC:bqoVhX2RfG4;EVYKU2fIc6G&dimension=pe:TODAY&dimension=ou:qKzosKQPl6G&displayProperty=NAME'
    axios.get(proxyurl + url, {
      auth: {
        username: 'Super',
        password: 'Bootyeater@69'
      }
    })
      .then(res => {
        if (res.data.dataValues) {
          const female = res.data.dataValues[0].value
          const male = 0

   
          this.setState({
            male: male,
            female: female
          })
        }
        else {
          this.setState({
            male: 0,
            female: 0
          })

        }
      })
    const chartConfig = {
      type: "pie",
      data: this.props.chartData,
      options: {
        ...{
          legend: {
            position: "bottom",
            labels: {
              padding: 25,
              boxWidth: 20
            }
          },
          cutoutPercentage: 0,
          tooltips: {
            custom: false,
            mode: "index",
            position: "nearest"
          }
        },
        ...this.props.chartOptions
      }
    };

    new Chart(this.canvasRef.current, chartConfig);
  }

  render() {
    const { title } = this.props;
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="d-flex py-0">
          <canvas
            height="220"
            ref={this.canvasRef}
            className="blog-users-by-device m-auto"
          />
        </CardBody>
        <CardFooter className="border-top">
          <Row>
            <Col>
              <FormSelect
                size="sm"
                value="last-week"
                style={{ maxWidth: "130px" }}
                onChange={() => { }}
              >
                <option value="last-week">Last Week</option>
                <option value="today">Today</option>
                <option value="last-month">Last Month</option>
                <option value="last-year">Last Year</option>
              </FormSelect>
            </Col>
            <Col className="text-right view-report">
              {/* eslint-disable-next-line */}
              <a href="#">View full report &rarr;</a>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }
}

UsersByDevice.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart config object.
   */
  chartConfig: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object,
  /**
   * The chart data.
   */
  chartData: PropTypes.object
};
//console.log(state.male);

UsersByDevice.defaultProps = {
  title: "Daily Deaths",
  chartData: {
    datasets: [
      {
        hoverBorderColor: "#ffffff",
        data: [12, 34],
        backgroundColor: [
          "rgba(0,123,255,1)",
          "rgba(0,123,255,0.7)"
        ]
      }
    ],
    labels: ["Male", "Female"]
  }
};

export default UsersByDevice;