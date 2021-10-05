import * as mongoose from 'mongoose'

export const ItemSchema = new mongoose.Schema({

name: String,
qty: Number,
Description: String,
imageURL: String,
 createdAt: { type: Date, default: Date.now }

});


