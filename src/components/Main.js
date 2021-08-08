import React, {Component} from 'react';
import { Row, Col } from 'antd';
import SatSetting from "./SatSetting"
import SatelliteList from "./SatelliteList"
import {NEARBY_SATELLITE, SAT_API_KEY, STARLINK_CATEGORY} from "../constants"
import axios from "axios"
import WorldMap from "./WorldMap"

class Main extends Component {
    constructor() {
        super();
        this.state = {
            satInfo: null,
            settings: null,
            isLoadingList : false,
            satList : null
        };
    }

    showNearbySatellite = (setting) =>{
        this.setState({
            settings: setting
        });
        this.fetchSatellite(setting);
    }

    fetchSatellite = (settings) => {
        const {latitude, longitude, elevation, altitude} = settings;
        const url = `/api/${NEARBY_SATELLITE}/${latitude}/${longitude}/${elevation}/${altitude}/${STARLINK_CATEGORY}
        /&apiKey=${SAT_API_KEY}`;

        this.setState({
            isLoadingList : true
        });

        axios.get(url)
            .then(res => {
            console.log("sat data in main: ", res.data);
                this.setState({
                    isLoadingList : false,
                    satInfo: res.data
                })
            })
            .catch(error => {
                console.log("error in fetch satList data");
            })

    }

    showMap = data => {
        console.log("data in main",data);
        this.setState(preState => ({
            ...preState,
            satList : [...data]
        }));
    }


    render() {
        const {satInfo, settings, satList} = this.state;
        return (
            <Row className='main'>
                <Col span={8} >
                    <SatSetting onShow ={this.showNearbySatellite}/>
                    <SatelliteList onShowMap = { this.showMap } satInfo = {satInfo} isLoading={this.state.isLoadingList}/>
                </Col>
                <Col span={16} className="right-side">
                    <WorldMap observerData = {settings} satData = {satList}/>
                </Col>
            </Row>
        );
    }

}

export default Main;
