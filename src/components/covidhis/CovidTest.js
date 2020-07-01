import React, { Component } from 'react'
import axios from 'axios';
import { isObject } from 'highcharts';

class CovidTest extends Component {
    constructor() {
        super()
        this.state = {
            user: {},
            allData: []
        }
    }

    componentDidMount() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = 'http://35.225.118.120:8080/api/29/analytics/dataValueSet.json?dimension=dx:qjhxv6tdE7x&dimension=pe:TODAY&dimension=ou:qKzosKQPl6G&displayProperty=NAME'
        axios.get(proxyurl + url, {
            auth: {
                username: 'Super',
                password: 'Bootyeater@69'
            }
        })
            .then(res => {
                if(res.data.dataValues){
                    this.setState({
                    allData: parseFloat(res.data.dataValues[0].value)
                })
                   
                    
                }
                else{
                    this.setState({
                        allData: 0
                    })
                }


            })
    }
    render() {
        return (
            <div>
                {this.state.allData}
            </div>
        )
    }
}

export default CovidTest