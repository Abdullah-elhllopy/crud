import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./styles/main.scss";
import crudReducer from 'store/index.tsx';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from "react-redux";
const rootReducer = combineReducers({
  crud: crudReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
