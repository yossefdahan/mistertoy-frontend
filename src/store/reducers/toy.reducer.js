import { toyService } from "../../services/toy.service.js";

export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_SORT_BY = 'SET_SORT_BY'

const initialState = {
    toys: [],
    isLoading: false,
    filterBy: toyService.getDefaultFilter(),
    sortBy: toyService.getDefaultSort()
}

export function toyReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }

        case REMOVE_TOY:
            return { ...state, toys: state.toys.filter(toy => toy._id !== action.toyId) }

        case ADD_TOY:
            return {
                ...state, toys: [...state.toys, action.toy]
            }

        case UPDATE_TOY:
            return {
                ...state,
                toys: state.toys.map(toy => toy._id === action.toy_id ? action.toy : toy)
            }

        case SET_FILTER_BY:

            return {
                ...state,
                filterBy: { ...state.filterBy, ...action.filterBy }
            }

        case SET_SORT_BY:

            return {
                ...state,
                sortBy: { ...state.sortBy, ...action.sortBy }
            }

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }

        default:
            return state
    }
}