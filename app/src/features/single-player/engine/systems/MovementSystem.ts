export class MovementSystem {

    public update(entities: any [], canvasWidth: number, canvasHeight: number){
        for(const entity of entities){
            entity.update(canvasWidth, canvasHeight);
        }
    }
}