var main = JSUI.JSuiClassObject("main")

var jsui = new JSUI("container", {
    back: ["TextLink", "Back", "./index.html"],
    h1: ["Heading", "About"],
    detail: ["Text", "Hi! I am Tanishq"],
    
})

JSUI.insert(jsui.main).to(main)