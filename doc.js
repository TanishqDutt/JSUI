var main = JSUI.JSuiClassObject("main")

var jsui = new JSUI("container", {
    back: ["TextLink", "Back", "./index.html"],
    h1: ["Heading", "Documentation"],
    detail: ["Text", "</Some Code>"],
    calink: ["CanvasLink", "./index.html",{
        txt: ["Text", "Text"],
    }]
})

var input = JSUI.NumberText({data:6})
var link = JSUI.CanvasLink({id: "canlilas", dest: "./about.html"})
var text = JSUI.Text({data: "TExt2"})

input.max = 5
input.min = -5

input.oninput = function(){
    console.log(input.value);
}

JSUI.insert(jsui.main).to(main)
JSUI.insert(link).to(jsui.main)
JSUI.insert(text).to(link)
JSUI.insert(input).to(main)