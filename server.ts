import express from 'express'
import bodyParser from 'body-parser'

import { connection, query } from './db'
import dbConfig from './db.config'

const server = express()
const port = process.env.PORT || 4000

server.use(bodyParser.urlencoded({ extended: true }))

server.use(bodyParser.json())

server.get('/voting/:id', async (req, res) => {
  const conn = await connection(dbConfig).catch(console.error)

  if (conn) {
    const results = {
      ...(await query(conn, `select * from tickets where id = ${conn.escape(req.params.id)}`)),
      votes: await query(conn, `select playid, score from votes where id = ${conn.escape(req.params.id)}`),
    }

    res.send({ results })
  }
})

server.listen(port, () => console.log(`Listening on port ${port}`))
