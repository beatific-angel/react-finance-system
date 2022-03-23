/* eslint-disable no-unused-vars */
import React,{ useEffect, useState } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBCard, MDBInput } from "mdbreact";
import './page.css';
const color = {
    color:'#979798'
};
export default (props) => {
    const [email, setEmail] = useState('');
    const [email1, setEmail1] = useState('');
    const [phone, setPhone] = useState('');
    const [officeHours, setOfficeHours] = useState('');
    const [address, setAddress] = useState('');
    const [address1, setAddress1] = useState('');

    const [customeremail, setCustomerEmail] = useState('');
    const [customername, setCustomerName] = useState('');
    const [customerdescription, setCustomerDescription] =useState('');
    const [customerrating, setCustomerRating] = useState('');

    const [contactText, setContactText] = useState('');
    const [contactDesc, setContactDesc] = useState('');
    const [setting, setSetting] = useState('');
    const [nameerror, setNameerror] = useState('');
    const [emailerror, setEmailerror] = useState('');
    const [descriptionerror, setDescriptionerror] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();

        let data = new FormData();
        data.append('email', customeremail);
        data.append('description', customerdescription);
        data.append('name', customername);
        data.append('rating',customerrating);
        if(!customeremail){
            setEmailerror("Please enter your email!");
        }
        if(!customername){
            setNameerror("Please enter your name!");
        }
        if(!customerdescription){
            setDescriptionerror("Please enter some description!");
        }
        if(customeremail !== ''&& customerdescription !== '' && customername !== ''){
            fetch('/message', {
            method: 'POST',
            body: data
        }).then(res => res.json())
            .then((res) => {               
                alert("Message sent successfully!");
                setCustomerEmail('');
                setCustomerName('');
                setCustomerDescription('');
            })
        }
        
    }
    useEffect(() => {
        fetch('/basic')
        .then(res => res.json())
            .then((res) => {
                if (!!res.info) {
                    const {
                        email = '',
                        email1 = '',
                        phone = '',
                        officeHours = '',
                        address = '',
                        address1 = '',
                        contactText = '',
                        contactDesc = '',
                    } = res.info;
                    setEmail(email);
                    setEmail1(email1);
                    setPhone(phone);
                    setOfficeHours(officeHours);
                    setAddress(address);
                    setAddress1(address1);
                    setContactText(contactText);
                    setContactDesc(contactDesc);
                }
            })
        fetch('/setting')
        .then(res => res.json())
            .then((res) => {
                let socialarray =[];
                if(!!res.result){
                    let mixdata = res.result;
                    for (var i = mixdata.length - 1; i >= 0; i--) {
                        if(mixdata[i].title === 'sociallink') socialarray.push(mixdata[i]);
                    }
                }
                // eslint-disable-next-line jsx-a11y/alt-text
                let aa= socialarray.map((data)=><li className="list-inline-item"><a href={data.description}><img src={data.image}/></a></li>);
                setSetting(aa);
            })
    }, []);
    return (
    <div id='contact' className='contact-us '>
        <div className='block-title text-center'>
            <MDBContainer>
                <h2>Contact <span style={{fontWeight:'bold'}}>Us</span></h2>
                <MDBRow >   <p id="contact-us-p">{contactText}</p></MDBRow>
            </MDBContainer>
        </div>
        <div >
            <MDBContainer>
                <MDBRow >
                    <MDBCol md="4" className="mt-xl-5 mb-5" >
                        <MDBCard>
                          <span> <MDBIcon icon="map-marker-alt" size="2x" style={{width: '62px',textAlign: 'center'}} className="contact-us-icons" />
                            <div className='contact-steps' >
                                <h6 className="contact-us-h6">Address</h6>
                                <p style={color}>{address}<br/>{address1}</p>
                                
                            </div>
                          </span>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="4" className=" mt-xl-5 mb-5">
                        <MDBCard>
                           <span> 
                            <MDBIcon icon="envelope" size="2x" className="contact-us-icons"  />
                            <div className='contact-steps'>
                                <h6 className="contact-us-h6">Email</h6>
                                <p style={color}>{email}<br/>{email1}</p>
                            </div>
                           </span>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="4" className="mt-xl-5 mb-5">
                        <MDBCard>
                          <span>
                            <MDBIcon icon="phone" size="2x" className="contact-us-icons"  />
                            <div className='contact-steps'>
                                <h6 className="contact-us-h6">Phone</h6>
                                <p style={color}>{phone}<br/>{officeHours}</p>
                            </div>
                          </span>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <MDBRow >
                    <MDBCol md="4" className="text-md-left mt-xl-5 mb-5">
                        <h3>Get in Touch</h3>
                        <hr/>
                        <p style={{ color:'#979798' , paddingRight:'10px' ,}} >
                            {contactDesc}
                        </p>
                        <ul className="list-inline text-center list-unstyled" style={{float:'left',}}>
                            {setting}
                            
                        </ul>
                    </MDBCol>
                    <MDBCol md="8" className="text-md-left mt-xl-5 mb-5">
                        <form onSubmit={handleSubmit}>
                            <MDBRow style={{marginTop:'-2%'}}>
                                <MDBCol md="6">
                                    <div className="md-form mb-0">
                                        <MDBInput type="text" id="contact-name" label="Your name" 
                                         value={customername}
                                            onChange={(e) => {
                                                setCustomerName(e.target.value);
                                                setNameerror('');
                                             }}
                                        />
                                        <p style={{color:'red'}}>{nameerror}</p>
                                    </div>
                                </MDBCol>
                                <MDBCol md="6">
                                    <div className="md-form mb-0">
                                        <MDBInput
                                            type="text"
                                            id="contact-email"
                                            label="Your email"
                                            value={customeremail}
                                            onChange={(e) => {
                                                setCustomerEmail(e.target.value);
                                                setEmailerror('');
                                             }}
                                        />
                                        <p style={{color:'red'}}>{emailerror}</p>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="12">
                                    <div className="md-form mb-0">
                                        <MDBInput
                                            type="textarea"
                                            id="contact-message"
                                            label="Your message"
                                            value={customerdescription}
                                            onChange={(e) => {
                                                setCustomerDescription(e.target.value);
                                                setDescriptionerror('');
                                             }}
                                        />
                                        <p style={{color:'red'}}>{descriptionerror}</p>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="12">
                                    <MDBBtn id="snd-msg" color="success" type="submit">Send Message</MDBBtn>
                                </MDBCol>
                            </MDBRow>
                            
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>

    </div>);
}