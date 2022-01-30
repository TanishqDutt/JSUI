/*

Thanks for using JSUI v1.0 by Coder

*/

class JSUI {

    constructor(win) {
        this.win = win
    }
    JSONtoHTML(id, obj) {
        let a = Object.keys(obj)
        let can = new JSUI(this.win).Canvas({ id: id })
        for (let ia = 0; ia < a.length; ia++) {
            const element = a[ia];

            if (obj[element][0] == "Canvas") {


                let jsa = new JSUI(this.win).JSONtoHTML(element, obj[element][1])
                new JSUI(this.win).insert(jsa).to(can)


            } else if (obj[element][0] == "Button" ||
                obj[element][0] == "Text" ||
                obj[element][0] == "Heading" ||
                obj[element][0] == "InputCheckbox" ||
                obj[element][0] == "InputText" ||
                obj[element][0] == "InputNumber" ||
                obj[element][0] == "Image") {


                let ele = new JSUI(this.win)[obj[element][0]]({ data: obj[element][1], id: element })
                new JSUI(this.win).insert(ele).to(can)

            } else if (obj[element][0] == "TextLink") {


                let ele = new JSUI(this.win)[obj[element][0]]({ data: obj[element][1], id: element, dest: obj[element][2] })
                new JSUI(this.win).insert(ele).to(can)

            } else if (obj[element][0] == "CanvasLink") {
                let jsaLink = new JSUI(this.win).JSONtoHTML(element, obj[element][2])
                jsaLink.onclick = () => {
                    this.win.location.href = String(obj[element][1]);
                }
                new JSUI(this.win).insert(jsaLink).to(can)


            } else if (obj[element][0] == "InputDate" ||
                obj[element][0] == "InputTime" ||
                obj[element][0] == "InputDateTime"
            ) {
                let ele = new JSUI(this.win)[obj[element][0]]({ id: element })
                new JSUI(this.win).insert(ele).to(can)
            }
        }
        return can
    }
    newClassName(className) {
        return `.jsui.${className}`
    }
    Canvas({ id }) {
        let can = this.win.document.createElement("div");

        if (id !== undefined) {
            can.id = id;
        }
        return can
    }
    Button({ data, id }) {
        let btn = this.win.document.createElement("button");
        btn.innerText = data;
        if (id !== undefined) {
            btn.id = id;
        }
        return btn;
    }
    Image({ data, id }) {
        let img = this.win.document.createElement("img");
        img.src = data;
        if (id !== undefined) {
            img.id = id;
        }
        return img;
    }
    Text({ data, id }) {
        let txt = this.win.document.createElement("p");
        txt.innerText = data;
        if (id !== undefined) {
            txt.id = id;
        }
        return txt
    }
    Heading({ data, id }) {
        let txt = this.win.document.createElement("h1");
        txt.innerText = data;
        if (id !== undefined) {
            txt.id = id;
        }
        return txt
    }
    TextLink({ data, id, dest }) {
        let txt = this.win.document.createElement("a");
        txt.innerText = data;
        txt.href = dest;
        if (id !== undefined) {
            txt.id = id;
        }
        return txt
    }
    CanvasLink({ id, dest }) {
        let can = this.win.document.createElement("div");
        can.onclick = () => {
            location.href = dest
        }
        if (id !== undefined) {
            can.id = id;
        }
        return can
    }
    InputText({ data, id }) {
        let txt = this.win.document.createElement("input");
        txt.value = data;
        txt.type = "Text"
        if (id !== undefined) {
            txt.id = id;
        }
        return txt
    }
    InputNumber({ data, id }) {
        let txt = this.win.document.createElement("input");
        txt.value = data;
        txt.type = "Number"
        if (id !== undefined) {
            txt.id = id;
        }
        return txt
    }
    InputCheckbox({ data, id }) {
        let inp = this.win.document.createElement("input")
        inp.checked = data
        inp.type = "checkbox"
        if (id !== undefined) {
            inp.id = id
        }
        return inp
    }
    InputDate({ id }) {
        let inp = this.win.document.createElement("input")
        inp.type = "date"
        if (id !== undefined) {
            inp.id = id
        }
        return inp
    }
    InputTime({ id }) {
        let inp = this.win.document.createElement("input")
        inp.type = "time"
        if (id !== undefined) {
            inp.id = id
        }
        return inp
    }
    InputDateTime({ id }) {
        let inp = this.win.document.createElement("input")
        inp.type = "datetime"
        if (id !== undefined) {
            inp.id = id
        }
        return inp
    }
    select(selector) {
        return this.win.document.querySelector(`#${selector}`)
    }
    insert(elem) {
        return {
            to: function (canvas) {
                if (canvas.localName == "div") {
                    canvas.appendChild(elem)
                }
                else {
                    this.win.console.error(`Cannot insert to : ${canvas.localName}`);
                }
            }
        }

    }
    injectStyle(sty) {
        if (sty.localName == "style") {
            this.win.document.head.appendChild(sty)
        } else {
            this.win.console.error("Cannot inject. " + sty.localName + " is not a valid styling")
        }
    }
    JSUIClassObject(classs) {

        let elem = this.win.document.querySelectorAll(`.jsui.${classs}`)

        if (elem.length == 1) {
            return this.win.document.querySelector(`.jsui.${classs}`)
        }
        else {
            return elem
        }

    }
    TextToHTML(str){
        d = document.createElement("div")
        d.innerHTML = str
        return d
    }
}

class Style {
    constructor(obj) {
        let newStylingBox = document.createElement("style")
        let css = ""

        if (typeof obj == "object") {
            for (let i = 0; i < obj.length; i++) {
                const element = obj[i];

                if (typeof element == "object") {

                    if (element[0] == "@keyframes") {
                        css+="@keyframes "+element[1]
                        css+="{"
                        for (let i1 = 0; i1 < element[2].length; i1++) {
                            const keyframes = element[2][i1];
                            css+=keyframes[0]+"{"

                            for (let i2 = 0; i2 < Object.keys(keyframes[1]).length; i2++) {
                                const props = Object.keys(keyframes[1])[i2];
                                const value = keyframes[1][props]

                                css = css + Style.propertyName(props)
                                css += ":"
                                css += value
                                css += ";"
                            }
                            css+="}"

                        }
                        css+="}"

                    } else {
                        css = css + element[0]
                        css = css + "{"
                        for (let index = 0; index < Object.keys(element[1]).length; index++) {
                            const property = Object.keys(element[1])[index];
                            const value = element[1][property]

                            css = css + Style.propertyName(property)
                            css += ":"
                            css += value
                            css += ";"
                        }
                        css += "}"
                    }

                } else {
                    console.error("Cannot use " + typeof obj + " while styling. Kindly read our documentation.")
                }



            }
        } else {
            console.error("Cannot use " + typeof obj + " while styling. Kindly read our documentation.")
        }
        
        newStylingBox.innerHTML = css

        this.css = css
        this.html = newStylingBox
        this.js = obj

    }
    static propertyName(str){
        let dems = ""
        for (let index = 0; index < str.length; index++) {
            const element = str[index];

            if(element==element.toUpperCase()){
            
                dems+="-"
                dems+=element.toLowerCase()
            }else{
                dems+=element
            }
        }

        return dems
    }
    static TextToCSS(text){
        let newCSS = document.createElement("style")
        newCSS.innerHTML=text

        return newCSS
    }
}




