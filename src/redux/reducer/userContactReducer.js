import * as userConatctActionType from "../actionsType/userConatctActionType";

export default (state = [], action) => {
    switch (action.type) {
        case userConatctActionType.CREATE_CONTACT:
            console.log("create conatct reducer", action.payload);
            return [...state, action.payload];
        case userConatctActionType.ALL_CONTACTS:
            console.log("get all conatct reducer", action.payload);
            return [
                ...action.payload
            ];
        //   case userConatctActionType.:
        //     // let temp = [...action.payload.body]
        //      console.log("temp ->>", action.payload)
        //     return [
        //       action.payload
        //     ];
        case userConatctActionType.UPDATE_CONTACT:
            // const index = state.findIndex(emp => emp.id === action.payload.id),
            //     employees = [...state] // important to create a copy, otherwise you'll modify state outside of setState call
            // employees[index] = action.payload;
            // console.log(employees)
            // this.setState({employees});
            console.log('in reducer', action.payload)
            return [...state, action.payload];
        case userConatctActionType.DELETE_CONTACT:
            return [...state.filter((item, index) => item.id !== action.payload)];
        default:
            return state;
    }
};
