import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { queryEntities } from "../redux/actions";

const QueryForm = () => {
  const [coord1, setCoord1] = useState("");
  const [coord2, setCoord2] = useState("");
  const dispatch = useDispatch();
  const queryResult = useSelector((state) => state.entities.queryResult);

  const handleSubmit = (e) => {
    e.preventDefault();
    const coord1Arr = coord1.split(",").map(Number);
    const coord2Arr = coord2.split(",").map(Number);
    dispatch(queryEntities(coord1Arr, coord2Arr));
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Query Entities</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={coord1}
          onChange={(e) => setCoord1(e.target.value)}
          placeholder="Coordinate 1 (x, y)"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          value={coord2}
          onChange={(e) => setCoord2(e.target.value)}
          placeholder="Coordinate 2 (x, y)"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Query
        </button>
      </form>
      <div className="mt-6">
        <h3 className="text-xl font-bold">Entities</h3>
        <ul className="list-disc pl-5">
          {queryResult.entities.map((entity) => (
            <li key={entity.name} className="mt-2">
              {entity.name} - ({entity.coordinate.join(", ")}) -{" "}
              {entity.labels.join(", ")}
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-bold mt-4">Labels</h3>
        <ul className="list-disc pl-5">
          {queryResult.labels.map((label) => (
            <li key={label} className="mt-2">
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QueryForm;
