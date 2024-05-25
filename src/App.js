import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import EntityList from "./components/EntityList";
import QueryForm from "./components/QueryForm";
import CanvasView from "./components/CanvasView";

const App = () => (
  <Provider store={store}>
    <div>
      <h1 className="font-bold text-[34px] text-center">Entity Manager</h1>
      <EntityList />
      <QueryForm />
      <CanvasView />
    </div>
  </Provider>
);

export default App;
