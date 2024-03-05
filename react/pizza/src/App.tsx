import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Loadable from 'react-loadable';
import './scss/app.scss';

import MainLayout from './layouts/MainLayout';

import { Home } from './pages/Home';

const Cart = Loadable({
  loader: () => import(/*webpackChunkName:"Cart"*/ './pages/Cart'),
  loading: () => <div>Загрузка...</div>,
});
const NotFound = React.lazy(() => import(/*webpackChunkName:"NotFound"*/ './pages/NotFound'));

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route path='cart' element={<Cart />} />
        <Route
          path='*'
          element={
            <React.Suspense fallback={<div>Загрузка...</div>}>
              <NotFound />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
