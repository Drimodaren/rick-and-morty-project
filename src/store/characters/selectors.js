export const getCharactersById = state => state.characters.entities.byId;
export const getCharactersAllIds = state => state.characters.entities.allIds;
export const getName = state => state.characters.form.name;
export const getSpecies = state => state.characters.form.species;
export const getGender = state => state.characters.form.gender;
export const getStatus = state => state.characters.form.status;
export const getLoading = state => state.characters.loading;
export const getErrors = state => state.characters.errors;
export const getPage = state => state.characters.currentPage;
export const getCharacterById = (state, id) => getCharactersById(state)[id];
export const getLoadingEpisodes = state => state.characters.loadingEpisodes;
