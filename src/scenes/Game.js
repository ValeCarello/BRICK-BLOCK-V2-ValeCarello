import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
    this.initialBallSpeed = 200;  // Velocidad inicial de la pelota
    this.score = 0;  // Puntaje inicial
    this.brickRows = 4;  // Número de filas de ladrillos
    this.brickCols = 8;  // Número de columnas de ladrillos
  }

  create() {
    // Creación de la paleta (paddle) como rectángulo
    this.paddle = this.add.rectangle(400, 500, 100, 20, 0x6666ff);

    // Creación de la bola como círculo
    this.ball = this.add.circle(400, 300, 10, 0xff6666);

    // Agregar los objetos a las físicas
    this.physics.add.existing(this.paddle);
    this.physics.add.existing(this.ball);

    // La paleta no se puede mover
    this.paddle.body.setImmovable(true);

    // La paleta colisiona con los límites del mundo
    this.paddle.body.setCollideWorldBounds(true);

    // Configuración de la física de la bola
    this.ball.body.setCollideWorldBounds(true);
    this.ball.body.setBounce(1, 1);
    this.ball.body.setVelocity(this.initialBallSpeed, this.initialBallSpeed);

    // Control con las teclas del cursor
    this.cursor = this.input.keyboard.createCursorKeys();

    // Colisión entre la paleta y la bola
    this.physics.add.collider(this.paddle, this.ball);

    // Creación de los ladrillos
    this.bricks = this.physics.add.staticGroup();
    this.createBricks();

    // Colisión entre la bola y los ladrillos
    this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);

    // Crear un límite invisible en la parte inferior del mundo (ajustado fuera de la vista)
    this.createBottomBoundary();

    // Mostrar el puntaje en pantalla
    this.scoreText = this.add.text(16, 16, 'Puntos: 0', { fontSize: '32px', fill: '#fff' });
  }

  createBricks() {
    // Crear una matriz de ladrillos (NxM)
    const brickWidth = 50;
    const brickHeight = 20;
    const offsetX = 65;
    const offsetY = 50;

    for (let row = 0; row < this.brickRows; row++) {
      for (let col = 0; col < this.brickCols; col++) {
        const x = col * (brickWidth + 10) + offsetX;
        const y = row * (brickHeight + 10) + offsetY;
        const brick = this.bricks.create(x, y, null).setSize(brickWidth, brickHeight).setOrigin(0);
        brick.body.updateFromGameObject();
      }
    }
  }

  createBottomBoundary() {
    // Crear un rectángulo invisible como límite inferior fuera de la vista
    const bottomBoundary = this.add.rectangle(400, 720, 800, 10).setVisible(false);
    this.physics.add.existing(bottomBoundary);
    bottomBoundary.body.setImmovable(true);

    // Detectar colisión entre la bola y el límite inferior
    this.physics.add.collider(this.ball, bottomBoundary, this.endGame, null, this);
  }

  update() {
    if (this.cursor.right.isDown) {
      this.paddle.x += 10;
    } else if (this.cursor.left.isDown) {
      this.paddle.x -= 10;
    }
  }

  hitBrick(ball, brick) {
    // Destruir el ladrillo y sumar puntos
    brick.destroy();
    this.score += 10;
    this.scoreText.setText('Puntos: ' + this.score);

    // Verificar si todos los ladrillos han sido destruidos
    if (this.bricks.countActive() === 0) {
      this.restartGame();
    }
  }

  restartGame() {
    // Incrementar la velocidad de la bola en un 10% y reiniciar la escena
    this.initialBallSpeed *= 1.1;
    this.scene.restart();
  }

  endGame() {
    // Terminar el juego y pasar a la escena de GameOver
    this.scene.start('GameOver');
  }
}
