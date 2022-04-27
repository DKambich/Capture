import * as React from "react";
import * as ReactDOM from "react-dom";
import { PrimaryButton, Text } from "@fluentui/react";

function App() {
  console.log(window)
  return (
    <>
      <Text variant={"xLarge"} nowrap block>
        Hello from React!
      </Text>
      <PrimaryButton
        onClick={function () {
          window.electron.ipcRenderer.myPing();
        }}
      >
        Press Me
      </PrimaryButton>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
