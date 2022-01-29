
var main = JSUI.JSuiClassObject("main")

// let obj = new JSUI("contanier", {
//     heading_1: ["Text", "Please click Below Button"],
//     btn_1: ["Button", "Click Me"],
//     innerBox: ["Canvas", {
//         btn_2: ["Button", "Click Me"],
//         txt_1: ["Text", "You Are in Inner Box"],
//         innerinnerBox: ["Canvas", {
//             txt_2: ["Text", "You Are in Inner Inner Box"],
//         }]
//     }],
//     img_1: ["Image", "./wallpaper.jpg"],
//     hed_1: ["Heading", "Title"]
// }) 

let obj = new JSUI("contanier", {
    hed_1: ["Heading", "Welcome to my site"],
    txt_1: ["Text", `This is Home Page
There is About and Documentation Page Also`],
    link1: ["TextLink", "About", "./about.html"],
    link2: ["TextLink", `
Documentation`, "./doc.html"],
}) 


console.log(obj.main);
JSUI.insert(obj.main).to(main)