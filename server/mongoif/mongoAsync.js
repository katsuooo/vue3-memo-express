/*
 mongo async
*/
var mongodb = require('mongodb');
const MONGOINFO = require('../config/config').MONGOINFO;
const filteredRead = require('./filteredRead');
const filterFromDate = require('./filterFromDate')
/**
 * read frome mongo/
 * @param {string} colName 
 * @param {int} num 
 * @param {obj} socket 
 */
var readLimit = async(dbName, colName, num, socket) => {
    let client;
    let rdata;
    try{
        client = await mongodb.MongoClient.connect(MONGOINFO.url, {useNewUrlParser:true});
        const db = await client.db(dbName);
        console.log(db)
        const collection = await db.collection(colName);
        let d = await collection.find({}).sort({datetime:-1}).limit(num).toArray();
        socket.emit('READLIMIT_RESULT', d);
        console.log('finally-d',d)
        //console.log(dbName, colName, d);
    }catch(err){
        console.log(err);
    }finally{
        client.close();
    }
}
/**
 * 
 * @param {String} db 
 * @param {String} col 
 * @param {Object} socket 
 * @param {Object} memo 
 * memo = {_id:'',datetime:YYYY-MM-DDThh:mm:ss,text:''}
 * memo.text convto lines by split('\n')
 */
async function upsertOne(dbName, colName, socket, memo){ 
    //const shapedMemo = shapeMemo(memo);
    const objectid = new mongodb.ObjectID(memo._id);
    delete memo._id;
    memo._id = objectid;
    let client;
    try{
        client = await mongodb.MongoClient.connect(MONGOINFO.url, {useNewUrlParser:true});
        const db = client.db(dbName);
        const collection = db.collection(colName);
        const d = await collection.updateOne({_id:memo._id}, {$set: {lines: memo.lines, datetime: memo.datetime}});
    }catch(err){
        console.log(err);
    }finally{
        client.close();
    }
}
/**
 * 
 * @param {*} dbName 
 * @param {*} colName 
 * @param {*} socket 
 * @param {*} memo 
 */
async function addNewOne(dbName, colName, socket, memo){
    let client;
    delete memo._id;
    try{
        client = await mongodb.MongoClient.connect(MONGOINFO.url, {useNewUrlParser:true});
        const db = client.db(dbName);
        const collection = db.collection(colName);
        const d = await collection.insertOne(memo);
        //console.log(d.insertedId);
        socket.emit('NEW_ID', d.insertedId);
    }catch(err){
        console.log(err);
    }finally{
        client.close();
    }
}
/**
 * 
 * @param {String} dbName 
 * @param {String} colName 
 * @param {object} socket 
 * @param {String} id 
 */
async function deleteOne(dbName, colName, socket, id){
    const idjson = {_id: new mongodb.ObjectID(id)};
    let client;
    try{
        client = await mongodb.MongoClient.connect(MONGOINFO.url, {useNewUrlParser:true});
        const db = client.db(dbName);
        const collection = db.collection(colName);
        const d = await collection.deleteOne(idjson);
    }catch(err){
        console.log(err);
    }finally{
        client.close();
    }
}
/*
 exports
*/
var mongoAsync = {
    /**
     * 
     */
    readLimit: (dbName, colName, num, socket) => {
        readLimit(dbName, colName, num, socket);  
    },
    /**
     * 
     */
    upsertOne: (db, col, socket, memo) => {
        upsertOne(db, col, socket, memo);
    },
    /**
     * 
     */
    addNewOne: (db, col, socket, memo) => {
        addNewOne(db, col, socket, memo);
    },
    /**
     * 
     */
    deleteOne: (db, col, socket, id) => {
        deleteOne(db, col, socket, id);
    },
    /**
     * read by filter
     */
    filteredRead:(dbName, colName, param, socket) => {
        filteredRead(dbName, colName, param, socket);
    },
    /**
     * read by date filter
     */
    filterFromDate:(dbName, colName, param, socket) => {
        filterFromDate(dbName, colName, param, socket);
    }
}



module.exports = mongoAsync;