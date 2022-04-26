export namespace Hdv {
  export interface IJour {
    heures: Map<string, IHeure>;
  }

  export interface IHeure {
    ventes: IVente[];
  }

  export interface IVente {
    prix: number;
    prix_unite: number;
    quantite: number;
  }
}
