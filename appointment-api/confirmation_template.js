const confirmationEmail = () => {

    return `
      <!DOCTYPE html>
     <html style="margin: 0; padding: 0;">
     
         <head>
             <title>Thank you for booking!</title>
         </head>
     
             <body style="margin: 0; padding: 0;">
                <br />
                <br />
                <div>
                    <p>This is just a confirmation that you have booked an appointment with us!</p>
                    <p>Hope you have a great day!</p>
                </div>
                
                <br />
                <br />
             </body>
     
       </html>
      `;
  };
  
  module.exports = { confirmationEmail };