import {Component} from "react"
import {Avatar, Button, Checkbox, List, Spin} from "antd"
import satellite from "../assets/images/satellite.svg"

class SatelliteList extends  Component {
    constructor() {
        super();
        this.state = {
            selected: []
        }
    }

    onChange = e=>{
        const {checked, dataInfo} = e.target;
        const {selected} = this.state;
        console.log("change this sat", dataInfo.satid);
        console.log("add? ", checked);
        const list = this.addOrRemove(dataInfo, checked, selected);
        this.setState({selected: list})
        console.log("in the state", this.state.selected)
    }

    addOrRemove = (dataInfo, checked, selected) =>{
        const found = selected.some( entry => entry.satid === dataInfo.satid);
        if(checked && !found){
            console.log("before add: ", selected);
            selected.push(dataInfo);
            console.log("after add: ", selected);
        }
        if(!checked && found){
            selected = selected.filter(item => item.satid !== dataInfo.satid);
        }
        return selected;
    }

    onShowSatMap = () =>{
        this.props.onShowMap(this.state.selected);
    }


    render() {
        const satList = this.props.satInfo? this.props.satInfo.above : [];
        const {isLoading} = this.props;
        const {selected} = this.state;
        // console.log("satList:  ", satList);
        return(
            <div className="sat-list-box">
                <div className="btn-container">
                    <Button className="sat-list-btn"
                            type="primary"
                            size = "large"
                            disabled={selected.length ===0}
                            onClick ={this.onShowSatMap}
                    >
                        Track on the map
                    </Button>
                </div>
            <hr/>
            {
                isLoading ?
                    <div className="spin-box">
                        <Spin tip="Loading..." size="large"/>
                    </div>
                    :
                    <List
                        className="sat-list"
                        itemLayout="horizontal"
                        size = "small"
                        dataSource = {satList}
                        renderItem = {item => (
                            <List.Item
                                actions={[<Checkbox dataInfo ={item} onChange={this.onChange}/> ]}
                                >
                                <List.Item.Meta
                                    avatar={<Avatar size={50} src={satellite} />}
                                    title={<p>{item.satname}</p>}
                                    description={`Launch Date: ${item.launchDate}`}
                                    />
                            </List.Item>
                        )}
                        />
            }
            </div>
        )
    }
}

export default SatelliteList;