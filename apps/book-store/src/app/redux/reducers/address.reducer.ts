import { Address, AddressAction, AddressActionTypes } from '../actions/address.actions';


const initialState = [];

export function AddressReducer( state = initialState, action: AddressAction ) {
    switch( action.type ) {
        case AddressActionTypes.Add:
            return [...state, action.address ];
        case AddressActionTypes.Update:
            let addressFound = false;

            state.forEach( ( addressObj ) => {
                if( addressObj.id === action.address.id ) {
                    addressObj = action.address;
                    addressFound = true;
                }
            });

            if( addressFound )
                return [...state];
            else
                return [action.address, ...state]
        default:
            return [...state];
    }
}