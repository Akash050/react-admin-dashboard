import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

// routes config
import routes from '../routes'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => {
                    return (
                      <>
                        {grantPermission(route.role) ?
                          localStorage.isLoggedIn ?
                            <CFade>
                              <route.component {...props} />
                            </CFade>
                            :
                            <Redirect to={{ pathname: '/login' }} />
                          :
                          <Redirect to={{ pathname: '/login' }} />
                        }
                      </>
                    )
                  }
                  } />
              )
            })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main >
  )
}

const grantPermission = (permittedRole) => {
  const requestedRole = localStorage.getItem('role')
  if (permittedRole.includes(requestedRole)) {
    return true
  } else {
    return false
  }
};


export default React.memo(TheContent)
