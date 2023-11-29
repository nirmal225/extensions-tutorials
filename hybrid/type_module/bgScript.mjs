import {HelloWorld} from "./HelloWorld.mjs";
function run() {
    let helloClass = new HelloWorld()

    helloClass.print()
}
console.log("bg script is created")
run();
