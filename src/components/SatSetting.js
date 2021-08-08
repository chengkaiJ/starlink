import React, {Component} from 'react';
import {Form, Row, Col, Button, Input, InputNumber} from 'antd';


class SatSettingForm extends Component {
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol:{
                xs : {span : 24},
                sm : {span : 11},
            },
            wrapperCol:{
                xs : { span : 24},
                sm : { span : 13},
            },
        };
        return (
            <Form {...formItemLayout} className="sat-setting" onSubmit={this.showSatellite}>
                <Form.Item label="Longitude(degrees)">
                    {
                        getFieldDecorator('longitude', {
                        rules:[
                            {
                                required: true,
                                message: 'Please input longitude!',
                            },
                        ]
                    })(<InputNumber min={-180} max={180} style={{width:"100%"}}
                                    placeholder="Please input Longitude" />)
                    }
                </Form.Item>

                <Form.Item label="Latitude(degrees)">
                    {
                        getFieldDecorator('latitude', {
                            rules:[
                                {
                                    required: true,
                                    message: 'Please input Latitude!',
                                },
                            ]
                        })(<InputNumber min={-90} max={90} style={{width:"100%"}}
                                        placeholder="Please input Latitude" />)
                    }
                </Form.Item>

                <Form.Item label="Elevation(meters)">
                    {
                        getFieldDecorator('elevation', {
                            rules:[
                                {
                                    required: true,
                                    message: 'Please input elevation!',
                                },
                            ]
                        })(<InputNumber min={-413} max={8850} style={{width:"100%"}}
                                        placeholder="Please input elevation" />)
                    }
                </Form.Item>

                <Form.Item label="Altitude(degrees)">
                    {
                        getFieldDecorator('altitude', {
                            rules:[
                                {
                                    required: true,
                                    message: 'Please input Altitude!',
                                },
                            ]
                        })(<InputNumber min={0} max={90} style={{width:"100%"}}
                                        placeholder="Please input Altitude" />)
                    }
                </Form.Item>

                <Form.Item label="Duration(secs)">
                    {
                        getFieldDecorator("duration", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input your Duration",
                                }
                            ],
                        })(<InputNumber placeholder="Please input Duration" min={0} max={90} style={{width: "100%"}} />)
                    }
                </Form.Item>

                <Form.Item className="show-nearby">
                    <Button type="primary" htmlType="submit" style={{textAlign: "center"}}>
                        Find Nearby Satellite
                    </Button>
                </Form.Item>
            </Form>
        );
    }
    showSatellite = e =>{
        e.preventDefault();
        console.log(e);
        this.props.form.validateFields( (err, values) => {
            if(!err){
                console.log("values of form", values);
                this.props.onShow(values);
            }
        });
    }
}


const SatSetting = Form.create({name: ''})(SatSettingForm);
//HOC ->
// - component as a parameter
// -return a new component


export default SatSetting;
