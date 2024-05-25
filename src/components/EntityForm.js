import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createEntity, updateEntity } from "../redux/actions";

const EntityForm = ({ entity, onUpdate }) => {
  const [name, setName] = useState("");
  const [coordinate, setCoordinate] = useState("");
  const [labels, setLabels] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (entity) {
      setName(entity.name);
      setCoordinate(entity.coordinate.join(", "));
      setLabels(entity.labels.join(", "));
    } else {
      setName("");
      setCoordinate("");
      setLabels("");
    }
  }, [entity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntity = {
      name,
      coordinate: coordinate.split(",").map(Number),
      labels: labels.split(",").map((label) => label.trim()),
    };
    if (entity) {
      dispatch(updateEntity(entity.name, newEntity));
      onUpdate();
    } else {
      dispatch(createEntity(newEntity));
    }
    setName("");
    setCoordinate("");
    setLabels("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        disabled={!!entity}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        value={coordinate}
        onChange={(e) => setCoordinate(e.target.value)}
        placeholder="Coordinate"
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        value={labels}
        onChange={(e) => setLabels(e.target.value)}
        placeholder="Labels"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded-md"
      >
        {entity ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default EntityForm;
