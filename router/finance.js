const app = require('express').Router();
const Finance = require('../models/Finance');
const mongoose = require('mongoose');
const fs = require('fs')

app.get('/', (req, res, next) => {
    Finance.find({}).then(result => {
        res.status(200).json({
            result
        })
    }).catch(error => {
        res.status(500).json({
            error
        })
    });
});
app.patch('/:id', async (req, res) => {
    const { os, emission, status, client, paymentType, amount, received, balance, lastPayment } = req.body;
    // let imgName1 = '';
    // let imgName2 = '';
    // if (!!req.files && !!req.files.orderDetail&&!!req.files.orderDetail.name && !!req.files.workDetail &&!!req.files.workDetail.name) {
    //     let imageFile1 = req.files.orderDetail;
    //     let imageFile2 = req.files.workDetail;
    //     const fileName = Date.now();
    //     const getFileName1 = req.files.orderDetail.name;
    //     const getFileName2 = req.files.workDetail.name;
    //     imgName1 = fileName + getFileName1;
    //     if(getFileName1 === getFileName2){
    //         imgName2 = '11'+fileName+getFileName2;
    //     }else{
    //         imgName2 = fileName + getFileName2;
    //     }
    //     const dirName = __dirname.replace('router', 'public');
    //     await imageFile1.mv(`${dirName}/images/${imgName1}`);
    //     await imageFile2.mv(`${dirName}/images/${imgName2}`);
    // }
    let finance = { os, emission, status, client, paymentType, amount, received, balance, lastPayment};
    // if(imgName1 !=='' && imgName2 !==''){
    //     finance = { os, emission, status, client, paymentType, amount, received, balance, lastPayment, imgName1, imgName2};
    // }else{
    //     if(imgName1 !==''){
    //         finance = { os, emission, status, client, paymentType, amount, received, balance, lastPayment, imgName1};
    //     }
    //     if(imgName2 !==''){
    //         finance = { os, emission, status, client, paymentType, amount, received, balance, lastPayment, imgName2};
    //     }
    // }
    
    Finance.updateOne({ _id: req.params.id },
        finance,
        { upsert: true, setDefaultsOnInsert: true }).then(documents => {
            res.status(201).json({
                message: 'successfully updated!',
                info: documents
            });
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
});
app.post('/', async (req, res) => {
    const { os, emission, status, client, paymentType, amount, received, balance, lastPayment } = req.body;
    let imgName1 = '';
    let imgName2 = '';
    if (!!req.files) {
        let imageFile1 = req.files.orderDetail;
        let imageFile2 = req.files.workDetail;
        const fileName = Date.now();
        const getFileName1 = req.files.orderDetail.name;
        const getFileName2 = req.files.workDetail.name;
        imgName1 = fileName + getFileName1;
        if(getFileName1 === getFileName2){
            imgName2 = '11'+fileName+getFileName2;
        }else{
            imgName2 = fileName + getFileName2;
        }
        const dirName = __dirname.replace('router', 'public');
        await imageFile1.mv(`${dirName}/images/${imgName1}`);
        await imageFile2.mv(`${dirName}/images/${imgName2}`);
    }
            const finance = new Finance({
                _id: new mongoose.Types.ObjectId(),
                os, emission, status, client, paymentType, amount, received, balance, lastPayment, imgName1, imgName2
            });
            finance.save().then(result => {
                res.status(200).json({
                    message: 'successfully added!',
                    result
                })
            }).catch(err => {
                res.status(500).json({
                    error: err
                });
            });
});

// app.post('/searchByPeriod', async (req, res) => {
//     const { from, to } = req.body;
//     Finance.find({}).then(result => {
//         res.status(200).json({
//             result
//         })
//     }).catch(error => {
//         res.status(500).json({
//             error
//         })
//     });
// });

app.delete('/:id', (req, res, next) => {
    Finance.find({_id: req.params.id}).then(result=>{
        if(!!result[0].imgName1 && result[0].imgName1 !== '') {
            const dirName = __dirname.replace('router', 'public');
            fs.unlinkSync(`${dirName}/images/${result[0].imgName1}`);
        }
        if(!!result[0].imgName2 && result[0].imgName2 !== ''){
            const dirName1 = __dirname.replace('router', 'public');
            fs.unlinkSync(`${dirName1}/images/${result[0].imgName2}`);
        }
        
    });
    
    Finance.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: 'successfully deleted!',
                result
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
});

module.exports = app;