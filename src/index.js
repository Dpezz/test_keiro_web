import React from "react";
import ReactDOM from "react-dom";
// css
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
// components
import App from "./components/app/App";
import * as serviceWorker from "./serviceWorker";
//redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import allReducers from "./reducers";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
	key: "root",
	storage
	// blacklist: [],
	// whitelist: []
};
const persistedReducer = persistReducer(persistConfig, allReducers);
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(allReducers, composeEnhancer(applyMiddleware(thunk)));
const store = createStore(
	persistedReducer,
	composeEnhancer(applyMiddleware(thunk))
);
const persistor = persistStore(store);

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
