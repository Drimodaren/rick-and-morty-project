export const getLocationsById = state => state.locations.locations.byId;
export const getLocationsAllIds = state => state.locations.locations.allIds;
export const getName = state => state.locations.form.name;
export const getType = state => state.locations.form.type;
export const getDimension = state => state.locations.form.Dimension;
export const getPage = state => state.locations.currentPage;
export const getLoading = state => state.locations.loading;
export const getErrors = state => state.locations.errors;
export const getLocationById = (state, id) => getLocationsById(state)[id];
export const getLoadingResidents = state => state.locations.loadingResedents;