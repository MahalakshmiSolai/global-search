export const UPDATE_SEARCH_RESULT = "UPDATE_SEARCH_RESULT";

export const updateSearchResult = result => {
    return {
        type: UPDATE_SEARCH_RESULT,
        result
    };
}
