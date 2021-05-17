import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { createBrowserHistory as createHistory } from 'history'
import { Provider } from 'mobx-react'
import { syncHistoryWithStore } from 'mobx-react-router'

import updateVersion from '@utils/storage/updatingVersion'

import pckg from '../package.json'

import Main from './pages/Main'
import Store from './store/Store'

import './index.css'

const browserHistory = createHistory()
const history = syncHistoryWithStore(browserHistory, Store.RouterStore)
updateVersion(pckg.version)

window.store = Store

ReactDOM.render(
  <Provider store={Store}>
    <Router history={history}>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('root')
)
