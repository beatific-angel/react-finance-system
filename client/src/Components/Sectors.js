import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NewsItem from './NewsItem';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

import './page.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Sectors() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [news, setNews] = React.useState([]);
  const [optionData, setOptionData] = React.useState('');
  const [category, setCategory] = React.useState([]);
  const [mix, setMix] = React.useState([]);
  React.useEffect(() => {
    fetch('/managesector', {
          method: 'GET',
        }).then(res => res.json())
          .then((res) => {
            if (!!res.result) {
            let data = res.result;      
            let categorydata = [];
            for (var i = 0; i < data.length; i++) {
              if(data[i].sector === 'Category') categorydata.push(data[i]);
            }
            setCategory(categorydata);
            let optionItems_category = categorydata.map((data) =>
                    <Tab label={data.title}/>
                );
            setOptionData(optionItems_category);
        }
    });
    fetch('/mix', {
      method: 'GET',
    }).then(res => res.json())
      .then((res) => {
        if (!!res.info) {
          
          let aa= res.info
          setMix(aa);

        }
      })
    fetch(`/news`)
      .then(res => res.json())
      .then(res => {
        setNews(res.result)
      })
      .catch(() => {
        console.log('Please check your connection..!');
      })
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id='sectors'>
      <div className={classes.root} >
        <h3 style={{ textAlign: 'center' }}>Sectors</h3>
        <div >
          <AppBar position="static" style={{ zIndex: '0', color: "#0dc835", width: '32%', margin: 'auto', background: 'transparent', marginTop: '3%', boxShadow: 'none' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              id="textcolor"
            >
              {optionData}
            </Tabs>
          </AppBar>
        </div>
        <TabPanel value={value} index={0}>
          <MDBContainer>
            <MDBRow>
              <MDBCol md={4}>
                {(category.length>0 && mix.length > 0)?
                    mix.filter((item)=>item.title === `${category[0].title}`).map((item)=>(
                      <img alt = '111' src={`/${item.image}`} style={{width: '100%'}} />
                    ))
                  
                  :''}
              </MDBCol>
              <MDBCol md={8}>
                <p className="mt-2" style={{ textAlign: 'left' }}>
                {(category.length>0 && mix.length > 0)?
                    mix.filter((item)=>item.title === `${category[0].title}`).map((item)=>(
                      item.description
                    ))
                  
                  :''}
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow><h4>{(category.length > 0) ? `${category[0].title}` :''} News</h4></MDBRow>
          </MDBContainer>

          <div className='team-main'>
            <MDBContainer>
              <MDBRow>
                {(category.length>0 && mix.length > 0)?
                  news.filter((item) => item.sector === `${category[0].title}`).map((item) => (
                    <MDBCol key={item._id} md={4} style={{ minHeight: '270px', }}>
                      <NewsItem item={item} />
                    </MDBCol>
                  ))
                :''}
              </MDBRow>
            </MDBContainer>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MDBContainer>
            <MDBRow>
              <MDBCol md={4}>
                {(category.length>1 && mix.length > 0)?
                    mix.filter((item)=>item.title === `${category[1].title}`).map((item)=>(
                      <img alt = '111' src={`/${item.image}`} style={{width: '100%'}} />
                    ))
                  
                  :''}
              </MDBCol>
              <MDBCol md={8}>
                <p className="mt-2" style={{ textAlign: 'left' }}>
                {(category.length>1 && mix.length > 0)?
                    mix.filter((item)=>item.title === `${category[1].title}`).map((item)=>(
                      item.description
                    ))
                  
                  :''}
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow><h4>{(category.length > 1) ? `${category[1].title}` :''} News</h4></MDBRow>
          </MDBContainer>

          <div className='team-main'>
            <MDBContainer>
              <MDBRow>
                {(category.length>1 && mix.length > 0)?
                  news.filter((item) => item.sector === `${category[1].title}`).map((item) => (
                    <MDBCol key={item._id} md={4} style={{ minHeight: '270px', }}>
                      <NewsItem item={item} />
                    </MDBCol>
                  ))
                :''}
              </MDBRow>
            </MDBContainer>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
                    <MDBContainer>
            <MDBRow>
              <MDBCol md={4}>
                {(category.length>2 && mix.length > 0)?
                    mix.filter((item)=>item.title === `${category[2].title}`).map((item)=>(
                      <img alt = '111' src={`/${item.image}`} style={{width: '100%'}} />
                    ))
                  
                  :''}
              </MDBCol>
              <MDBCol md={8}>
                <p className="mt-2" style={{ textAlign: 'left' }}>
                {(category.length>2 && mix.length > 0)?
                    mix.filter((item)=>item.title === `${category[2].title}`).map((item)=>(
                      item.description
                    ))
                  
                  :''}
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow><h4>{(category.length > 2) ? `${category[2].title}` :''} News</h4></MDBRow>
          </MDBContainer>

          <div className='team-main'>
            <MDBContainer>
              <MDBRow>
                {(category.length>2 && mix.length > 0)?
                  news.filter((item) => item.sector === `${category[2].title}`).map((item) => (
                    <MDBCol key={item._id} md={4} style={{ minHeight: '270px', }}>
                      <NewsItem item={item} />
                    </MDBCol>
                  ))
                :''}
              </MDBRow>
            </MDBContainer>
          </div>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <MDBContainer>
            <MDBRow>
              <MDBCol md={4}>
                {(category.length>3 && mix.length > 0)?
                    mix.filter((item)=>item.title === `${category[3].title}`).map((item)=>(
                      <img alt = '111' src={`/${item.image}`} style={{width: '100%'}} />
                    ))
                  
                  :''}
              </MDBCol>
              <MDBCol md={8}>
                <p className="mt-2" style={{ textAlign: 'left' }}>
                {(category.length>3 && mix.length > 0)?
                    mix.filter((item)=>item.title === `${category[3].title}`).map((item)=>(
                      item.description
                    ))
                  
                  :''}
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow><h4>{(category.length > 3) ? `${category[3].title}` :''} News</h4></MDBRow>
          </MDBContainer>

          <div className='team-main'>
            <MDBContainer>
              <MDBRow>
                {(category.length>3 && mix.length > 0)?
                  news.filter((item) => item.sector === `${category[3].title}`).map((item) => (
                    <MDBCol key={item._id} md={4} style={{ minHeight: '270px', }}>
                      <NewsItem item={item} />
                    </MDBCol>
                  ))
                :''}
              </MDBRow>
            </MDBContainer>
          </div>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <MDBContainer>
            <MDBRow>
              <MDBCol md={4}>
                {(category.length>4 && mix.length > 0)?
                    mix.filter((item)=>item.title === `${category[4].title}`).map((item)=>(
                      <img alt = '111' src={`/${item.image}`} style={{width: '100%'}} />
                    ))
                  
                  :''}
              </MDBCol>
              <MDBCol md={8}>
                <p className="mt-2" style={{ textAlign: 'left' }}>
                {(category.length>4 && mix.length > 0)?
                    mix.filter((item)=>item.title === `${category[4].title}`).map((item)=>(
                      item.description
                    ))
                  
                  :''}
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow><h4>{(category.length > 4) ? `${category[4].title}` :''} News</h4></MDBRow>
          </MDBContainer>

          <div className='team-main'>
            <MDBContainer>
              <MDBRow>
                {(category.length>4 && mix.length > 0)?
                  news.filter((item) => item.sector === `${category[4].title}`).map((item) => (
                    <MDBCol key={item._id} md={4} style={{ minHeight: '270px', }}>
                      <NewsItem item={item} />
                    </MDBCol>
                  ))
                :''}
              </MDBRow>
            </MDBContainer>
          </div>
        </TabPanel>
        <TabPanel value={value} index={5}>
          <MDBContainer>
            <MDBRow>
              <MDBCol md={4}>
                {(category.length>5 && mix.length > 0)?
                    mix.filter((item)=>item.title === `${category[5].title}`).map((item)=>(
                      <img alt = '111' src={`/${item.image}`} style={{width: '100%'}} />
                    ))
                  
                  :''}
              </MDBCol>
              <MDBCol md={8}>
                <p className="mt-2" style={{ textAlign: 'left' }}>
                {(category.length>5 && mix.length > 0)?
                    mix.filter((item)=>item.title === `${category[5].title}`).map((item)=>(
                      item.description
                    ))
                  
                  :''}
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow><h4>{(category.length > 5) ? `${category[5].title}` :''} News</h4></MDBRow>
          </MDBContainer>

          <div className='team-main'>
            <MDBContainer>
              <MDBRow>
                {(category.length>5 && mix.length > 0)?
                  news.filter((item) => item.sector === `${category[5].title}`).map((item) => (
                    <MDBCol key={item._id} md={4} style={{ minHeight: '270px', }}>
                      <NewsItem item={item} />
                    </MDBCol>
                  ))
                :''}
              </MDBRow>
            </MDBContainer>
          </div>
        </TabPanel>
        <TabPanel value={value} index={6}>
          <MDBContainer>
            <MDBRow>
              <MDBCol md={4}>
                {(category.length>6 && mix.length > 0)?
                    mix.filter((item)=>item.title === `${category[6].title}`).map((item)=>(
                      <img alt = '111' src={`/${item.image}`} style={{width: '100%'}} />
                    ))
                  
                  :''}
              </MDBCol>
              <MDBCol md={8}>
                <p className="mt-2" style={{ textAlign: 'left' }}>
                {(category.length>6 && mix.length > 0)?
                    mix.filter((item)=>item.title === `${category[6].title}`).map((item)=>(
                      item.description
                    ))
                  
                  :''}
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow><h4>{(category.length > 6) ? `${category[6].title}` :''} News</h4></MDBRow>
          </MDBContainer>

          <div className='team-main'>
            <MDBContainer>
              <MDBRow>
                {(category.length>6 && mix.length > 0)?
                  news.filter((item) => item.sector === `${category[6].title}`).map((item) => (
                    <MDBCol key={item._id} md={4} style={{ minHeight: '270px', }}>
                      <NewsItem item={item} />
                    </MDBCol>
                  ))
                :''}
              </MDBRow>
            </MDBContainer>
          </div>
        </TabPanel>
        <TabPanel value={value} index={7}>
          <MDBContainer>
            <MDBRow>
              <MDBCol md={4}>
                {(category.length>7 && mix.length > 0)?
                    mix.filter((item)=>item.title === `${category[7].title}`).map((item)=>(
                      <img alt = '111' src={`/${item.image}`} style={{width: '100%'}} />
                    ))
                  
                  :''}
              </MDBCol>
              <MDBCol md={8}>
                <p className="mt-2" style={{ textAlign: 'left' }}>
                {(category.length>7 && mix.length > 0)?
                    mix.filter((item)=>item.title === `${category[7].title}`).map((item)=>(
                      item.description
                    ))
                  
                  :''}
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow><h4>{(category.length > 7) ? `${category[7].title}` :''} News</h4></MDBRow>
          </MDBContainer>

          <div className='team-main'>
            <MDBContainer>
              <MDBRow>
                {(category.length>7 && mix.length > 0)?
                  news.filter((item) => item.sector === `${category[7].title}`).map((item) => (
                    <MDBCol key={item._id} md={4} style={{ minHeight: '270px', }}>
                      <NewsItem item={item} />
                    </MDBCol>
                  ))
                :''}
              </MDBRow>
            </MDBContainer>
          </div>
        </TabPanel>
        <TabPanel value={value} index={8}>
          <MDBContainer>
            <MDBRow>
              <MDBCol md={4}>
                {(category.length>8 && mix.length > 0)?
                    mix.filter((item)=>item.title === `${category[8].title}`).map((item)=>(
                      <img alt = '111' src={`/${item.image}`} style={{width: '100%'}} />
                    ))
                  
                  :''}
              </MDBCol>
              <MDBCol md={8}>
                <p className="mt-2" style={{ textAlign: 'left' }}>
                {(category.length>8 && mix.length > 0)?
                    mix.filter((item)=>item.title === `${category[8].title}`).map((item)=>(
                      item.description
                    ))
                  
                  :''}
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow><h4>{(category.length > 8) ? `${category[8].title}` :''} News</h4></MDBRow>
          </MDBContainer>

          <div className='team-main'>
            <MDBContainer>
              <MDBRow>
                {(category.length>8 && mix.length > 0)?
                  news.filter((item) => item.sector === `${category[8].title}`).map((item) => (
                    <MDBCol key={item._id} md={4} style={{ minHeight: '270px', }}>
                      <NewsItem item={item} />
                    </MDBCol>
                  ))
                :''}
              </MDBRow>
            </MDBContainer>
          </div>
        </TabPanel>
      </div>
    </div>
  );
}