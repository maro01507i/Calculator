var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mailproyectodas@gmail.com',
        pass: 'mailproyecto'
    }
});

function calcular(op1,op2,op){
    if(op == "+")return Number(op1) + Number(op2);
    else if(op == "-")return op1 - op2;
    else if(op == "*")return op1 * op2;
    else if(op == "/")return op1 / op2;
    else if(op == "^")return Math.pow(op1,op2);

}

function sendEmail(req) {

    var email = req.body.email;
    var nombre = req.body.nombre;

    var mailOptions = {
        from: 'mailproyectodas@gmail.com',
        to: email,
        subject: 'Gracias por registrarse, '+nombre,
        text: 'Buenos días, '+nombre+', gracias por registrarse en nuestra plataforma y ayudarla a expandirla.'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });


}

exports.sendEmail = sendEmail;

exports.calcular = calcular;