

const mongoose = require('mongoose')

const FinanceSchema = mongoose.Schema({
    os: String,
    emission: Date,
    status: String,
    client: String,
    paymentType:String,
    amount: String,
    received: String,
    balance: String,
    imgName1: String,
    imgName2: String,
    lastPayment: Date
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false
})

module.exports = mongoose.model('finance', FinanceSchema);
