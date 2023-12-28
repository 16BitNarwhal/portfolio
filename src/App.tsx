import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import Webcam from 'react-webcam';
import { Hands } from '@mediapipe/hands';

import HandsContainer from './components/Hand';

const App = () => {
  const [contextMenuActive, setContextMenuActive] = useState(false);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();

    const contextMenu = document.getElementById('context-menu');
    if (contextMenu) {
      let x = e.clientX;
      let y = e.clientY;

      // Adjust if off screen right
      if (x + contextMenu.offsetWidth > window.innerWidth) {
        x -= contextMenu.offsetWidth;
      }

      // Adjust if off screen bottom
      if (y + contextMenu.offsetHeight > window.innerHeight) {
        y -= contextMenu.offsetHeight;
      }

      if (contextMenuActive) {
        contextMenu.style.visibility = 'hidden';
      } else {
        contextMenu.style.visibility = 'visible';
        contextMenu.style.position = 'absolute';
        contextMenu.style.left = `${x + window.scrollX}px`;
        contextMenu.style.top = `${y + window.scrollY}px`;
      }
      setContextMenuActive(!contextMenuActive);
    }
  };

  return (
    <div className='App' onContextMenu={handleContextMenu}>
      <Header />
      <body>
        <div
          id='context-menu'
          style={{
            display: 'block',
            visibility: 'hidden',
            width: '200px',
            height: '200px',
            backgroundColor: 'red',
          }}>
          Hello World!!!
        </div>
        <div style={{ height: '1000px' }}></div>
        <HandsContainer />
      </body>
    </div>
  );
};

const Header = () => {
  return (
    <header className='App-header'>
      {/* headshot, when clicked/waved switches to 16bitnarwhal */}
      <h1>Eric Zhang</h1>
      <p>Software Engineer, Creator, Learner</p>
    </header>
  );
};

// const MouseControl = () => {
//   const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

//   const updateCursorPosition = (e: MouseEvent) => {
//     setCursorPosition({
//       x: e.clientX + window.scrollX,
//       y: e.clientY + window.scrollY,
//     });
//   };

//   useEffect(() => {
//     window.addEventListener('mousemove', updateCursorPosition);
//     return () => window.removeEventListener('mousemove', updateCursorPosition);
//   }, []);

//   const simulateLeftClick = () => {
//     const clickEvent = new MouseEvent('click', {
//       view: window,
//       bubbles: true,
//       cancelable: true,
//       clientX: cursorPosition.x,
//       clientY: cursorPosition.y,
//     });
//     document
//       .elementFromPoint(cursorPosition.x, cursorPosition.y)
//       ?.dispatchEvent(clickEvent);
//   };

//   return <></>;
// };

export default App;