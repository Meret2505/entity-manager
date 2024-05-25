import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntities, removeEntity } from "../redux/actions";
import EntityForm from "./EntityForm";

const EntityList = () => {
  const dispatch = useDispatch();
  const entities = useSelector((state) => state.entities.entities);
  const [selectedEntity, setSelectedEntity] = useState(null);

  useEffect(() => {
    dispatch(fetchEntities());
  }, [dispatch]);

  const handleEdit = (entity) => {
    setSelectedEntity(entity);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Entity List</h2>
      <EntityForm
        entity={selectedEntity}
        onUpdate={() => setSelectedEntity(null)}
      />
      <ul className="mt-4 space-y-2">
        {entities.map((entity) => (
          <li
            key={entity.name}
            className="flex justify-between items-center p-2 border border-gray-200 rounded-md"
          >
            <div>
              {entity.name} - ({entity.coordinate.join(", ")}) -{" "}
              {entity.labels.join(", ")}
            </div>
            <div>
              <button
                onClick={() => handleEdit(entity)}
                className="mr-2 bg-yellow-500 text-white px-3 py-1 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(removeEntity(entity.name))}
                className="bg-red-500 text-white px-3 py-1 rounded-md"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntityList;
