
import { Scene } from 'phaser';

export class GameOver extends Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    // Establecer color de fondo
    this.cameras.main.setBackgroundColor(0xff0000);

    // Añadir imagen de fondo con transparencia
    this.add.image(512, 384, 'background').setAlpha(0.5);

    // Añadir texto de "Game Over"
    this.add.text(512, 384, 'Game Over', {
      fontFamily: 'Arial Black', 
      fontSize: 64, 
      color: '#ffffff',
      stroke: '#000000', 
      strokeThickness: 8,
      align: 'center'
    }).setOrigin(0.5);

    // Esperar clic para reiniciar el juego
    this.input.once('pointerdown', () => {
      this.scene.start('MainMenu');
    });
  }
}
