let name = document.getElementById('name');
let fame = document.getElementById('orgg');
let submit = document.getElementById('submit');
submit.addEventListener('click',()=>{
    let credentialUser = Math.ceil(Math.random()*10000);
    let str = "TEAM2020"+credentialUser.toString();
    generetPdf(name.value,fame.value,str);
    name.value = '';
    fame.value = '';
})


const generetPdf = async (name,fame,cr)=>{
    const {PDFDocument,rgb} = PDFLib;

    const exBytes = await fetch("./Certificate.pdf").then((res)=>{
        return res.arrayBuffer()
    });

    const exFont = await fetch('./Ubuntu-Regular.ttf').then((res)=>{
        return res.arrayBuffer();
    })


    
    
    const pdfDoc = await PDFDocument.load(exBytes)
    
    pdfDoc.registerFontkit(fontkit);
    const myFont = await pdfDoc.embedFont(exFont);

    const pages = pdfDoc.getPages();
    const firstP = pages[0];
    firstP.drawText(name,{
        x:210,
        y:250,
        size:70,
        font:myFont,
        color: rgb(0, 0.5, 1)
    })

    firstP.drawText("C.No: "+cr,{
        x:650,
        y:410,
        size:15,
        font:myFont,
        color: rgb(1, 0.2, 0)
    })

    firstP.drawText(fame,{
        x:350,
        y:200,
        size:15,
        font:myFont,
        color: rgb(0, 0.76, 0.8)
    })

    const uri = await pdfDoc.saveAsBase64({dataUri: true});
    saveAs(uri,name+" "+cr+" "+"Certificate.pdf",{autoBom:true})
    // document.querySelector("#myPDF").src = uri;
};