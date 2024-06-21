console.log(pixi_viewport);
// class MobilePhone {
//     constructor(name, price) {
//         this.name = name;
//         this.price = price ?? 50;
//     }
//     printName() {
//         console.log("i'm a mobile phone and my name is", this.name);
//     }
//     cheaperThan(other) {
//         return this.price < other.price;
//     }
// }
// const iphone5 = new MobilePhone("Iphone5", 30);
// const iphone6 = new MobilePhone("Iphone6");
// const iphone7 = new MobilePhone("Iphone7");
// const iphone8 = new MobilePhone("Iphone8");
// const iphone9 = new MobilePhone("Iphone9", 70);
// iphone5.printName();
// iphone6.printName();
// iphone7.printName();
// iphone8.printName();
// console.log(iphone9.cheaperThan(iphone5));

window.onload = async function () {
    const app = new PIXI.Application();

    await app.init({
        width: 400,
        height: 400,
        backgroundColor: 0xAAAAAA
    });

    const viewport = new pixi_viewport.Viewport({events: app.renderer.events});

    app.stage.addChild(viewport);

    // object

    document.body.appendChild(app.canvas);

    const backgroundTexture = await PIXI.Assets.load("images/labyrinthe.png");
    const background = new PIXI.Sprite(backgroundTexture);

    viewport.addChild(background);

    const playerTexture = await PIXI.Assets.load('images/paint.png');
    const player = new PIXI.Sprite(playerTexture);
    player.anchor.set(0.5);
    player.x = app.view.width / 2;
    player.y = app.view.height / 2;

    viewport.addChild(player);

    // viewport.follow(player, {
    //     speed: 0,           // speed to follow in pixels/frame (0=teleport to location)
    //     acceleration: null, // set acceleration to accelerate and decelerate at this rate; speed cannot be 0 to use acceleration
    //     radius: null,       // radius (in world coordinates) of center circle where movement is allowed without moving the viewport
    // });

    //keyboard

    window.addEventListener("keydown", keysDown);
    window.addEventListener("keyup", keysUp);

    app.ticker.add(gameLoop);

    const keysDiv = document.querySelector("#keys");
    const keys = {};

    // player.on("pointermove", movePlayer);
    // player.on("pointerenter", movePlayer);
    // player.on("pointerout", movePlayer);

    function keysDown(e) {
        console.log(e.KeyCode);
        keys[e.keyCode] = true;
    }

    function keysUp(e) {
        console.log(e.keyCode);
        keys[e.keyCode] = false;
    }
    function gameLoop() {
        keysDiv.innerHTML = JSON.stringify(keys) + ` player position : ${player.x}, ${player.y}`;
        if (keys["38"]) {
            background.y += 3;
        }

        else if (keys["40"]) {
            background.y -= 3;
        }

        else if (keys["39"]) {
            background.x -= 3;
        }

        else if (keys["37"]) {
            background.x += 3;
        }
    }
    function movePlayer(e) {
        let pos = e.data.global;
        player.x = pos.x;
        player.y = pos.y;
    }
}
