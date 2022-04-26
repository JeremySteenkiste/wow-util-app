export namespace HdvStateActions {
  export class SearchItemAction {
    static readonly type = '[HdvState] - SearchItemAction';
    constructor(public inputText: string) {}
  }
}
