const AWS = require('aws-sdk')

AWS.config.update({ region: 'eu-west-1'})

const dynamodb = new AWS.DynamoDB.DocumentClient()

async function putItem (table, item) {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: table,
      Item: item
    }

    dynamodb.put(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

async function getAllItems(table) {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: table
    }

    // assume that we don't have more than one megabyte of toppings or users
    dynamodb.scan(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data.Items) 
      }
    })
  })
}

async function getItem(table, idKey, id) {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: table,
      Key: {
        [idKey]: id
      }
    }

    // assume that we don't have more than one megabyte of toppings or users
    dynamodb.get(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data.Item)
      }
    })
  })
}


module.exports = {
  putItem,
  getAllItems,
  getItem
}