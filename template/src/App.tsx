import "./App.css";
import {useEffect} from "react";
import {init} from "./init";
import group from "./mesh";

function App() {
    useEffect(() => {
        const dom = document.getElementById("content");

        init(dom, group);

        return () => {
            dom!.innerHTML = "";
        };
    }, []);

    return <div id="content"></div>;
}

export default App;
