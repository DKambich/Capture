import * as React from "react";
import * as ReactDOM from "react-dom";

function App() {
  console.log(window);
  return <>Hello World</>;
}

ReactDOM.render(<App />, document.getElementById("root"));
