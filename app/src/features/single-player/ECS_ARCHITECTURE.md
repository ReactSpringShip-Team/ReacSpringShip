# Arquitectura ECS: Guía de Implementación y Filosofía

Esta guía explica la transición de una arquitectura de Programación Orientada a Objetos (POO) a un Sistema de Entidad-Componente-Sistema (ECS) dentro de este motor de juego.

## 1. El Cambio de Paradigma: POO vs. ECS

### La limitación de POO (Arquitectura Anterior)
En POO, las entidades eran "Cosas que saben hacer cosas". Una clase `Ship` contenía:
- **Datos:** Posición, velocidad, salud.
- **Lógica:** Cómo moverse, cómo disparar, cómo colisionar.
- **Recursos:** Carga de imágenes.

**Problema:** A medida que el juego crece, la jerarquía de clases se vuelve rígida. Si quieres un "Enemigo que también sea controlado por el jugador", terminas con código duplicado o herencias complejas.

### La solución ECS (Arquitectura Actual)
ECS separa los **Datos** del **Comportamiento**.
- **Entidad:** No tiene lógica ni datos. Es solo un ID único.
- **Componente:** Son objetos planos (POJOs/Interfaces) que solo guardan datos.
- **Sistema:** Clases que contienen la lógica y procesan entidades que tienen componentes específicos.

---

## 2. Los Tres Pilares

### A. Entidades (The "ID")
Una entidad es simplemente una referencia. En nuestro `EntityManager`, las entidades se gestionan como un `Set<string>`.
```typescript
const player = entityManager.createEntity(); // Retorna "entity_0"
```

### B. Componentes (The "Data")
Son bolsas de datos sin métodos. Definen una característica de la entidad.
- `PositionComponent`: `{ x, y, angle }`
- `PhysicsComponent`: `{ velocity, friction, thrust }`
- `RenderComponent`: `{ image, width, height }`

**Regla de oro:** Si tiene una función, no es un componente.

### C. Sistemas (The "Logic")
Los sistemas son "especialistas". Cada sistema se encarga de un aspecto del juego y se ejecuta en cada frame.
- El `MovementSystem` filtra: "Dame todas las entidades con `Position` Y `Physics`".
- Itera sobre ellas y actualiza la posición usando la velocidad.

---

## 3. Implementación Paso a Paso (Cómo replicarlo)

### Paso 1: El Gestor de Entidades (EntityManager)
Es el corazón del sistema. Debe permitir:
1. Crear/Eliminar IDs de entidades.
2. Asociar componentes a esos IDs.
3. **Consultar (Querying):** Filtrar entidades que posean un grupo de componentes.

### Paso 2: Definir los Componentes
Usa interfaces de TypeScript para definir la forma de los datos. Esto asegura que los sistemas sepan exactamente qué esperar.

### Paso 3: Fábricas de Entidades (Factories)
En lugar de `new Ship()`, usamos funciones que ensamblan componentes:
```typescript
function createPlayer(em) {
  const id = em.createEntity();
  em.addComponent(id, 'position', { x: 100, y: 100, angle: 0 });
  em.addComponent(id, 'render', { color: 'blue', width: 20, height: 20 });
  em.addComponent(id, 'input', { isPlayerControlled: true });
  return id;
}
```

### Paso 4: Ciclo de Vida del Sistema
Cada sistema debe tener un método `update`. El flujo en el `GameLoop` debe ser:
1. **InputSystem:** Lee el teclado y actualiza los componentes de Física.
2. **MovementSystem:** Lee Física y actualiza Posición.
3. **CollisionSystem:** Lee Posición y reacciona.
4. **RenderSystem:** Lee Posición y Render, y dibuja en pantalla.

---

## 4. Ventajas de esta Arquitectura

1. **Composición sobre Herencia:** ¿Quieres una bala que rebote? Solo añade el componente de física de rebote a la entidad "bala". No necesitas crear una clase `BouncingBullet`.
2. **Desacoplamiento:** Puedes desactivar el sistema de movimiento para pausar el juego, mientras el sistema de renderizado sigue funcionando (para animaciones de menú, por ejemplo).
3. **Mantenibilidad:** La lógica de "límites de pantalla" está en un solo lugar (`MovementSystem`), no dispersa en 10 clases de entidades.
4. **Data Locality:** En motores avanzados, tener los componentes agrupados en memoria mejora drásticamente el rendimiento de la CPU.

## 5. Próximos Pasos Recomendados
- **Sistema de Colisiones:** Implementar un sistema que busque entidades con `Position` y un nuevo componente `Collider`.
- **Sistema de Disparo:** Crear un `ShootingSystem` que escuche el `InputSystem` y llame a una fábrica `createBullet`.
