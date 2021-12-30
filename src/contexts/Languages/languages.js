export const reducer = (state, action) => {
    switch (action.type) {
        case "setAppLanguage":
            return {
                ...state,
                language: action.value
            }

        default:
            return state
    }
}

export const initialState = {
    language: 'en'
}