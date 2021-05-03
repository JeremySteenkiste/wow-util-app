export namespace AppStateActions {
  export class InitAction {
    static readonly type = '[AppState] InitAction';
    constructor() {}
  }
  export class SearchAction {
    static readonly type = '[AppState] SearchAction';
    constructor(public nomPerso: string, public serveur: string) {}
  }
}
