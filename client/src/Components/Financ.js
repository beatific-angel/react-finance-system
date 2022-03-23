/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/role-has-required-aria-props */
import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBInput} from 'mdbreact';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import './finance.css';
import { Modal } from 'antd';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import teal from '@material-ui/core/colors/teal';
import pink from '@material-ui/core/colors/pink';
import blue from '@material-ui/core/colors/blue';
import { TablePagination } from '@material-ui/core';
import { Button } from "antd";
import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Upload from './Upload';

const { confirm } = Modal;

const useStyles = makeStyles(theme => ({
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: theme.spacing(3),
    },
    paper1: {
        height:'100px',
        fontWeight:'bold',
        color:'white',
        backgroundColor:indigo[500]
    },
    paper2: {
        height:'100px',
        fontWeight:'bold',
        color:'white',
        backgroundColor:teal[500]
    },
    paper3: {
        height:'100px',
        fontWeight:'bold',
        color:'white',
        backgroundColor:pink[500]
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
    root: {
        width: '100%',
      },
    container1: {
        maxHeight: 600,
      },
  }));

const Financ = () => {
    const classes = useStyles();
    const [id, setId] = useState('');
    const [visible, setVisible] = useState(false);
    const [newVisible, setNewVisible] = useState(false);
    const [oS, setOS] = useState('');
    const [editOS, setEditOS] = useState('');
    const [emission, setEmission] = React.useState(new Date());
    const [editEmission, setEditEmission] = useState(new Date());
    const [status, setStatus] = useState('');
    const [editStatus, setEditStatus] = useState('');
    const [client, setClient] = useState('');
    const [editClient, setEditClient] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [editPaymentType, setEditPaymentType] = useState('');
    const [amount, setAmount] = useState('');
    const [editAmount, setEditAmount] = useState('');
    const [received, setReceived] = useState('');
    const [editReceived, setEditReceived] = useState('');
    const [balance, setBalance] = useState('');
    const [editBalance, setEditBalance] = useState('');
    const [lastPayment, setLastPayment] = React.useState(new Date());
    const [editLastPayment, setEditLastPayment] = React.useState(new Date());
    const [editOrderDetail, setEditOrderDetail] = React.useState('');
    const [editWorkDetail, setEditWorkDetail] = useState('');
    const [orderDetail, setOrderDetail] = useState('');
    const [workDetail, setWorkDetail] = useState('');

    const [finance, setFinance] = useState('');

    const [totalAmount, setTotalAmount] = useState(0);
    const [totalReceived, setTotalReceived] = useState(0);
    const [totalCollect, setTotalCollect] = useState(0);
    const [visible1, setVisible1] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
      // The first commit of Material-UI

    const [from, setFrom] = React.useState(new Date('2020-01-01T00:00:00'));
    const [to, setTo] = React.useState(new Date());
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const [oSError, setOSError] = useState('');
    const [statusError, setStatusError] = useState('');
    const [clientError, setClientError] = useState('');
    const [paymentTypeError, setPaymentTypeError] = useState('');
    const [amountError, setAmountError] = useState('');
    const [receivedError, setRecivedError] = useState('');
    const [image1Error, setImage1Error] = useState('');
    const [image2Error, setImage2Error] = useState('');

    const [searchval, setSearchval]=useState('');
    const [count, setCount]=useState(0);
    const [image1, setImage1]=useState('');
    const [defaultimage1, setDefaultImage1] = useState(undefined);
    const [image2, setImage2]=useState('');
    const [defaultimage2, setDefaultImage2] = useState(undefined);
    useEffect(() => {
        fetchFinanceData();
    }, []);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const handleEmission = date => {
        setEmission(date);
    }

    const handleEditEmission = date => {
        setEditEmission(date);
    }
    const handleLastPayment = date => {
        setLastPayment(date);
    }

    const handleEditLastPayment = date => {
        setEditLastPayment(date);
    }
    const handleFromDateChange = date => {
        setFrom(date);
        let array = finance.filter(fin=> new Date(fin.emission)-date>=0 && to-new Date(fin.emission)>=0  && (fin.client.includes(searchval)===true || fin.paymentType.includes(searchval)===true || fin.status.includes(searchval)===true || fin.os.includes(searchval)===true));
        let totalAmount=0;
        let totalReceived=0;
        for(var i=0;i<array.length;i++){
            totalAmount +=Number(array[i].amount);
            totalReceived += Number(array[i].received);
        }
        setTotalAmount(totalAmount);
        setTotalReceived(totalReceived);
        setTotalCollect(Number(totalAmount)-Number(totalReceived));
        setCount(array.length);
    };

    const handleToDateChange = date => {
        setTo(date);
        let array = finance.filter(fin=> new Date(fin.emission)-from>=0 && date-new Date(fin.emission)>=0  && (fin.client.includes(searchval)===true || fin.paymentType.includes(searchval)===true || fin.status.includes(searchval)===true || fin.os.includes(searchval)===true));
        let totalAmount=0;
        let totalReceived=0;
        for(var i=0;i<array.length;i++){
            totalAmount +=Number(array[i].amount);
            totalReceived += Number(array[i].received);
        }
        setTotalAmount(totalAmount);
        setTotalReceived(totalReceived);
        setTotalCollect(Number(totalAmount)-Number(totalReceived));
        setCount(array.length);
    };

    const handleSearchChange = e => {
        setSearchval(e.target.value);
        let array = finance.filter(fin=>new Date(fin.emission)-from>=0 && to-new Date(fin.emission)>=0 && (fin.client.includes(e.target.value)===true || fin.paymentType.includes(e.target.value)===true || fin.status.includes(e.target.value)===true || fin.os.includes(e.target.value)===true));

        let totalAmount=0;
        let totalReceived=0;
        for(var i=0;i<array.length;i++){
            totalAmount +=Number(array[i].amount);
            totalReceived += Number(array[i].received);
        }
        setTotalAmount(totalAmount);
        setTotalReceived(totalReceived);
        setTotalCollect(Number(totalAmount)-Number(totalReceived));
        setCount(array.length);
    }

    const handleImage1 = (file) => {
        setImage1(file);
     }

    const handleImage2 = (file) => {
        setImage2(file);
     }
    
    const handleImage1Edit = (file) => {
        setEditOrderDetail(file);
     }

    const handleImage2Edit = (file) => {
        setImage2(file);
        setEditWorkDetail(file);
     }
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    function pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }
    const submitHandler = (e) => {
        e.preventDefault();
        if(oS === ''){
            setOSError('Please fill this field.');
        }
        if(status === ''){
            setStatusError('Please fill this field.');
        }
        if(client === ''){
            setClientError('Please fill this field.');
        }
        if(paymentType === ''){
            setPaymentTypeError('Please fill this field.');
        }
        if(Number(amount) <= 0){
            setAmountError('Please fill this field.');
        }
        if(Number(amount)-Number(received) <0){
            setRecivedError('invalid!');
        }
        if(image1 === ''){
            setImage1Error('Please select the order detail image.');
            alert('Please select the order detail image.');
        }
        if(image2 === ''){
            setImage2Error('Please select the work detail image.');
            alert('Please select the work detail image.');
        }
        if(oS !== '' && status !== '' && client !== '' && paymentType !== '' && Number(amount)>0 && Number(amount)-Number(received)>=0 && image1 !== '' && image2 !== ''){
            let data = new FormData();
            data.append('os', oS);
            data.append('emission', emission);
            data.append('status', status);
            data.append('client', client);
            data.append('paymentType', paymentType);
            data.append('amount', amount);
            data.append('received', received);
            data.append('balance', Number(amount)-Number(received));
            data.append('lastPayment', lastPayment);
            data.append('orderDetail', image1);
            data.append('workDetail', image2);
            fetch('/finance', {
                method: 'POST',
                body: data
            })
                .then(res => {
                    if (res.status === 200) {
                        setNewVisible(false);
                        fetchFinanceData();
                    }
                })
                .catch(error => {
                    console.log('Please check your connection');
                })
        }
        
    }

    const fetchFinanceData = () => {
        setOS('');
        setEmission(new Date());
        setStatus('');
        setClient('');
        setPaymentType('');
        setAmount('');
        setReceived(0);
        setBalance(0);
        setLastPayment(new Date());
        setTotalAmount(0);
        setTotalCollect(0);
        setTotalReceived(0);
        fetch(`/finance`)
            .then(res => res.json())
            .then(res => {
                if(!!res.result){
                    setFinance(res.result);
                    setCount(res.result.length);
                    let finance = res.result;
                    let totalAmount=0;
                    let totalReceived=0;
                    for(var i=0;i<finance.length;i++){
                        totalAmount +=Number(finance[i].amount);
                        totalReceived += Number(finance[i].received);
                    }
                    setTotalAmount(totalAmount);
                    setTotalReceived(totalReceived);
                    setTotalCollect(Number(totalAmount)-Number(totalReceived));
                }               
            })
            .catch(error => {
                console.log('Please check your internet connection..!');
            })
    }
    //in case of collect
    const edit2 = (id) => {
        let editableArrary = finance.filter(item => item._id === id);
        const [editable = {}] = editableArrary;
        const { _id = '', os = '',  emission = '',status='',client='',paymentType='',amount='', received='',balance='',lastPayment='', imgName1='',imgName2='' } = editable;
        setId(_id);
        setEditOS(os);
        setEditEmission(emission);
        setEditStatus(status);
        setEditClient(client);
        setEditPaymentType(paymentType);
        setEditAmount(amount);
        setEditReceived(received);
        setEditBalance(balance);
        setEditOrderDetail(imgName1);
        setEditWorkDetail(imgName2);
        setDefaultImage1(imgName1);
        setDefaultImage2(imgName2);
        //setEditBalance(Number(amount)-Number(received));
        setEditLastPayment(lastPayment);
        setVisible(!visible);
    }
    //in case of view
    const edit1 = (id) => {
        let editableArrary = finance.filter(item => item._id === id);
        const [editable = {}] = editableArrary;
        const { _id = '', os = '',  emission = '',status='',client='',paymentType='',amount='', received='',balance='',lastPayment='',imgName1='', imgName2=''} = editable;
        setId(_id);
        setEditOS(os);
        setEditEmission(emission);
        setEditStatus(status);
        setEditClient(client);
        setEditPaymentType(paymentType);
        setEditAmount(amount);
        setEditReceived(received);
        setEditBalance(balance);
        //setEditBalance(Number(amount)-Number(received));
        setEditLastPayment(lastPayment);
        setEditOrderDetail(imgName1);
        setEditWorkDetail(imgName2);
        setVisible1(!visible1);
    }
    //in case of edit
    const edit = (id) => {
        let editableArrary = finance.filter(item => item._id === id);
        const [editable = {}] = editableArrary;
        const { _id = '', os = '',  emission = '',status='',client='',paymentType='',amount='', received='',balance='',lastPayment='',imgName1='', imgName2='' } = editable;
        setId(_id);
        setEditOS(os);
        setEditEmission(emission);
        setEditStatus(status);
        setEditClient(client);
        setEditPaymentType(paymentType);
        setEditAmount(amount);
        setEditReceived(received);
        setEditBalance(balance);
        setEditOrderDetail(imgName1);
        setEditWorkDetail(imgName2);
        //setEditBalance(Number(amount)-Number(received));
        setEditLastPayment(lastPayment);
        setDefaultImage1(imgName1);
        setDefaultImage2(imgName2);
        setVisibleEdit(!visibleEdit);
    }
    const submitEditHandler = (e) => {
        e.preventDefault()
        let data = new FormData();
        data.append('os', editOS);
        data.append('emission', editEmission);
        data.append('status', editStatus);
        data.append('client', editClient);
        data.append('paymentType', editPaymentType);
        data.append('amount', editAmount);
        data.append('received', editReceived);
        data.append('balance', Number(editAmount)-Number(editReceived));
        data.append('lastPayment', editLastPayment);
        data.append('orderDetail', editOrderDetail);
        data.append('workDetail', editWorkDetail);
        fetch(`/finance/${id}`, {
        method: 'PATCH',
        body: data,
        }).then(res => {
            if (res.status === 201) {
                setId('');
                setEditOS('');
                setEditEmission(new Date());
                setEditStatus('');
                setEditClient('');
                setEditPaymentType('');
                setEditAmount('');
                setEditReceived('');
                setEditBalance('');
                setEditLastPayment(new Date());
                setEditOrderDetail('');
                setEditWorkDetail('');
                setVisible(false);
                setVisibleEdit(false);
                fetchFinanceData();
            }
        })
    }

    const deleteHandler = (id) => {
        fetch(`/finance/${id}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' }
        })
            .then(res => {
                if (res.status === 200) {
                    fetchFinanceData();
                }
            })
    }
    const showDeleteConfirm = (id) => {
        confirm({
            title: 'Do you Want to delete this item?',
            onOk() {
                deleteHandler(id);
            },
            onCancel() {
                console.log('Cancel', id);
            },
        });
    }
    const addNew=()=>{
        setNewVisible(true);
    }

    return (
        <MDBContainer className="text-center">
            <br></br>
            <br></br>
            <p className="h4 text-center mb-4">Finance  Management</p>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <label style={{fontWeight:'bold'}}>Total Amount</label>
                    <Paper className={classes.paper1}>
                        <p style={{fontSize:'15px', textAlign:'left', paddingTop:'10px',paddingLeft:'10px',marginBottom:'0px' }}>R$</p>
                        <p style={{fontSize:'40px',textAlign:'center'}}>{formatNumber(totalAmount)}</p>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <label style={{fontWeight:'bold'}}>Total Received</label>
                    <Paper className={classes.paper2}>
                        <p style={{fontSize:'15px', textAlign:'left', paddingTop:'10px',paddingLeft:'10px',marginBottom:'0px' }}>R$</p>
                        <p style={{fontSize:'40px',textAlign:'center'}}>{formatNumber(totalReceived)}</p>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <label style={{fontWeight:'bold'}}>Total To Collect</label>
                    <Paper className={classes.paper3}>
                        <p style={{fontSize:'15px', textAlign:'left', paddingTop:'10px',paddingLeft:'10px',marginBottom:'0px' }}>R$</p>
                        <p style={{fontSize:'40px',textAlign:'center'}}>{formatNumber(totalCollect)}</p>
                    </Paper>
                </Grid>
            </Grid>
            <br></br>
            <br></br>
            <div style={{textAlign:'left'}}>
                <Fab size="small" color="primary" aria-label="add" name="fabicon" onClick={addNew}>
                        <AddIcon />
                </Fab>
                <label style={{fontWeight:'bold'}}>&nbsp;&nbsp;Add New</label>
            </div>
            <br></br>
            <br></br>
            <MDBRow md={12}>
                <MDBCol md={6}>
                    <MDBRow style={{textAlign:'left'}}>
                        <p style={{fontWeight:'bold'}}>&nbsp;&nbsp;Select Emission Date Period</p>
                    </MDBRow>
                    <MDBRow>            
                        <MDBCol md={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline1"
                                        label="From"
                                        value={from}
                                        onChange={handleFromDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </MDBCol>
                        <MDBCol md={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline2"
                                        label="To"
                                        value={to}
                                        onChange={handleToDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </MDBCol>
                        {/* <MDBRow style={{paddingLeft:'65%'}}>
                        <Button type="primary" onClick={searchByPeriod}>
                            <MDBIcon icon="search" /> Search
                        </Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button type="default" onClick={refresh}>
                            <MDBIcon icon="close" /> Clear
                        </Button>
                        </MDBRow> */}
                    </MDBRow>
                </MDBCol>
                <MDBCol md={6} style={{textAlign:'right'}}>
                    <MDBRow>
                        <p style={{fontWeight:'bold'}}>Select O.S#, Status, Client or Payment type</p>
                    </MDBRow>
                    <MDBRow>
                        <MDBInput label="search key" value={searchval} onChange={handleSearchChange}></MDBInput>
                        {/* <Autocomplete
                            style={{width:'60%'}}
                            {...defaultProps}
                            id="controlled-demo"
                            value={searchval}
                            onChange={(event, newValue) => {
                                setSearchval(newValue);
                                console.log(newValue);
                              }}
                            renderInput={params => (
                            <TextField {...params} label="O.S#, Status, Client or Payment type" margin="normal" fullWidth />
                            )}
                        /> */}
                    </MDBRow>
                </MDBCol>
            </MDBRow>
            <MDBRow>   
                <MDBCol md="12">
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                    <br></br>
                    <Paper className={classes.root}>
                    <TableContainer className={classes.container1}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead style={{backgroundColor:blue[500], color:'white'}}>
                            <TableRow>
                                <TableCell>O.S #</TableCell>
                                <TableCell>Emission</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Client</TableCell>
                                <TableCell>Payment type</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Received</TableCell>
                                <TableCell>Balance</TableCell>
                                <TableCell>Last Payment</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                finance.length ?
                                    finance.filter(fin=> new Date(fin.emission)-from>=0 && to-new Date(fin.emission)>=0 && (fin.client.includes(searchval)===true || fin.paymentType.includes(searchval)===true || fin.status.includes(searchval)===true || fin.os.includes(searchval)===true) ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
                                        
                                        var emissiondate = new Date(item.emission);
                                        var lastPaymentdate = new Date(item.lastPayment);
                                        var editlink = item.balance==='0'?<a style={{color:'blue'}} onClick={()=>edit1(item._id)}>View</a>:
                                                                        <a style={{color:'green'}} onClick={()=>edit2(item._id)}>Collect</a>;
                                        return (
                                            <TableRow key={item._id} hover role="checkbox" tabIndex={-1}>
                                                <TableCell>{item.os}</TableCell>
                                                <TableCell>{pad(emissiondate.getDate())}/{pad(emissiondate.getMonth()+1)}/{emissiondate.getFullYear()}</TableCell>
                                                <TableCell>{item.status}</TableCell>
                                                <TableCell>{item.client}</TableCell>
                                                <TableCell>{item.paymentType}</TableCell>
                                                <TableCell>{item.amount}</TableCell>
                                                <TableCell>{item.received}</TableCell>
                                                <TableCell>{item.balance}</TableCell>
                                                <TableCell>{pad(lastPaymentdate.getDate())}/{pad(lastPaymentdate.getMonth()+1)}/{lastPaymentdate.getFullYear()}</TableCell>
                                                <TableCell>
                                                    {/* <DeleteForeverIcon onClick={() => showDeleteConfirm(item._id)} /> */}
                                                    {editlink}
                                                    &nbsp;&nbsp;
                                                    <a style={{color:'brown'}} onClick={()=>edit(item._id)}>Edit</a>
                                                    &nbsp;&nbsp;
                                                    <a style={{color:'red'}} onClick={()=>showDeleteConfirm(item._id)}>Delete</a>
                                                    {/* <EditIcon onClick={() => edit(item._id)} /> */}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                    : null
                            }
                        </TableBody>
                    </Table>
                    </TableContainer>
                    </Paper>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </MDBCol>
            </MDBRow>
            <Modal
                visible={newVisible}
                title="Add New "
                onOk={submitHandler}
                onCancel={() => { 
                    setOS('');
                    setEmission(new Date());
                    setStatus('');
                    setClient('');
                    setPaymentType('');
                    setAmount('');
                    setReceived('');
                    setBalance(0);
                    setLastPayment(new Date());
                    setOSError('');
                    setStatusError('');
                    setClientError('');
                    setPaymentTypeError('');
                    setAmountError('');
                    setRecivedError('');
                    setImage1Error('');
                    setImage2Error('');
                    setNewVisible(!newVisible); }}
            >
                <form encType='multipart/form-data'>

                    <MDBRow>
                        <MDBCol md="6"  style={{textAlign:'left'}}>
                            <MDBInput
                                label="Service Order Number"
                                type="number"
                                value={oS}
                                onChange={(e) => {
                                    let os = e.target.value;
                                    setOS(os);
                                    setOSError('');
                                }}
                                />
                            <p style={{color:'red'}}>{oSError}</p>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline3"
                                        label="Emission Date"
                                        value={emission}
                                        onChange={handleEmission}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            {/* <MDBInput
                                label="Status"
                                type="text"
                                value={status}
                                onChange={(e) => {
                                    let status = e.target.value;
                                    setStatus(status);
                                }}
                                /> */}
                                <br></br>
                                <FormControl style={{ width: '100%', textAlign: 'left' }}>
                                <InputLabel htmlFor="Status" style={{ width: '100%', textAlign: 'left' }}>Status</InputLabel>
                                <Select
                                    style={{ width: '100%', textAlign: 'left' }}
                                    value={status}
                                    inputProps={{
                                        name: 'Status',
                                        id: 'Status',
                                    }}
                                    onChange={(e) => {
                                        let status = e.target.value;
                                        setStatus(status);
                                        setStatusError('');
                                    }}
                                    >
                                    <MenuItem value="paid">paid</MenuItem>
                                    <MenuItem value="partial">partial</MenuItem>
                                    <MenuItem value="open">open</MenuItem>
                                    <MenuItem value="full">full</MenuItem>
                                </Select>
                            </FormControl>
                            <p style={{color:'red'}}>{statusError}</p>
                        </MDBCol>
                    
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <MDBInput
                                label="Client"
                                type="text"
                                value={client}
                                onChange={(e) => {
                                    let cl = e.target.value;
                                    setClient(cl);
                                    setClientError('');
                                }}
                                />
                            <p style={{color:'red'}}>{clientError}</p>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                        <br></br>
                            <FormControl style={{ width: '100%', textAlign: 'left' }}>
                                <InputLabel htmlFor="PaymentType" style={{ width: '100%', textAlign: 'left' }}>Payment Type</InputLabel>
                                <Select
                                    style={{ width: '100%', textAlign: 'left' }}
                                    value={paymentType}
                                    inputProps={{
                                        name: 'PaymentType',
                                        id: 'PaymentType',
                                    }}
                                    onChange={(e) => {
                                        let pt = e.target.value;
                                        setPaymentType(pt);
                                        setPaymentTypeError('');
                                    }}
                                    >
                                    <MenuItem value="cash">cash</MenuItem>
                                    <MenuItem value="mix">mix</MenuItem>
                                </Select>
                            </FormControl>
                            <p style={{color:'red'}}>{paymentTypeError}</p>
                        </MDBCol>
                    
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <MDBInput
                                label="Amount"
                                type="number"
                                min="0"
                                value={amount}
                                onChange={(e) => {
                                    let amount = e.target.value;
                                    setAmount(amount);
                                    setAmountError('');
                                }}
                                />
                            <p style={{color:'red'}}>{amountError}</p>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <MDBInput
                                label="Received"
                                type="number"
                                min="0"
                                max={amount}
                                value={received}
                                onChange={(e) => {
                                    let received = e.target.value;
                                    setReceived(received);
                                }}
                                />
                            <p style={{color:'red'}}>{receivedError}</p>
                        </MDBCol>
                    
                    <MDBCol md="6" style={{textAlign:'left'}}>
                            <MDBInput
                                label="Balance"
                                type="number"
                                disabled
                                value={Number(amount)-Number(received)}
                                
                                />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" >
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline4"
                                        label="Last Payment Date"
                                        value={lastPayment}
                                        onChange={handleLastPayment}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        
                        <MDBCol md="6">
                        <br></br>
                            <label>Order Detail</label>
                            <Upload handleImage={handleImage1}/>
                            {/* <p>{image1Error}</p> */}
                        </MDBCol>
                        <MDBCol md="6">
                        <br></br>
                            <label>Work Detail</label>
                            <Upload handleImage={handleImage2}/>
                        </MDBCol>
                    </MDBRow>
                </form>
            </Modal>
            <Modal
                visible={visible}
                title="Collect Payment "
                onOk={submitEditHandler}
                onCancel={() => { 
                    setEditOS('');
                    setEditEmission(new Date());
                    setEditStatus('');
                    setEditClient('');
                    setEditPaymentType('');
                    setEditAmount('');
                    setEditReceived('');
                    setEditBalance('');
                    setEditLastPayment(new Date());
                    setVisible(!visible); }}
            >
                <form encType='multipart/form-data'>

                    <MDBRow>
                        <MDBCol md="6"  style={{textAlign:'left'}}>
                            <MDBInput
                                label="Service Order Number"
                                type="number"
                                disabled
                                value={editOS}
                                onChange={(e) => {
                                    let os = e.target.value;
                                    setOS(os);
                                }}
                                />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline5"
                                        label="Emission Date"
                                        value={editEmission}
                                        disabled
                                        onChange={handleEditEmission}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            {/* <MDBInput
                                label="Status"
                                type="text"
                                value={editStatus}
                                disabled
                                onChange={(e) => {
                                    let status = e.target.value;
                                    setStatus(status);
                                }}
                                /> */}
                            <br></br>
                            <FormControl style={{ width: '100%', textAlign: 'left' }}>
                                <InputLabel htmlFor="Status" style={{ width: '100%', textAlign: 'left' }}>Status</InputLabel>
                                <Select
                                    style={{ width: '100%', textAlign: 'left' }}
                                    value={editStatus}
                                    inputProps={{
                                        name: 'Status',
                                        id: 'Status',
                                    }}
                                    onChange={(e) => {
                                        let status = e.target.value;
                                        setEditStatus(status);
                                        //setStatusError('');
                                    }}
                                    >
                                    <MenuItem value="paid">paid</MenuItem>
                                    <MenuItem value="partial">partial</MenuItem>
                                    <MenuItem value="open">open</MenuItem>
                                    <MenuItem value="full">full</MenuItem>
                                </Select>
                            </FormControl>

                        </MDBCol>
                    
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <MDBInput
                                label="Client"
                                type="text"
                                value={editClient}
                                disabled
                                onChange={(e) => {
                                    let cl = e.target.value;
                                    setClient(cl);
                                }}
                                />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            {/* <MDBInput
                                label="Payment Type"
                                type="text"
                                value={editPaymentType}
                                onChange={(e) => {
                                    let pt = e.target.value;
                                    setEditPaymentType(pt);
                                }}
                                /> */}
                                <br></br>
                            <FormControl style={{ width: '100%', textAlign: 'left' }}>
                                <InputLabel htmlFor="PaymentType" style={{ width: '100%', textAlign: 'left' }}>Payment Type</InputLabel>
                                <Select
                                    style={{ width: '100%', textAlign: 'left' }}
                                    value={editPaymentType}
                                    inputProps={{
                                        name: 'PaymentType',
                                        id: 'PaymentType',
                                    }}
                                    onChange={(e) => {
                                        let pt = e.target.value;
                                        setEditPaymentType(pt);
                                        //setPaymentTypeError('');
                                    }}
                                    >
                                    <MenuItem value="cash">cash</MenuItem>
                                    <MenuItem value="mix">mix</MenuItem>
                                </Select>
                            </FormControl>
                        </MDBCol>
                    
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <MDBInput
                                label="Amount"
                                type="number"
                                
                                value={editAmount}
                                onChange={(e) => {
                                    let amount = e.target.value;
                                    setEditAmount(amount);
                                }}
                                />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <MDBInput
                                label="Received"
                                type="number"
                                value={editReceived}
                                onChange={(e) => {
                                    let received = e.target.value;
                                    setEditReceived(received);
                                }}
                                />
                        </MDBCol>
                    
                    <MDBCol md="6" style={{textAlign:'left'}}>
                            <MDBInput
                                label="Balance"
                                type="number"
                                value={Number(editAmount)-Number(editReceived)}
                                disabled
                                onChange={(e) => {
                                    let balance = e.target.value;
                                    setBalance(balance);
                                }}
                                />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" >
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline6"
                                        label="Last Payment Date"
                                        value={editLastPayment}
                                        onChange={handleEditLastPayment}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6">
                            <br></br>
                            <a href={editOrderDetail}>Order Detail</a>
                        </MDBCol>
                        <MDBCol md="6">
                            <br></br>
                            <a href={editWorkDetail}>Work Detail</a>
                        </MDBCol>
                    </MDBRow>
                </form>
            </Modal>
            <Modal
                visible={visibleEdit}
                title="Edit"
                onOk={submitEditHandler}
                onCancel={() => { 
                    setEditOS('');
                    setEditEmission(new Date());
                    setEditStatus('');
                    setEditClient('');
                    setEditPaymentType('');
                    setEditAmount('');
                    setEditReceived('');
                    setEditBalance('');
                    setEditLastPayment(new Date());
                    setEditWorkDetail('');
                    setEditOrderDetail('');
                    setVisibleEdit(!visibleEdit); }}
            >
                <form encType='multipart/form-data'>

                    <MDBRow>
                        <MDBCol md="6"  style={{textAlign:'left'}}>
                            <MDBInput
                                label="Service Order Number"
                                type="number"
                                value={editOS}
                                onChange={(e) => {
                                    let os = e.target.value;
                                    setEditOS(os);
                                }}
                                />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline5"
                                        label="Emission Date"
                                        value={editEmission}
                                        onChange={handleEditEmission}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            {/* <MDBInput
                                label="Status"
                                type="text"
                                value={editStatus}
                                disabled
                                onChange={(e) => {
                                    let status = e.target.value;
                                    setStatus(status);
                                }}
                                /> */}
                            <br></br>
                            <FormControl style={{ width: '100%', textAlign: 'left' }}>
                                <InputLabel htmlFor="Status" style={{ width: '100%', textAlign: 'left' }}>Status</InputLabel>
                                <Select
                                    style={{ width: '100%', textAlign: 'left' }}
                                    value={editStatus}
                                    inputProps={{
                                        name: 'Status',
                                        id: 'Status',
                                    }}
                                    onChange={(e) => {
                                        let status = e.target.value;
                                        setEditStatus(status);
                                        //setStatusError('');
                                    }}
                                    >
                                    <MenuItem value="paid">paid</MenuItem>
                                    <MenuItem value="partial">partial</MenuItem>
                                    <MenuItem value="open">open</MenuItem>
                                    <MenuItem value="full">full</MenuItem>
                                </Select>
                            </FormControl>

                        </MDBCol>
                    
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <MDBInput
                                label="Client"
                                type="text"
                                value={editClient}
                                onChange={(e) => {
                                    let cl = e.target.value;
                                    setEditClient(cl);
                                }}
                                />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            {/* <MDBInput
                                label="Payment Type"
                                type="text"
                                value={editPaymentType}
                                onChange={(e) => {
                                    let pt = e.target.value;
                                    setEditPaymentType(pt);
                                }}
                                /> */}
                                <br></br>
                            <FormControl style={{ width: '100%', textAlign: 'left' }}>
                                <InputLabel htmlFor="PaymentType" style={{ width: '100%', textAlign: 'left' }}>Payment Type</InputLabel>
                                <Select
                                    style={{ width: '100%', textAlign: 'left' }}
                                    value={editPaymentType}
                                    inputProps={{
                                        name: 'PaymentType',
                                        id: 'PaymentType',
                                    }}
                                    onChange={(e) => {
                                        let pt = e.target.value;
                                        setEditPaymentType(pt);
                                        //setPaymentTypeError('');
                                    }}
                                    >
                                    <MenuItem value="cash">cash</MenuItem>
                                    <MenuItem value="mix">mix</MenuItem>
                                </Select>
                            </FormControl>
                        </MDBCol>
                    
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <MDBInput
                                label="Amount"
                                type="number"
                                
                                value={editAmount}
                                onChange={(e) => {
                                    let amount = e.target.value;
                                    setEditAmount(amount);
                                }}
                                />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <MDBInput
                                label="Received"
                                type="number"
                                value={editReceived}
                                onChange={(e) => {
                                    let received = e.target.value;
                                    setEditReceived(received);
                                }}
                                />
                        </MDBCol>
                    
                    <MDBCol md="6" style={{textAlign:'left'}}>
                            <MDBInput
                                label="Balance"
                                type="number"
                                value={Number(editAmount)-Number(editReceived)}
                                disabled
                                onChange={(e) => {
                                    let balance = e.target.value;
                                    setEditBalance(balance);
                                }}
                                />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" >
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline6"
                                        label="Last Payment Date"
                                        value={editLastPayment}
                                        onChange={handleEditLastPayment}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6">
                            <br></br>
                            <a href={editOrderDetail}>Order Detail</a>
                        </MDBCol>
                        <MDBCol md="6">
                            <br></br>
                            <a href={editWorkDetail}>Work Detail</a>
                        </MDBCol>
                    </MDBRow>
                </form>
            </Modal>
            <Modal
                visible={visible1}
                title="View Payment "
                footer={null}
                onCancel={() => { 
                    setVisible1(!visible1); }}
            >
                <form encType='multipart/form-data'>

                    <MDBRow>
                        <MDBCol md="6"  style={{textAlign:'left'}}>
                        
                            <MDBInput
                                label="Service Order Number"
                                type="number"
                                disabled
                                value={editOS}
                                onChange={(e) => {
                                    let os = e.target.value;
                                    setOS(os);
                                }}
                                />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6">
                            
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline5"
                                        label="Emission Date"
                                        value={editEmission}
                                        disabled
                                        onChange={handleEditEmission}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            
                            <MDBInput
                                label="Status"
                                type="text"
                                value={editStatus}
                                disabled
                                onChange={(e) => {
                                    let status = e.target.value;
                                    setStatus(status);
                                }}
                                />
                        </MDBCol>
                    
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            
                            <MDBInput
                                label="Client"
                                type="text"
                                value={editClient}
                                disabled
                                onChange={(e) => {
                                    let cl = e.target.value;
                                    setClient(cl);
                                }}
                                />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <MDBInput
                                label="Payment Type"
                                type="text"
                                disabled
                                value={editPaymentType}
                                onChange={(e) => {
                                    let pt = e.target.value;
                                    setEditPaymentType(pt);
                                }}
                                />
                        </MDBCol>
                    
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <MDBInput
                                label="Amount"
                                type="number"
                                disabled
                                value={editAmount}
                                onChange={(e) => {
                                    let amount = e.target.value;
                                    setEditAmount(amount);
                                }}
                                />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <MDBInput
                                label="Received"
                                type="number"
                                value={editReceived}
                                disabled
                                onChange={(e) => {
                                    let received = e.target.value;
                                    setEditReceived(received);
                                }}
                                />
                        </MDBCol>
                    
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <MDBInput
                                label="Balance"
                                type="number"
                                value={Number(editAmount)-Number(editReceived)}
                                disabled
                                />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" >
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        disabled
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline6"
                                        label="Last Payment Date"
                                        value={editLastPayment}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6">
                            <br></br>
                            <a href={editOrderDetail}>Order Detail</a>
                        </MDBCol>
                        <MDBCol md="6">
                            <br></br>
                            <a href={editWorkDetail}>Work Detail</a>
                        </MDBCol>
                    </MDBRow>
                </form>
            </Modal>

        </MDBContainer>
    );
};

export default Financ;