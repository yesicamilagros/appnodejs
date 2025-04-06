const express =require("express");
const body_parser=require("body-parser");
const axios=require("axios");
require('dotenv').config();

const app=express().use(body_parser.json());

const token=process.env.TOKEN;
const mytoken=process.env.MYTOKEN;

app.listen(process.env.PORT,()=>{
    console.log("webhook is listening")
}

);

app.get("/webhook",(req,res)=>{
   let mode = req.query["hub.mode"];
   let challenge= req.query["hub.challenge"];
   let token= req.query["hub.verify_token"];
   
   
   if (mode && token){

    if(mode==="subscribe" && token===mytoken){
        res.status(200).send(challenge);
    }else {
        res.status(403);
    }

   }
});

app.post("/webhook",(req,res)=>{
    let body_param=req.body;
    console.log(JSON.stringify(body_param,null,2));

    if(body_param.object){
       //console.log("inside body param");
        if(body_param.entry &&
            body_param.entry[0].changes &&
            body_param.entry[0].changes[0].value.messages &&
            body_param.entry[0].changes[0].value.messages[0]
        
        ){

            let phone_nu_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
            let from = body_param.entry[0].changes[0].value.messages[0].from;
            let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;


            //console.log("phone number"+phone_nu_id);
           // console.log("from"+from);
            //console.log("body param"+msg_body);

            


            axios({
             method: "POST",
            url: `https://graph.facebook.com/v22.0/${phone_nu_id}/messages?access_token=${token}`,
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                messaging_product: "whatsapp",
                to: from, // número destino
                type: "interactive",
                interactive: {
                    type: "button",
                    header: {
                        type: "image",  // El tipo de encabezado es "image"
                        image: {
                            link: "https://i.ibb.co/9HHf9TFm/images.png" // URL pública de la imagen
                        }
                    },
                    body: {
                        text: "Bienvenido(a) a Depilzone ¿En qué te podemos ayudarte?"
                    },
                    footer: {
                        text: "Soporte automático"
                    },
                    action: {
                        buttons: [
                            {
                                type: "reply",
                                reply: {
                                    id: "btn_opcion_1",
                                    title: "Agendar una Cita"
                                }
                            },
                            {
                                type: "reply",
                                reply: {
                                    id: "btn_opcion_2",
                                    title: "consultar con un asesor"
                                }
                            },
                            {
                                type: "reply",
                                reply: {
                                    id: "btn_opcion_3",
                                    title: "Ver servicios"
                                }
                            }
                        ]
                    }
                }
            }
        });








            
            
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    }


}



);


app.get("/",(req,res)=>{
    res.status(200).send("hello ello es mi app");
}



);
