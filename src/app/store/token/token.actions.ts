export class AddToken {
    static readonly type = "[Token] Add New Token";
    constructor (public payload: string) { }
}

export class RemoveToken {
    static readonly type = "[Token] Remove Token";
    constructor () { }
}