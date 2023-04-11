import { setupStore } from "../..";
import {
    changeCurrentPageAC,
    loadMoreAc,
    loadCharacters,
    setCharactersAC,
    setErrorsAC,
    setLoadedAC,
    setLoadingAC,
    asyncThunk
} from "../actions";
import { LOADING_STATE } from "../constans";
import { INITIAL_STATE } from "../initialState";
import { characterReducer } from "../reducer";
import { getAllCharacters, getErrors, getLoading, getPage } from "../selectors";

import * as rickmortyapi from "rickmortyapi";
jest.mock("rickmortyapi");
let store;

const mockDispatch = jest.fn();

describe("charactersReducer", () => {
    describe("Action", () => {
        beforeEach(() => {
            store = setupStore();
            mockDispatch.mockClear()
        });
        it('should call dispatch three times', async()=>{
            const cb = ()=>(dispatch)=>{}
            const thunk =  asyncThunk(cb)
            await thunk(mockDispatch,store.getState)
            expect(mockDispatch).toHaveBeenCalledTimes(3)
            expect(mockDispatch).toHaveBeenCalledWith(setLoadingAC())
            expect(mockDispatch).toHaveBeenCalledWith(setLoadedAC())
        })
        it("should load initial characters", async () => {
            //тест асинхронный
            const response = {
                //готовим данные
                data: {
                    results: [1, 2, 3]
                }
            };
            rickmortyapi.getCharacters.mockImplementation(() => Promise.resolve(response)); //подменяем данные, см. выше импорт и jest.mock("rickmortyapi");
            await store.dispatch(loadCharacters()); //await обязательно

            expect(getAllCharacters(store.getState())).toHaveLength(3); //тут будет новый результат
        });
    });

    describe("Selector", () => {
        beforeEach(() => {
            store = setupStore();
        });
        it("should return all characters", () => {
            const store = setupStore({
                character: {
                    characters: [1, 2, 3]
                }
            });
            expect(getAllCharacters(store.getState())).toHaveLength(3);
            store.dispatch(loadMoreAc([5, 6, 7]));
            expect(getAllCharacters(store.getState())).toHaveLength(6);
        });
        it("should return loading", () => {
            const store = setupStore({
                character: {
                    loading: LOADING_STATE.NEVER
                }
            });
            expect(getLoading(store.getState())).toBe("Never");
            store.dispatch(setLoadingAC());
            expect(getLoading(store.getState())).toBe("Loading");
            store.dispatch(setLoadedAC());
            expect(getLoading(store.getState())).toBe("Loaded");
        });
        it("should return errors", () => {
            const store = setupStore({
                character: {
                    errors: "Olo-lo"
                }
            });
            expect(getErrors(store.getState())).toBe("Olo-lo");
            store.dispatch(setErrorsAC("You're loser Morty"));
            expect(getErrors(store.getState())).toBe("You're loser Morty");
        });
        it("should return page", () => {
            const store = setupStore({
                character: {
                    currentPage: 1
                }
            });
            expect(getPage(store.getState())).toEqual(1);
            store.dispatch(changeCurrentPageAC(2));
            expect(getPage(store.getState())).toEqual(2);
        });
    });
    describe("Reducer", () => {
        it("should return initialState", () => {
            const state = characterReducer(undefined, {});
            expect(state).toEqual(INITIAL_STATE);
            expect(state.loading).toBe(LOADING_STATE.NEVER);
            expect(state.errors).toBe("");
            expect(state.characters).toHaveLength(0);
            expect(state.currentPage).toEqual(1);
        });
        it("should set characters", () => {
            const action = setCharactersAC([1, 2, 3, 4]);
            const state = characterReducer(INITIAL_STATE, action);
            expect(state.characters).toHaveLength(4);
            expect(state.characters).toEqual([1, 2, 3, 4]);
            expect(state.characters).toContain(1);
        });
        it("should set loading", () => {
            const action = setLoadingAC();
            const state = characterReducer(INITIAL_STATE, action);
            expect(state.loading).toBe(LOADING_STATE.LOADING);
        });
        it("should set loaded", () => {
            const action = setLoadedAC();
            const state = characterReducer(INITIAL_STATE, action);
            expect(state.loading).toBe(LOADING_STATE.LOADED);
        });
        it("should set error", () => {
            const action = setErrorsAC("хуйня");
            const state = characterReducer(INITIAL_STATE, action);
            expect(state.errors).toBe("хуйня");
        });
        it("should load more characters", () => {
            const actionOld = setCharactersAC([1, 2, 3, 4]);
            const stateOld = characterReducer(INITIAL_STATE, actionOld);
            const actionNew = loadMoreAc([5, 6, 7, 8]);
            const stateNew = characterReducer(stateOld, actionNew);
            expect(stateNew.characters).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
        });
        it("should set currentPage", () => {
            const action = changeCurrentPageAC(1);
            const state = characterReducer(INITIAL_STATE, action);
            expect(state.currentPage).toEqual(2);
        });
    });
});