import express from 'express'
import ExpressCore from './core/ExpressCore'
import ErrorHandlerCore from './core/ErrorHandlerCore'
import OAuthRoute from './routes/OAuthRoute'
import AuthRoute from './routes/AuthRoute'
import './core/DirectoryCore'
import './core/MongooseCore'
import './core/LuxonCore'

const app = express()
const port = process.env.PORT

ExpressCore(app)

app.use('/auth', AuthRoute)
app.use('/oauth', OAuthRoute)

app.use(ErrorHandlerCore)

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`)
})
