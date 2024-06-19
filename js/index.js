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

let app;
let player;
let keys = {};
let keysDiv;
window.onload = async function () {
    app = new PIXI.Application();

    await app.init({
        width: 1600,
        height: 1200,
        backgroundColor: 0xAAAAAA
    });

    // object

    document.body.appendChild(app.canvas);


    const texture = await PIXI.Assets.load('images/paint.png');
    const background = await PIXI.Assets.load("images/labyrinthe.png");
    player = new PIXI.Sprite(texture);
    player.interactive = true;
    player.anchor.set(0.5);
    player.x = app.view.width / 2;
    player.y = app.view.height / 2;

    app.stage.addChild(player);

    //keyboard

    window.addEventListener("keydown", keysDown);
    window.addEventListener("keyup", keysUp);

    app.ticker.add(gameLoop);

    keysDiv = document.querySelector("#keys");

    app.stage.interactive = false;

    player.on("pointermove", movePlayer);
    player.on("pointerenter", movePlayer);
    player.on("pointerout", movePlayer);

    function keysDown(e) {
        console.log(e.KeyCode);
        keys[e.keyCode] = true;
    }

    function keysUp(e) {
        console.log(e.keyCode);
        keys[e.keyCode] = false;
    }
    function gameLoop() {
        keysDiv.innerHTML = JSON.stringify(keys);
        if (keys["38"]) {
            player.y -= 5;
        }

        else if (keys["40"]) {
            player.y += 5
        }

        else if (keys["39"]) {
            player.x += 5
        }

        else if (keys["37"]) {
            player.x -= 5
        }
    }


}

function movePlayer(e) {
    let pos = e.data.global;

    player.x = pos.x;
    player.y = pos.y;
}