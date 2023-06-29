import nodemailer from "nodemailer";
import cron from "node-cron";
import dotenv from "dotenv";
dotenv.config();

let transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE_PROVIDER,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

export interface IEmail {
  email: string;
}

interface IEmailSend {
  email: string;
  text: string;
}

export const emailSend = async ({ email, text }: IEmailSend) => {
  try {
    await transporter.sendMail({
      from: "demo@gmil.com",
      to: email,
      subject: "Noticeboard",
      html: `<body style="background-color:#FFFFFF; color:#023243; font-size:15px; text-align: left"> 
      <h1 style =" text-align: center; color:#023243;">Notice</h1>
      <p style="color:#023243; font-size:15px;"> ${text}</p>
       </b>  <br/><br/>
      
    </body>`,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const sendMailToAllUser = ({
  data,
  text,
}: {
  data: IEmail[];
  text: string;
}) => {
  try {
    cron.schedule("0 */1 * * *", () => {
      if (data.length > 0) {
        data.map(async (val: IEmail) => {
          await emailSend({ email: val.email, text });
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
