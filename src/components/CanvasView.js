import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const CanvasView = () => {
  const canvasRef = useRef(null);
  const entities = useSelector((state) => state.entities.entities);
  const queryResult = useSelector((state) => state.entities.queryResult);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    entities.forEach((entity) => {
      const [x, y] = entity.coordinate;
      ctx.fillStyle = "black";
      ctx.fillText(
        entity.name,
        x * 10 + canvas.width / 2,
        canvas.height / 2 - y * 10
      );
      ctx.beginPath();
      ctx.arc(
        x * 10 + canvas.width / 2,
        canvas.height / 2 - y * 10,
        3,
        0,
        2 * Math.PI
      );
      ctx.fill();
    });

    queryResult.entities.forEach((entity) => {
      const [x, y] = entity.coordinate;
      ctx.fillStyle = "red";
      ctx.fillText(
        entity.name,
        x * 10 + canvas.width / 2,
        canvas.height / 2 - y * 10
      );
      ctx.beginPath();
      ctx.arc(
        x * 10 + canvas.width / 2,
        canvas.height / 2 - y * 10,
        5,
        0,
        2 * Math.PI
      );
      ctx.fill();
    });
  }, [entities, queryResult]);

  return (
    <div className="flex justify-center pb-10 bg-white shadow-md rounded-md">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default CanvasView;
