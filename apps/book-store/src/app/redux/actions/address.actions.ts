import { Action } from '@ngrx/store';

export interface Address {
    id: number;
    name: string;
    mobileNo: number;
    address: string;
}

export enum AddressActionTypes {
    Add = '[Address] Add',
    Update = '[Address] Update'
} 

export class AddressAction implements Action {
    readonly type;
    address: Address;
}

export class AddAddressAction implements AddressAction {
    readonly type = AddressActionTypes.Add;

    constructor( public address: Address ) {}
}

export class UpdateAddressAction implements AddressAction {
    readonly type = AddressActionTypes.Update;

    constructor( public address: Address ) {}
}