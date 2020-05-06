const nodemailer = require('nodemailer');
const { confirmationEmail } = require ('./confirmation_template');

const getEmailData = (to, name, template) => {
    let data = null;

    switch(template) {
        case "confirm": 
        data = {
            from: "Raymond Chu <raycutbarbershop@gmail.com",
            to,
            name,
            subject: "Thank you for booking an appointment!",
            html: confirmationEmail()
        }
        break;
        default: data;
    }

    return data;
}

const sendEmail = (to, name, template) => {
    const smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "raycutbarbershop@gmail.com",
            pass: "clippers123"
        }
    })

    const mail = getEmailData(to, name, template);

    smtpTransport.sendMail(mail, function(err, response) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("email sent successfully!");
        }
        smtpTransport.close();
    })
}

module.exports = { sendEmail }