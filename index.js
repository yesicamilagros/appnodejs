
/*


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

app.post("/webhook", async (req, res) => {
    try {
        let body_param = req.body;
        console.log("Recibido el cuerpo:", JSON.stringify(body_param, null, 2));

        if (
            body_param.object &&
            body_param.entry &&
            body_param.entry[0].changes &&
            body_param.entry[0].changes[0].value.messages &&
            body_param.entry[0].changes[0].value.messages[0]
        ) {
            const messageObj = body_param.entry[0].changes[0].value.messages[0];
            const from = messageObj.from;
            const phone_nu_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
            const msg_body = messageObj.text?.body || "";

            const sendInteractiveMessage = async () => {
                try {
                    const response = await axios({
                        method: "POST",
                        url: `https://graph.facebook.com/v17.0/${phone_nu_id}/messages?access_token=${token}`,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: {
                            messaging_product: "whatsapp",
                            to: from,
                            type: "interactive",
                            interactive: {
                                type: "button",
                                header: {
                                    type: "image",
                                    image: {
                                        link: "https://i.ibb.co/HDPPFMVs/images-1.png"
                                    }
                                },
                                body: {
                                    text: "Bienvenido(a) a Depilzone, ¿En qué podemos ayudarte?"
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
                                                title: "Agendar una cita"
                                            }
                                        },
                                        {
                                            type: "reply",
                                            reply: {
                                                id: "btn_opcion_2",
                                                title: "Hablar con un asesor"
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
                    console.log("Respuesta interactiva enviada:", response.data);
                } catch (error) {
                    console.error("Error al enviar el mensaje interactivo:", error.response?.data || error.message);
                }
            };

            const normalizedMsg = msg_body.toLowerCase().trim();
            if (
                normalizedMsg === "agendar una cita" ||
                normalizedMsg === "hablar con un asesor" ||
                normalizedMsg === "ver servicios"
            ) {
                await sendInteractiveMessage();
            } else {
                await sendInteractiveMessage();
            }

            return res.sendStatus(200);
        } else {
            return res.sendStatus(404);
        }
    } catch (err) {
        console.error("Error procesando el webhook:", err.message);
        return res.sendStatus(500);
    }
});








/*
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
    to: from, // Número de destino
    type: "interactive",
    interactive: {
        type: "button",
        header: {
            type: "image",  // Especificamos que el encabezado es una imagen
            image: {
                link: "https://i.ibb.co/HDPPFMVs/images-1.png"  // URL de la imagen pública
            }
        },
        body: {
            text: "Bienvenido(a) a Depilzone ¿En qué podemos ayudarte?"
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
                        title: "Agendar una cita"
                    }
                },
                {
                    type: "reply",
                    reply: {
                        id: "btn_opcion_2",
                        title: "Hablar con un asesor"
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
*/


    
/*
app.get("/",(req,res)=>{
    res.status(200).send("hello ello es mi app");
}



);


*/





const express = require("express");
const body_parser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const app = express().use(body_parser.json());

const token = process.env.TOKEN;
const mytoken = process.env.MYTOKEN;

app.listen(process.env.PORT, () => {
    console.log("webhook is listening");
});

app.get("/webhook", (req, res) => {
    let mode = req.query["hub.mode"];
    let challenge = req.query["hub.challenge"];
    let token = req.query["hub.verify_token"];

    if (mode && token) {
        if (mode === "subscribe" && token === mytoken) {
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

app.post("/webhook", async (req, res) => {
    try {
        const body = req.body;
        console.log("Webhook recibido:\n", JSON.stringify(body, null, 2));

        const entry = body.entry?.[0];
        const changes = entry?.changes?.[0];
        const value = changes?.value;
        const message = value?.messages?.[0];

        if (message) {
            const from = message.from;
            const phone_number_id = value.metadata.phone_number_id;

            // Si es un mensaje de tipo texto
            const textBody = message?.text?.body;

            // Si es una respuesta de botón
            const buttonReplyID = message?.interactive?.button_reply?.id;

            if (buttonReplyID) {
                switch (buttonReplyID) {
                    case "btn_opcion_1":
                        await sendTextMessage(from, phone_number_id, "Perfecto, vamos a agendar tu cita.");
                        break;
                    case "btn_opcion_2":
                        await sendTextMessage(from, phone_number_id, "Un asesor se comunicará contigo pronto.");
                        break;
                    case "btn_opcion_3":
                        await sendTextMessage(from, phone_number_id, "Aquí puedes ver nuestros servicios: depilzone.com/servicios");
                        break;
                    default:
                        await sendTextMessage(from, phone_number_id, "Opción no reconocida.");
                }
            } else {
                // Si no es botón, mandamos el mensaje con los botones
                await sendInteractiveMessage(from, phone_number_id);
            }

            return res.sendStatus(200);
        } else {
            return res.sendStatus(404);
        }
    } catch (err) {
        console.error("Error en el webhook:", err.message);
        return res.sendStatus(500);
    }
});

async function sendTextMessage(to, phone_number_id, text) {
    try {
        await axios.post(
            `https://graph.facebook.com/v17.0/${phone_number_id}/messages?access_token=${token}`,
            {
                messaging_product: "whatsapp",
                to,
                text: { body: text }
            },
            { headers: { "Content-Type": "application/json" } }
        );
    } catch (err) {
        console.error("Error enviando mensaje:", err.response?.data || err.message);
    }
}

async function sendInteractiveMessage(to, phone_number_id) {
    try {
        await axios.post(
            `https://graph.facebook.com/v17.0/${phone_number_id}/messages?access_token=${token}`,
            {
                messaging_product: "whatsapp",
                to,
                type: "interactive",
                interactive: {
                    type: "button",
                    header: {
                        type: "image",
                        image: {
                            link: "https://i.ibb.co/HDPPFMVs/images-1.png"
                        }
                    },
                    body: {
                        text: "Bienvenido(a) a Depilzone, ¿En qué podemos ayudarte?"
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
                                    title: "Agendar una cita"
                                }
                            },
                            {
                                type: "reply",
                                reply: {
                                    id: "btn_opcion_2",
                                    title: "Hablar con un asesor"
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
            },
            { headers: { "Content-Type": "application/json" } }
        );
    } catch (err) {
        console.error("Error enviando mensaje interactivo:", err.response?.data || err.message);
    }
}


