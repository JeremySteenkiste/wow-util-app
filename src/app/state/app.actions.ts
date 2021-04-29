export namespace AppStateActions {
  export class SearchAction {
    static readonly type = '[AppState] SearchAction';
    constructor(public nomPerso: string, public serveur: string) {}
  }
}
