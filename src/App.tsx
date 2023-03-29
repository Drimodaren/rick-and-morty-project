import React from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./App.scss";
import { router } from "./router";
import { initialredux } from "./store";

function App() {
    return (
        <Provider store={initialredux}>
            <RouterProvider router={router} />
        </Provider>
    );
}

export default App;
