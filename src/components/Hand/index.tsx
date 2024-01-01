import { useEffect, useRef, useState, useCallback } from 'react';
import {
  GestureRecognizer,
  FilesetResolver,
  GestureRecognizerResult,
} from '@mediapipe/tasks-vision';

enum Click {
  left = 'click',
  right = 'contextmenu',
}

const HandsContainer = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [inputVideoReady, setInputVideoReady] = useState(false);
  const [gestureRecognizer, setGestureRecognizer] =
    useState<GestureRecognizer | null>(null);

  const lastVideoTimeRef = useRef(-1);

  const inputVideoRef = useRef<HTMLVideoElement | null>(null);

  // webcam control
  useEffect(() => {
    if (!inputVideoReady) {
      return;
    }
    if (inputVideoRef.current) {
      const initGesture = async () => {
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
        );
        const gr = await GestureRecognizer.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task',
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
        });
        setGestureRecognizer(gr);
      };
      initGesture();
    }
  }, [inputVideoReady]);

  useEffect(() => {
    if (!inputVideoReady && !gestureRecognizer) {
      return;
    }
    const constraints = {
      video: { width: { min: 480 }, height: { min: 360 } },
    };
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      if (inputVideoRef.current) {
        inputVideoRef.current.srcObject = stream;
      }
      sendToMediaPipe();
    });
    const sendToMediaPipe = async () => {
      if (inputVideoRef.current) {
        if (!inputVideoRef.current.videoWidth || !gestureRecognizer) {
          requestAnimationFrame(sendToMediaPipe);
          return;
        }
        if (inputVideoRef.current.currentTime === lastVideoTimeRef.current) {
          requestAnimationFrame(sendToMediaPipe);
          return;
        }
        const results = await gestureRecognizer.recognizeForVideo(
          inputVideoRef.current,
          Date.now()
        );
        lastVideoTimeRef.current = inputVideoRef.current.currentTime;
        processResults(results);
        requestAnimationFrame(sendToMediaPipe);
      }
    };
  }, [gestureRecognizer]);

  const isHandClickGesture = useRef(false);
  const isHandContextGesture = useRef(false);

  const indices = [0, 5, 9, 13, 17]; // palm indices
  const processResults = (results: GestureRecognizerResult) => {
    let x = 0;
    let y = 0;
    if (!results.landmarks) return;
    if (!results.landmarks[0]) return;
    const landmarks = results.landmarks[0];
    if (!landmarks) return;
    indices.forEach((i) => {
      x += landmarks[i].x;
      y += landmarks[i].y;
    });
    // for (let i = 0; i < landmarks.length; i++) {
    //   x += landmarks[i].x;
    //   y += landmarks[i].y;
    // }
    x *= window.innerWidth / indices.length;
    y *= window.innerHeight / indices.length;
    x = window.innerWidth - x;

    setCursorPosition({ x, y });

    // if (!landmarks || !landmarks[8]) return;
    // let x = landmarks[8].x! * window.innerWidth;
    // let y = landmarks[8].y! * window.innerHeight;
    // x = window.innerWidth - x;

    if (!results.gestures) return;
    if (!results.gestures[0]) return;
    if (!results.gestures[0][0]) return;
    const gesture = results.gestures[0][0];
    if (gesture.categoryName === 'Closed_Fist') {
      if (!isHandClickGesture.current) {
        simulateClick({ x, y }, Click.left);
        isHandClickGesture.current = true;
      }
    } else {
      isHandClickGesture.current = false;
    }
    if (gesture.categoryName === 'ILoveYou') {
      if (!isHandContextGesture.current) {
        simulateClick({ x, y }, Click.right);
        isHandContextGesture.current = true;
      }
    } else {
      isHandContextGesture.current = false;
    }
  };

  // mouse control
  // const updateCursorPosition = (e: MouseEvent) => {
  //   setCursorPosition({
  //     x: e.clientX + window.scrollX,
  //     y: e.clientY + window.scrollY,
  //   });
  // };

  // useEffect(() => {
  //   window.addEventListener('mousemove', updateCursorPosition);
  //   return () => window.removeEventListener('mousemove', updateCursorPosition);
  // }, []);

  const simulateClick = (position: { x: number; y: number }, type: Click) => {
    const clickEvent = new MouseEvent(type, {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: position.x,
      clientY: position.y,
    });
    document
      .elementFromPoint(position.x, position.y)
      ?.dispatchEvent(clickEvent);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'q') {
        simulateClick(cursorPosition, Click.left);
      }
    },
    [cursorPosition]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    document.body.style.cursor = 'none';
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className='hands-container ignore-mouse'>
      <video
        autoPlay
        // style={{ display: 'none' }}
        ref={(el) => {
          inputVideoRef.current = el;
          setInputVideoReady(!!el);
        }}
      />

      <div
        className='cursor'
        style={{
          position: 'absolute',
          left: cursorPosition.x + window.scrollX,
          top: cursorPosition.y + window.scrollY,
          fontSize: '50px',
        }}>
        👆
      </div>
    </div>
  );
};

export default HandsContainer;
