import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBRow, MDBCol } from "mdbreact";
import Team from './Team';
class TabsDefault extends Component {

    state = {
        activeItem: "1",
        we: undefined,
        mission: undefined,
        values: undefined,
        team: [],
        data: []
    };

    componentDidMount() {
        let _this = this;
        fetch('/mix', {
            method: 'GET',
        }).then(res => res.json())
            .then((res) => {
                if (!!res.info) {
                    let we = res.info.find(item => item.title === 'How We Are');
                    let mission = res.info.find(item => item.title === 'Our Mission');
                    let values = res.info.find(item => item.title === 'Our Values');
                    _this.setState({ we, mission, values });
                }
            })
        fetch(`/team`)
            .then(res => res.json())
            .then(res => {
                this.setState({ team: res.result });
            })
            .catch(error => {
                console.log('Please check your connection..!');
            })
    }
    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    };
    render() {
        return (
            <Router>
                <MDBContainer id='about'>
                    <MDBRow><h3 style={{ margin: '50px auto 10px' }}>About Us</h3></MDBRow>
                    <MDBRow style={{ minHeight: '400px', }}>
                        <MDBCol
                            md="3"
                            className="text-md-left mt-xl-5 mb-5"
                        >
                            <MDBNav className="flex-column" style={{ maxWidth: '185px' }}>
                                <MDBNavItem>
                                    <MDBNavLink disabled to="#!" style={{ backgroundColor: '#00982d', color: 'white', textAlign: 'center' }}>About Us</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem className={(this.state.activeItem === "1") ? 'custom-active-link' : ''} >
                                    <MDBNavLink to="#!" onClick={this.toggle("1")} role="tab" className="flex-column-tab" >
                                        Who We are</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem className={this.state.activeItem === "2" ? 'custom-active-link' : ''}>
                                    <MDBNavLink to="#!" onClick={this.toggle("2")} role="tab" className="flex-column-tab" >
                                        Our Mission</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem className={this.state.activeItem === "3" ? 'custom-active-link' : ''}>
                                    <MDBNavLink to="#!" onClick={this.toggle("3")} role="tab" className="flex-column-tab" >
                                        Our Values</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem className={this.state.activeItem === "4" ? 'custom-active-link' : ''}>
                                    <MDBNavLink to="#!" onClick={this.toggle("4")} role="tab" className="flex-column-tab" >
                                        Our Team</MDBNavLink>
                                </MDBNavItem>
                            </MDBNav>
                        </MDBCol>
                        <MDBCol md="9" className=" mt-xl-5 mb-5" >


                            <MDBTabContent style={{ minHeight: '400px' }} activeItem={this.state.activeItem} >

                                <MDBTabPane tabId="1" role="tabpanel">
                                    <MDBRow>
                                        <MDBCol md={4}>
                                            {(!!this.state.we) ? <img alt='' src={`/${this.state.we.image}`} style={{ width: '100%' }} /> : ''}

                                        </MDBCol>
                                        <MDBCol md={8}>
                                            <p className="mt-2" style={{ textAlign: 'left' }}>
                                                {(!!this.state.we) ? this.state.we.description : ''}
                                            </p>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBTabPane>

                                <MDBTabPane tabId="2" role="tabpanel">
                                    <MDBRow>
                                    <MDBCol md={4}>
                                            {(!!this.state.mission) ? <img alt='' src={`/${this.state.mission.image}`} style={{ width: '100%' }} /> : ''}

                                        </MDBCol>
                                        <MDBCol md={8}>
                                            <p className="mt-2" style={{ textAlign: 'left' }}>
                                                {(!!this.state.mission) ? this.state.mission.description : ''}
                                            </p>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBTabPane>
                                <MDBTabPane tabId="3" role="tabpanel">
                                    <MDBRow>
                                    <MDBCol md={4}>
                                            {(!!this.state.values) ? <img alt='' src={`/${this.state.values.image}`} style={{ width: '100%' }} /> : ''}

                                        </MDBCol>
                                        <MDBCol md={8}>
                                            <p className="mt-2" style={{ textAlign: 'left' }}>
                                                {(!!this.state.values) ? this.state.values.description : ''}
                                            </p>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBTabPane>
                                <MDBTabPane tabId="4" role="tabpanel" >
                                    <Team team={this.state.team} />

                                </MDBTabPane>
                            </MDBTabContent>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </Router>
        );
    }
}
export default TabsDefault;