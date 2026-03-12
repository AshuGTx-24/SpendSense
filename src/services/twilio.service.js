import twilio from "twilio";
const client=twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);
export const sendWelcomeMessage=async(phone)=>{
    try{
        await client.messages.create({
            from: process.env.TWILIO_WHATSAPP_NUMBER,
                to: `whatsapp:${phone}`,
                body:`Welcome to SpendSense!
                you can now track your expenses by sending message like:
                Food 200
                Uber 350
                Coffee 120
                Start Tracking now!`
        });
    }catch(error){
        console.error("Twilio Error:", error);
    }
};