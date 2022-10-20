import { SetStateAction, useCallback, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import MainEditor from "./components/MainEditor";
import Editor from "./components/editor";
import Preview from "./components/preview";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  const [doc, setDoc] = useState<string>("# Hello, World!\n");

  const handleDocChange = useCallback((newDoc: SetStateAction<string>) => {
    setDoc(newDoc);
  }, []);

  return (
    <>
      <MainEditor />{" "}
      <div className="app">
        <Editor onChange={handleDocChange} initialDoc={doc} />
        <Preview doc={doc} />
      </div>
    </>
  );
}

export default App;
