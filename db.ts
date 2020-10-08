import mySql from 'mysql'

export async function connection(params: string | mySql.ConnectionConfig) {
  return new Promise<mySql.Connection>((resolve, reject) => {
    const conn = mySql.createConnection(params)
    conn.connect(err => {
      if (err) {
        reject(err)
      }
      resolve(conn)
    })
  })
}

export async function query(conn: mySql.Connection, q: string | mySql.QueryOptions) {
  return new Promise<mySql.Query>((resolve, reject) => {
    const handler = (err: mySql.MysqlError | null, res?: any) => {
      if (err) {
        reject(err)
        return
      }
      resolve(res)
    }
    conn.query(q, handler)
  })
}
