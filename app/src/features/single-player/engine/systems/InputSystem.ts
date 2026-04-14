import type { Ship } from "../entities/Ship";


export class InputSystem {

    private myKeys: Record<string, { pressed: boolean }> = {
        w: { pressed: false },
        a: { pressed: false },
        s: { pressed: false },
        d: { pressed: false },
        space: { pressed: false }
    };

    private handleKeyDown = (e: KeyboardEvent) => {
        const key = e.key.toLowerCase();
        if (key === ' ') this.myKeys.space.pressed = true;
        if (this.myKeys[key]) this.myKeys[key].pressed = true;
    };

    private handleKeyUp = (e: KeyboardEvent) => {
        const key = e.key.toLowerCase();
        if (key === ' ') this.myKeys.space.pressed = false;
        if (this.myKeys[key]) this.myKeys[key].pressed = false;
    };

    constructor() {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
    }

    public destroy() {
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
    }

    public handleMovement(player: Ship) {
        if (this.myKeys.w.pressed) player.accelerate();
        if (this.myKeys.s.pressed) player.desAccelerate();
        if (this.myKeys.a.pressed) player.decRotation();
        if (this.myKeys.d.pressed) player.incRotation();
    }
}