import React, { Component } from 'react'
import axios from 'axios';
import UsersOverview from '../blog/UsersOverview';

class ConfirmedLast7Days extends Component {
    constructor() {
        super()
        this.state = {
            title: "Daily New Cases",
            chartData: {

                labels: ["1", "2", "3", "4", "5", "6"],
                //["20200627", "20200628", "20200629", "20200630"],
                datasets: [
                    {
                        label: "Last 7 Days",
                        fill: "start",
                        data: ["0", "0", "0", "0", "0", "0", "0"]
                    }]
            },

        }
    }
    componentDidMount() {
        const dataValue = []
        const dataLabels = []
        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        //COVIDHIS New Confirmed Cases last 7 Days
        const url = 'http://35.225.118.120:8080/api/29/analytics/dataValueSet.json?dimension=dx:pldGAvXW7a7&dimension=pe:TODAY;LAST_7_DAYS&dimension=ou:qKzosKQPl6G&displayProperty=NAME'


        axios.get(proxyurl + url, {
            auth: {
                username: 'Super',
                password: 'Abdymohammed@123'
            }
        }).then(res => {
            res.data.dataValues.map(vals => {
                dataValue.push(vals.value)
                dataLabels.push(vals.period)
            })

            this.setState(prevState => {
                prevState.chartData.datasets[0].data = dataValue
                prevState.chartData.labels = dataLabels


            })
        }

        )
    }
    render() {
        console.log("What the fuck Men")
        return (
            <UsersOverview chartData={this.state.chartData} title={this.state.title}/>
        )
    }
}
export default ConfirmedLast7Days
