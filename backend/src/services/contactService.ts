import {
  MAIL_USERNAME,
  OAUTH_CLIENT_SECRET,
  OAUTH_CLIENTID,
  OAUTH_REFRESH_TOKEN,
} from "../config/envs";

const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  OAUTH_CLIENTID,
  OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: OAUTH_REFRESH_TOKEN,
});

const getAccessToken = async () => {
  try {
    const res = await oauth2Client.getAccessToken();
    if (!res.token) {
      throw new Error("No se pudo obtener el token de acceso.");
    }
    return res.token;
  } catch (error) {
    console.error("Error al obtener el token de acceso:", error);
    throw error;
  }
};

export const sendEmail = async (
  name: string,
  email: string,
  phone: string,
  message: string
) => {
  try {
    const accessToken = await getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        type: "OAuth2",
        user: MAIL_USERNAME,
        clientId: OAUTH_CLIENTID,
        clientSecret: OAUTH_CLIENT_SECRET,
        refreshToken: OAUTH_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptionsAdmin = {
      from: `"${name}" <${email}>`,
      to: MAIL_USERNAME,
      subject: "Nueva Consulta desde la Web",
      replyTo: email,
      html: `
        <h3>Has recibido un nuevo mensaje</h3>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `,
    };
    const messageUser = {
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: "Confirmación de tu consulta",
      text: `Hola ${name},\n\nGracias por tu consulta. Aquí tienes una copia de lo que enviaste:\n\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\n\nMensaje: ${message}\n\nTe responderemos lo antes posible.`,
      html: `<p>Hola <strong>${name}</strong>,</p>
             <p>Gracias por tu consulta. Aquí tienes una copia de lo que enviaste:</p>
             <p><strong>Nombre:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Teléfono:</strong> ${phone}</p>
             <p><strong>Mensaje:</strong></p>
             <p>${message}</p>
             <p>Te responderemos lo antes posible.</p>`,
    };
    const infoAdmin = await transporter.sendMail(mailOptionsAdmin);
    const infoUser = await transporter.sendMail(messageUser);
    console.log("Correo enviado:", infoAdmin.messageId, infoUser.messageId);
    return {
      success: true,
      message: "Correo enviado con exito",
    };
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return {
      success: false,
      message: "Error al enviar el correo",
    };
  }
};
