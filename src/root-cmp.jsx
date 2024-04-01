import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import '../src/assets/style/main.scss'


import { HomePage } from './pages/HomePage.jsx';
import { AboutUs } from './pages/AboutUs.jsx';
import { store } from './store/store.js';
import { ToyDetails } from './pages/ToyDetails.jsx';
import { ToyEdit } from './pages/ToyEdit.jsx';
import { ToyIndex } from './pages/ToyIndex.jsx';
import { AppHeader } from './cmps/AppHeader.jsx';
import { AppFooter } from './cmps/AppFooter.jsx';
import { UserDetails } from './pages/UserDetails.jsx';
import { Dashboard } from './pages/Dashboard.jsx';



export function App() {


  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          <AppHeader />
          <main className='main-layout'>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<AboutUs />} path="/about" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<Dashboard />} path="/dash" />

              {/* <Route element={<ToyEdit />} path="/toy/edit" /> */}
              <Route element={<ToyEdit />} path="/toy/edit/:toyId?" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />

              <Route element={<UserDetails />} path="/user/:userId" />
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
    </Provider>
  )
}


