const mongoose = require('mongoose')

const user_model = require('./src/models/user_model')(mongoose)
exports.getUsers = (handleResponse, handleError) => {
    user_model.find({}, (err, doc) => {
        if(err) {
            handleError(err)
        }
        handleResponse(doc)
    })
}