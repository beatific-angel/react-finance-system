import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Item from './PortfolioItems';
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

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function Portfolio() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [portfolio, setPortfolio] = React.useState([]);
    const [optionData, setOptionData] = React.useState('');
    const [category, setCategory] = React.useState([]);
    React.useEffect(() => {
        fetch(`/portfolio`)
            .then(res => res.json())
            .then(res => {
                setPortfolio(res.result)
            })
            .catch(error => {
                console.log('Please check your connection..!');
            })
        fetch('/managesector', {
          method: 'GET',
        }).then(res => res.json())
          .then((res) => {
            if (!!res.result) {
            let data = res.result;      
            let categorydata = [];
            for (var i = 0; i < data.length ; i++) {
              if(data[i].sector === 'Category') categorydata.push(data[i]);
            }
            setCategory(categorydata);
            let optionItems_category = categorydata.map((data) =>
                    <Tab label={data.title} id={data._id} />
                );
            setOptionData(optionItems_category);
        }
      });
    }, []);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <MDBContainer id='portfolio'>
            <div className={classes.root} style={{ textAlign: 'center', margin: '0' }}>
                <h3>Portfolio</h3>
                <div>

                    <AppBar position="static" style={{ color: "#0dc835", width: '60%', margin: 'auto', background: 'transparent', marginTop: '3%', boxShadow: 'none', zIndex:'0' }}>
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
                            <Tab label="All" {...a11yProps(0)} />
                            {optionData}
                        </Tabs>
                    </AppBar>
                </div>

                <TabPanel value={value} index={0}>
                    <MDBContainer>
                        <MDBRow>
                            {
                                portfolio.map((item) => (
                                    <MDBCol  key={item._id} md={4} style={{ minHeight: '240px',}}>
                                        <Item item={item} />
                                    </MDBCol>
                                ))
                            }
                        </MDBRow>
                    </MDBContainer>


                </TabPanel>
                <TabPanel value={value} index={1}>
                    <MDBRow>
                        {(category.length > 0)?
                            portfolio.filter((item) => item.sector === `${category[0].title}`).map((item) => (
                                <MDBCol  key={item._id} md={4} style={{ minHeight: '240px',}}>
                                    <Item item={item} />
                                </MDBCol>
                            ))
                        :''}
                    </MDBRow>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <MDBRow>
                        {(category.length > 1)?
                            portfolio.filter((item) => item.sector === `${category[1].title}`).map((item) => (
                                <MDBCol  key={item._id} md={4} style={{ minHeight: '240px',}}>
                                    <Item item={item} />
                                </MDBCol>
                            ))
                        :''}
                    </MDBRow>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <MDBRow>
                        {(category.length > 2)?
                            portfolio.filter((item) => item.sector === `${category[2].title}`).map((item) => (
                                <MDBCol  key={item._id} md={4} style={{ minHeight: '240px',}}>
                                    <Item item={item} />
                                </MDBCol>
                            ))
                        :''}
                    </MDBRow>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <MDBRow>
                        {(category.length > 3)?
                            portfolio.filter((item) => item.sector === `${category[3].title}`).map((item) => (
                                <MDBCol  key={item._id} md={4} style={{ minHeight: '240px',}}>
                                    <Item item={item} />
                                </MDBCol>
                            ))
                        :''}
                    </MDBRow>
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <MDBRow>
                        {(category.length > 4)?
                            portfolio.filter((item) => item.sector === `${category[4].title}`).map((item) => (
                                <MDBCol  key={item._id} md={4} style={{ minHeight: '240px',}}>
                                    <Item item={item} />
                                </MDBCol>
                            ))
                        :''}
                    </MDBRow>
                </TabPanel>
                <TabPanel value={value} index={6}>
                    <MDBRow>
                        {(category.length > 5)?
                            portfolio.filter((item) => item.sector === `${category[5].title}`).map((item) => (
                                <MDBCol  key={item._id} md={4} style={{ minHeight: '240px',}}>
                                    <Item item={item} />
                                </MDBCol>
                            ))
                        :''}
                    </MDBRow>
                </TabPanel>
                <TabPanel value={value} index={7}>
                    <MDBRow>
                        {(category.length > 6)?
                            portfolio.filter((item) => item.sector === `${category[6].title}`).map((item) => (
                                <MDBCol  key={item._id} md={4} style={{ minHeight: '240px',}}>
                                    <Item item={item} />
                                </MDBCol>
                            ))
                        :''}
                    </MDBRow>
                </TabPanel>
                <TabPanel value={value} index={8}>
                    <MDBRow>
                        {(category.length > 7)?
                            portfolio.filter((item) => item.sector === `${category[7].title}`).map((item) => (
                                <MDBCol  key={item._id} md={4} style={{ minHeight: '240px',}}>
                                    <Item item={item} />
                                </MDBCol>
                            ))
                        :''}
                    </MDBRow>
                </TabPanel>

            </div>
        </MDBContainer>
    );
}
