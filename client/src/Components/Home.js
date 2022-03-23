import React, { Component } from 'react';
import {
  MDBMask,
  MDBRow,
  MDBCol,
  MDBView,
  MDBContainer,
  MDBFormInline,
  MDBAnimation,
  MDBIcon, 
  MDBBtn
} from "mdbreact";
import Header from './Header';
import About from './About';
import Contact from './Contact';
import Portfolio from './Portfolio';
//import Sectors from './Sectors';
import Fabmine from './Fabmine';
//import { About, Contact, Portfolio, Sectors, Signup, Signin, Fabmine } from '.';
import { TinyButton as ScrollUpButton } from "react-scroll-up-button";
import BackgroundSlideshow from 'react-background-slider'
import './page.css';

class Main extends Component {
  state = {
    data: [],
    siteText:'',
    siteDesc:'',
    quoteText:'',
    quoteLink:'',
    siteImg:'',
    slide:[],
    images:[],
    image:'',
    firstimage:{},
    slideImages:[],
    slideArray:[],
    item_quote: ''
  };

  constructor(props) {
    super(props);

    let slideArray = [];
    for (var i = 0; i < 100; i++) {
      slideArray.push('');
    }
    this.state = {
      slideArray: slideArray
    };
  }

  componentDidMount() {
    let _this = this;
    fetch('/mix', {
      method: 'GET',
    }).then(res => res.json())
      .then((res) => {
        if (!!res.info) {
          _this.setState({ data: res.info });
        }
      })
    fetch('/basic', {
      method: 'GET',
    }).then(res => res.json())
      .then((res) => {
        if (!!res.info) {
          let siteText = res.info.siteText;
          let siteDesc = res.info.siteDesc;
          let siteImg = res.info.siteImg;     
          let quoteText = res.info.quoteText;
          let quoteLink = res.info.quoteLink;    
          _this.setState({ siteText, siteDesc, siteImg, quoteLink, quoteText });
        }
      })

    fetch(`/quote`)
      .then(res => res.json())
      .then(res => {
          if(!!res.result){
            let quotearray = res.result;
            let quotomap = quotearray.map((data)=><MDBRow><p>{data.description}</p><a href={data.name}>{data.name}</a>
              <hr style={{backgroundColor:'#f0f0f0',width:'100%',height:'1px'}}/></MDBRow>);
            _this.setState({item_quote: quotomap});
          }
      })
      .catch(error => {
          console.log('Please check your connection..!');
      })

    fetch('/slide', {
      method: 'GET',
    }).then(res => res.json())
      .then((res) => {
        if (!!res.result) {
          _this.setState({slideImages:res.result});

          let slideArray = this.state.slideArray;
          for (var n = 0; n < 100;) {
            for (var i = res.result.length - 1; i >= 0; i--) {
              slideArray[n] = res.result[i].image;
              n++;
            }
          }
          
          _this.setState({slideArray:slideArray});
        }
      })
  }

  render() {
    let slideArray = this.state.slideArray;
    
    return (
      <div id="apppage">
        <Header />
        <MDBView>
          <BackgroundSlideshow duration={5} images={slideArray} />
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer>
              <MDBRow>
                <MDBCol md="6" className="white-text text-center text-md-left mt-xl-5 mb-5">
                  <MDBAnimation type="fadeInLeft" delay=".5s">
                    <h1 className="h1-responsive font-weight-bold mt-sm-5">
                      {this.state.siteText}
                    </h1>
                    <hr className="hr-light" />
                    <h6 className="mb-4">
                      {this.state.siteDesc}
                    </h6>
                    <MDBFormInline>
                      {/* <Signin />
                      <Signup /> */}
                    </MDBFormInline>
                  </MDBAnimation>
                </MDBCol>

                <MDBCol md="6" xl="5" className="mt-xl-5">
                  <MDBAnimation type="fadeInRight" delay=".3s">
                    <img
                      src={this.state.siteImg}
                      alt=""
                      className="img-fluid"
                    />
                  </MDBAnimation>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>

        <div id="colorlib-main">
          
          <About data={this.state.data} />
          <Portfolio />
          {/* <Sectors data={this.state.data} /> */}
            <div id='quote' className='quotes text-center' >
              <div className='block-title'>
                  <MDBContainer>
                      <h2>Free Quote</h2>
                      {this.state.item_quote}
                  </MDBContainer>
              </div>
              <div className='quotes-block'>
                  <MDBContainer>
                      <div className='quotes-block-title'>
                          <h2>Work Process</h2>
                          <hr style={{backgroundColor:'#fb3e3e',width:'45px',height:'1px'}}/>
                      </div>
                      <div className='quotes-block-content'>
                      <MDBRow>   <p className='quotes-block-content-p'>{this.state.quoteText}</p></MDBRow>
                          <MDBRow style={{marginTop:'5%'}} >
                              <MDBCol md="4" className="text-md-center mt-xl-5 mb-5">
                                  <div className='quotes-steps'>
                                      <MDBIcon icon="pen-fancy" className="red-text pr-3" size="3x" style={{marginBottom:'5%'}} />
                                      <h3>Tell us what you need</h3>
                                      <p>the big oxmax advised her not to do so.</p>
                                  </div>
                              </MDBCol>
                              <MDBCol md="4" className="text-md-center mt-xl-5 mb-5">
                                  <MDBIcon icon="id-card" className="red-text pr-3" size="3x" style={{marginBottom:'5%'}}/>
                                  <h4>Get Free quotes</h4>
                                  <p>Little Blind Text didn't listen.</p>
                              </MDBCol>
                              <MDBCol md="4" className="text-md-center mt-xl-5 mb-5">
                                  <MDBIcon icon="bullseye" className="red-text pr-3" size="3x" style={{marginBottom:'5%'}}/>
                                  <h3>Deliver high quailty product</h3>
                                  <p>When she reached the first hills.</p>
                              </MDBCol>
                          </MDBRow>
                          <MDBBtn  color="danger" href={this.state.quoteLink}>Get Started <MDBIcon icon="arrow-right" className="ml-1" /></MDBBtn>
                      </div>
                  </MDBContainer>
              </div>
            </div>
          <Contact />
          
        </div>

        <ScrollUpButton
          style={{ background: '#71c11c', padding: '12px 18px', borderRadius: '50%', width: '50px', height: '50px' }}
        />
        <div className = 'fabmine'>
        <Fabmine
        />
        </div>
      </div>
    );
  }
}

export default Main;
