export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    [key: string]: any;
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    }
  }>;
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
}
