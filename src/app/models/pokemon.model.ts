export interface Pokemon {
  id: number; // Identificador único
  name: string; // Nombre del Pokémon
  sprites: {
    front_default: string; // URL de la imagen principal
    [key: string]: any; // Posibles otras propiedades de sprites
  };
  types: Array<{
    slot: number;
    type: {
      name: string; // Nombre del tipo (e.g., fire, water)
      url: string;
    }
  }>;
  abilities: Array<{
    ability: {
      name: string; // Nombre de la habilidad
      url: string;
    };
    is_hidden: boolean; // Indica si la habilidad está oculta
    slot: number;
  }>;
}
