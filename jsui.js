class JSUI{
    
    constructor(id, obj){
        let a = Object.keys(obj)
        let can = JSUI.Canvas({id: id})
        for (let ia = 0; ia < a.length; ia++) {
            const element = a[ia];
            
            if(obj[element][0]=="Canvas"){


                let jsa = new JSUI(element, obj[element][1])
                JSUI.insert(jsa.main).to(can)


            }else if(obj[element][0] == "Button" || 
                    obj[element][0] == "Text" || 
                    obj[element][0] == "Heading" || 
                    obj[element][0] == "Image"){


                let ele = JSUI[obj[element][0]]({data:obj[element][1], id: element}) 
                JSUI.insert(ele).to(can)
                
            }else if(obj[element][0] == "TextLink"){


                let ele = JSUI[obj[element][0]]({data:obj[element][1], id: element, dest: obj[element][2]}) 
                JSUI.insert(ele).to(can)
                
            }else if(obj[element][0] == "CanvasLink"){
                let jsaLink = new JSUI(element, obj[element][2])
                jsaLink.main.onclick = ()=>{
                    location.href = String(obj[element][1]);
                }

                JSUI.insert(jsaLink.main).to(can)
                
            }
        }
        this.main = can;
    }
    static newClassName(className){
        return `.jsui.${className}`
    }
    static Canvas({id}){
        let can = document.createElement("div");
        
        if(id !== undefined){ 
            can.id = id;
        }
        return can
    }
    static Button({data, id}){
        let btn = document.createElement("button");
        btn.innerText = data;
        if(id !== undefined){ 
            btn.id = id;
        }
        return btn;
    }
    static Image({data, id}){
        let img = document.createElement("img");
        img.src = data;
        if(id !== undefined){ 
            img.id = id;
        }
        return img;
    }
    static Text({data, id}){
        let txt = document.createElement("p");
        txt.innerText = data;
        if(id !== undefined){ 
            txt.id = id;
        }
        return txt
    }
    static Heading({data, id}){
        let txt = document.createElement("h1");
        txt.innerText = data;
        if(id !== undefined){ 
            txt.id = id;
        }
        return txt
    }
    static TextLink({data, id, dest}){
        let txt = document.createElement("a");
        txt.innerText = data;
        txt.href = dest;
        if(id !== undefined){ 
            txt.id = id;
        }
        return txt
    }
    static CanvasLink({id, dest}){
        let can = document.createElement("div");
        can.onclick = ()=>{
            location.href = dest
        }
        if(id !== undefined){ 
            can.id = id;
        }
        return can
    }
    static InputText({data, id}){
        let txt = document.createElement("input");
        txt.value = data;
        txt.type = "Text"
        if(id !== undefined){ 
            txt.id = id;
        }
        return txt
    }
    static NumberText({data, id}){
        let txt = document.createElement("input");
        txt.value = data;
        txt.type = "Number"
        if(id !== undefined){ 
            txt.id = id;
        }
        return txt
    }
    static insert(elem){
        return {
            to: function(canvas){
                if(canvas.localName=="div"){
                    canvas.appendChild(elem)
                }
                else{
                    console.error(`Cannot import to : ${canvas.localName}`);
                }
            }
        }

    }
    static JSuiClassObject(classs){

        let elem = document.querySelectorAll(`.jsui.${classs}`)
        if(elem.length==1){
            return document.querySelector(`.jsui.${classs}`)
        }
        else{
            return elem
        }
        
    }
}
