import { EntityManager } from "../ecs/EntityManager";
import { createEnemy } from "../ecs/EntityFactories";

export class LevelSystem {
  private level: number = 1;
  private survivalTime: number = 0;
  private spawnTimer: number = 0;
  private enemiesToSpawnThisLevel: number = 0;
  private totalEnemiesCreatedInLevel: number = 0;
  
  private readonly TIME_PER_LEVEL = 15000; 
  private readonly BASE_SPAWN_INTERVAL = 3000; 
  
  constructor() {
    this.prepareLevel(1);
  }

  public update(
    entityManager: EntityManager,
    deltaTime: number,
    canvasWidth: number,
    canvasHeight: number
  ) {
    this.survivalTime += deltaTime;
    this.spawnTimer += deltaTime;

    const currentLevel = Math.floor(this.survivalTime / this.TIME_PER_LEVEL) + 1;
    if (currentLevel > this.level) {
      this.level = currentLevel;
      this.prepareLevel(this.level);
      console.log(`¡Nivel ${this.level}!`);
    }

    const spawnInterval = Math.max(500, this.BASE_SPAWN_INTERVAL - (this.level * 200));
    if (this.spawnTimer >= spawnInterval && this.totalEnemiesCreatedInLevel < this.enemiesToSpawnThisLevel) {
      this.spawnEnemy(entityManager, canvasWidth, canvasHeight);
      this.spawnTimer = 0;
    }
  }

  private prepareLevel(level: number) {
    this.enemiesToSpawnThisLevel = level * 8; 
    this.totalEnemiesCreatedInLevel = 0;
    
    this.initialSpawnCount = level * 2;
  }

  private initialSpawnCount: number = 0;

  private spawnEnemy(entityManager: EntityManager, width: number, height: number) {
    const radius = 30;
    let x, y;
    let isValid = false;
    let attempts = 0;

    while (!isValid && attempts < 25) {
      attempts++;
      x = Math.random() * (width - radius * 2) + radius;
      y = Math.random() * (height - radius * 2) + radius;
      
      if (this.isValidPosition(x, y, radius, entityManager)) {
        isValid = true;
      }
    }

    if (isValid && x !== undefined && y !== undefined) {
      createEnemy(entityManager, x, y, radius);
      this.totalEnemiesCreatedInLevel++;
    }
  }

  private isValidPosition(x: number, y: number, radius: number, entityManager: EntityManager): boolean {
    const entities = entityManager.getEntitiesWithComponents("position", "physics");
    
    for (const id of entities) {
      const pos = entityManager.getComponent(id, "position")!;
      const phys = entityManager.getComponent(id, "physics")!;
      
      const dx = x - pos.x;
      const dy = y - pos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < (radius + phys.radius + 20)) {
        return false;
      }
    }
    return true;
  }

  public getLevel() { return this.level; }
}
