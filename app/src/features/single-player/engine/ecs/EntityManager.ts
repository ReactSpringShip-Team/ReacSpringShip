import type { ComponentMap } from "../components";

export type EntityId = string;

export class EntityManager {
  private entities: Set<EntityId> = new Set();
  private components: Map<keyof ComponentMap, Map<EntityId, any>> = new Map();
  private nextId: number = 0;

  constructor() {}

  public createEntity(): EntityId {
    const id = `entity_${this.nextId++}`;
    this.entities.add(id);
    return id;
  }

  public addComponent<K extends keyof ComponentMap>(
    entity: EntityId,
    type: K,
    component: ComponentMap[K]
  ): void {
    if (!this.components.has(type)) {
      this.components.set(type, new Map());
    }
    this.components.get(type)!.set(entity, component);
  }

  public getComponent<K extends keyof ComponentMap>(
    entity: EntityId,
    type: K
  ): ComponentMap[K] | undefined {
    return this.components.get(type)?.get(entity);
  }

  public removeEntity(entity: EntityId): void {
    this.entities.delete(entity);
    for (const componentMap of this.components.values()) {
      componentMap.delete(entity);
    }
  }

  /**
   * Retorna una lista de IDs de entidades que poseen TODOS los componentes especificados.
   */
  public getEntitiesWithComponents<K extends keyof ComponentMap>(
    ...types: K[]
  ): EntityId[] {
    if (types.length === 0) return Array.from(this.entities);

    // Empezamos con las entidades que tienen el primer componente
    const firstType = types[0];
    const firstMap = this.components.get(firstType);
    if (!firstMap) return [];

    let result = Array.from(firstMap.keys());

    // Filtramos por el resto de componentes
    for (let i = 1; i < types.length; i++) {
      const type = types[i];
      const componentMap = this.components.get(type);
      if (!componentMap) return [];
      result = result.filter((entity) => componentMap.has(entity));
    }

    return result;
  }
}
