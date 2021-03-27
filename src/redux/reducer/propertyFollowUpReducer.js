import * as propertyFollowActionType from "../actionsType/propertyFollowActionType";

export default (state = [], action) => {
    switch (action.type) {
        case propertyFollowActionType.CREATE_PROPERTY_FOLLOW_UP:
            return [...state, action.payload];
        case propertyFollowActionType.ALL_FOLLOW_UPS:
            return [
                ...action.payload.filter((item, index) => item.deleted === false),
            ];
        case propertyFollowActionType.FOLLOW_UP_BY_ID:
            return [
                ...action.payload.filter((item, index) => item.deleted === false),
            ];
        case propertyFollowActionType.FOLLOW_UP_BY_PROPERTY:
            return [
                ...action.payload.filter((item, index) => item.deleted === false),
            ];
        case propertyFollowActionType.UPDATE_FOLLOW_UP:
            return [...state, action.payload];
        case propertyFollowActionType.DELETE_FOLLOW_UP:
            return [...state.filter((item, index) => item.id !== action.payload)];
        default:
            return state;
    }
};
