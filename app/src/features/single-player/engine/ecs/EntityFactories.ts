import { EntityManager, type EntityId } from "./EntityManager";
import type {
  PositionComponent,
  PhysicsComponent,
  RenderComponent,
  InputComponent,
} from "../components";

export const createPlayer = (
  entityManager: EntityManager,
  x: number,
  y: number
): EntityId => {
  const id = entityManager.createEntity();

  const pos: PositionComponent = { x, y, angle: -Math.PI / 2 };
  const physics: PhysicsComponent = {
    velocity: { x: 0, y: 0 },
    friction: 0.99,
    thrust: 0.2,
    rotationSpeed: 0.1,
    radius: 30,
    mass: 1,
  };

  const image = new Image();
  image.src = "/assets/Ships/spaceShips_008.png";
  const render: RenderComponent = {
    image,
    width: 40,
    height: 40,
    isImageLoaded: false,
    color: "#22d3ee",
  };

  image.onload = () => {
    render.isImageLoaded = true;
  };

  const input: InputComponent = { isPlayerControlled: true };

  entityManager.addComponent(id, "position", pos);
  entityManager.addComponent(id, "physics", physics);
  entityManager.addComponent(id, "render", render);
  entityManager.addComponent(id, "input", input);

  return id;
};

export const createEnemy = (
  entityManager: EntityManager,
  x: number,
  y: number,
  radius: number = 30
): EntityId => {
  const id = entityManager.createEntity();

  const initialVelocity = Math.floor(Math.random() * (6 - 2 + 1) + 2);
  const pos: PositionComponent = { x, y, angle: 0 };
  const physics: PhysicsComponent = {
    velocity: { x: initialVelocity, y: initialVelocity },
    friction: 1, // Los enemigos no suelen tener fricción en este tipo de juegos
    thrust: 0,
    rotationSpeed: 0,
    radius,
    mass: 1,
  };

  const image = new Image();
  const rand = Math.floor(Math.random() * 4) + 1;
  image.src = `/assets/Meteors/spaceMeteors_00${rand}.png`;
  const render: RenderComponent = {
    image,
    width: 40,
    height: 40,
    isImageLoaded: false,
    color: "#ff4444",
  };

  image.onload = () => {
    render.isImageLoaded = true;
  };

  entityManager.addComponent(id, "position", pos);
  entityManager.addComponent(id, "physics", physics);
  entityManager.addComponent(id, "render", render);

  return id;
};

