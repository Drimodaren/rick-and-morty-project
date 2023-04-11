import { getCharacters } from "rickmortyapi";
import {
    CHANGE_CURRENT_PAGE,
    ERRORS_CHARACTER,
    LOAD_MORE,
    SET_CHARACTERS,
    SET_LOADED,
    SET_LOADING
} from "./actionTypes";

export const setCharactersAC = characters => {
    return {
        type: SET_CHARACTERS,
        characters
    };
};
export const setLoadingAC = () => {
    return {
        type: SET_LOADING
    };
};

export const setLoadedAC = () => {
    return {
        type: SET_LOADED
    };
};

export const setErrorsAC = message => {
    return {
        type: ERRORS_CHARACTER,
        message
    };
};

export const changeCurrentPageAC = () => {
    return {
        type: CHANGE_CURRENT_PAGE
    };
};

export const loadMoreAc = characters => {
    return {
        type: LOAD_MORE,
        characters
    };
};

export const asyncThunk =
    (cb, ...args) =>
    async (dispatch, getState) => {
        dispatch(setLoadingAC());
        try {
            await dispatch(cb(...args));
        } catch (e) {
            dispatch(setErrorsAC(e.message));
        } finally {
            dispatch(setLoadedAC());
        }
    };
const _loadCharacters = () => async (dispatch, getState) => {
    const page = getState().character.currentPage;
    const characters = await getCharacters({ page });
    //console.log(characters.data.results);

    dispatch(setCharactersAC(characters.data.results));
};
export const loadCharacters = () => async (dispatch, getState) => {
    dispatch(asyncThunk(_loadCharacters));
};