import React from 'react';
import ReactDOM from 'react-dom';
import Canvas from './Canvas/index';
import './styles.css';

//HTML内のidが'root'のところにキャンバスを挿入
ReactDOM.render(<div id='app'>
  <div id='parameter-container'>
    parameter表示用
  </div>
  <div id='canvas'/>
</div>, document.getElementById('root'));

const canvas = new Canvas();

window.addEventListener('mousemove', e => {
  //canvas.mousemove(e.clientX, e.clientY);
});
