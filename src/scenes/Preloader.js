
import { Scene } from 'phaser';

export class Preloader extends Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    // Mostrar imagen de fondo
    this.add.image(512, 384, 'background');

    // Barra de progreso
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    // Crear la barra de progreso real
    const progressBar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

    // Actualizar la barra de progreso según el evento de carga
    this.load.on('progress', (progress) => {
      progressBar.width = 4 + (460 * progress);
    });
  }

  preload() {
    // Cargar los recursos del juego
    this.load.setPath('assets');
    this.load.image('logo', 'logo.png');
  }

  create() {
    // Iniciar la escena del menú principal cuando todo esté cargado
    this.scene.start('MainMenu');
  }
}
