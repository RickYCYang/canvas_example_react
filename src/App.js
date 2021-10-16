import { useRef, useEffect, useState } from "react";

function App() {
  const canvansRef = useRef(null);
  const canvasCtxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvansRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvansRef.current.getContext("2d");
    context.lineWidth = 3;
    context.lineCap = "round";
    context.strokeStyle = "blue";
    canvasCtxRef.current = context;
  }, []);

  /// Mousedown event
  const mouseDown = ({ nativeEvent }) => {
    canvasCtxRef.current.beginPath(nativeEvent.clientX, nativeEvent.clientY);
    canvasCtxRef.current.lineTo(nativeEvent.clientX, nativeEvent.clientY);
    canvasCtxRef.current.stroke();
    setIsDrawing(true);
  };

  /// Mouseup event
  const mouseUp = () => {
    canvasCtxRef.current.closePath();
    setIsDrawing(false);
  };

  /// Draw event
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    canvasCtxRef.current.lineTo(nativeEvent.clientX, nativeEvent.clientY);
    canvasCtxRef.current.stroke();
  };

  return (
    <div>
      <canvas
        ref={canvansRef}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onMouseMove={draw}
      />
    </div>
  );
}

export default App;
