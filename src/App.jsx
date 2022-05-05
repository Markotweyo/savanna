import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { AppContextProvider } from './store/app-context'

import Navbar from './layout/Navbar'
import PaginatedQuery from './views/PaginatedQuery'
import EditUser from './views/EditUser'
import UserPost from './views/UserPost'

function App() {
  // Create a client
  const queryClient = new QueryClient()

  return (
    <React.Fragment>
      <header>
        <Navbar />
      </header>
      <main className="container p-4 mx-auto mt-8 lg:w-screen-lg">
        <QueryClientProvider client={queryClient}>
          <AppContextProvider>
            <Switch>
              <Route path="/" exact>
                <PaginatedQuery />
              </Route>
              <Route path="/user/edit/:id">
                <EditUser />
              </Route>
              <Route path="/userpost/:id">
                <UserPost />
              </Route>
            </Switch>
          </AppContextProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </main>
    </React.Fragment>
  )
}

export default App
