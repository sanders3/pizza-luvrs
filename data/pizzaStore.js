const Secrets = require('@jwerre/secrets')
const Sequelize = require('sequelize')

const config = Secrets.configSync({
        region: 'eu-west-1'
    })


const pgConfig = config.pizza_luvrs_db_secret
console.log(`connecting to ${pgConfig.dbname} on ${pgConfig.host}`)

const pgClient = new Sequelize(
    pgConfig.dbname,
    pgConfig.username,
    pgConfig.password,
    {
        host: pgConfig.host,
        port: pgConfig.port,
        dialect: pgConfig.engine
    }
)

const Pizza = pgClient.define('pizza', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    toppings: {
        type: Sequelize.STRING
    },
    img: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING
    },
    created: {
        type: Sequelize.BIGINT
    }
})

Pizza.sync().then(() => {
    console.log('postgres connection ready')
})

module.exports = Pizza