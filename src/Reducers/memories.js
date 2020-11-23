import {
  GET_ALL_MEMORIES,
  GET_PHOTOS,
  ADD_MEMORIES,
  TOGGLE_LIKE,
  SERACH_MEMORIES,
  GET_SINGLE_MEMORIES,
  GET_MONTH_WISE_MEMORIES,
} from '../Actions/types';

const initalState = {
  memories: [],
  currentMemories: {},
  currentImages: [],
  searchedMemories: [],
};

export default function(state = initalState, action) {
  switch (action.type) {
    case GET_MONTH_WISE_MEMORIES:
      return {
        ...state,
        memories: action.payload,
      };
    case GET_PHOTOS:
      return {
        ...state,
        currentImages: action.payload,
      };
    case ADD_MEMORIES:
      return {
        ...state,
        memories: [...state.memories, action.payload],
      };
    case TOGGLE_LIKE:
      let index = state.memories.findIndex(
        mem => mem.primaryId === action.payload.primaryId,
      );
      state.memories[index].like = action.payload.like;
      let newArray = state.memories;
      return {
        ...state,
        memories: newArray,
      };
    case GET_ALL_MEMORIES:
      return {
        ...state,
        searchedMemories: action.payload,
      };
    case GET_SINGLE_MEMORIES:
      return {
        ...state,
        currentMemories: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
