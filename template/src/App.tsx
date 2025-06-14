import './App.css'
import {useEffect} from 'react'
import {init} from './init'
import group from './mesh'

function App() {

  useEffect(() => {
    const dom = document.getElementById('content');

    init(dom, ({scene}: any) => {
      scene.add(group)
    });

    return () => {
      dom!.innerHTML = '';
    }
}, []);


  return <div>
    <div id="header">
    React 和 Three.js 
    </div>
    <div id="main">
      <div id="content">
      </div>
      <div id="operate">
        <button>红色</button>
        <button>绿色</button>
        <button>蓝色</button>
      </div>
    </div>
  </div>
}

export default App
