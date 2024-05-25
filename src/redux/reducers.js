const initialState = {
  entities: [],
  queryResult: { entities: [], labels: [] },
};

const entityReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ENTITIES":
      return { ...state, entities: action.payload };
    case "CREATE_ENTITY":
      return { ...state, entities: [...state.entities, action.payload] };
    case "REMOVE_ENTITY":
      return {
        ...state,
        entities: state.entities.filter((e) => e.name !== action.payload),
      };
    case "UPDATE_ENTITY":
      return {
        ...state,
        entities: state.entities.map((e) =>
          e.name === action.payload.name ? action.payload : e
        ),
      };
    case "QUERY_ENTITIES":
      return { ...state, queryResult: action.payload };
    default:
      return state;
  }
};

export default entityReducer;
