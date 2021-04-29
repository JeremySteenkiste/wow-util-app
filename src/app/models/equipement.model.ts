export interface IEquipement {
  id: string;
  nom: string;
  imageUrl?: string;
}
export interface IStuff {
  tete?: IEquipement;
  cou?: IEquipement;
  epaules?: IEquipement;
  dos?: IEquipement;
  torse?: IEquipement;
  chemise?: IEquipement;
  tabard?: IEquipement;
  brassard?: IEquipement;
  mainDroite?: IEquipement;
  mainGauche?: IEquipement;
  mains?: IEquipement;
  ceinture?: IEquipement;
  jambes?: IEquipement;
  pieds?: IEquipement;
  bague1?: IEquipement;
  bague2?: IEquipement;
  bijou1?: IEquipement;
  bijou2?: IEquipement;
}
