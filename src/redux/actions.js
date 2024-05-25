import axios from "axios";

export const fetchEntities = () => async (dispatch) => {
  const response = await axios.get("http://localhost:5000/entities");
  dispatch({ type: "FETCH_ENTITIES", payload: response.data });
};

export const createEntity = (entity) => async (dispatch) => {
  const response = await axios.post("http://localhost:5000/entities", entity);
  dispatch({ type: "CREATE_ENTITY", payload: response.data });
};

export const removeEntity = (name) => async (dispatch) => {
  await axios.delete(`http://localhost:5000/entities/${name}`);
  dispatch({ type: "REMOVE_ENTITY", payload: name });
};

export const updateEntity = (name, entity) => async (dispatch) => {
  const response = await axios.put(
    `http://localhost:5000/entities/${name}`,
    entity
  );
  dispatch({ type: "UPDATE_ENTITY", payload: response.data });
};

export const queryEntities = (coord1, coord2) => async (dispatch) => {
  const response = await axios.post("http://localhost:5000/query", {
    coord1,
    coord2,
  });
  dispatch({ type: "QUERY_ENTITIES", payload: response.data });
};
