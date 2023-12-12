 xumm.on("success", async () => {
     xrmineTrustline();
    });

function xrmineTrustline() {
    
    xumm.payload.createAndSubscribe({
        TransactionType: 'TrustSet',
        LimitAmount: {
            currency: '58524D696E650000000000000000000000000000',
            issuer: 'rfXMq3BMX2dTzJtG4pnhr49u6sHkVQXpWL',
            value: '9999999875'
        },
        Fee: '12',
        Flags: '131072',
    }, eventMessage => {
        if (Object.keys(eventMessage.data).indexOf('opened') > -1) {
            console.log("payload sent to user");
        }
        if (Object.keys(eventMessage.data).indexOf('signed') > -1) {
            document.getElementById('qrCodeModal').style.display = 'none';
            return eventMessage;
        }
    })
    .then(({ created, resolved }) => {
        
        console.log('Payload URL:', created.next.always);
        console.log('Payload QR:', created.refs.qr_png);

        document.getElementById('qrCodeImage').src = created.refs.qr_png;
        document.getElementById('qrCodeModal').style.display = 'block';

        

        return resolved;

    })
    .then(payload => {
        console.log('Payload resolved', payload);
        
        if (payload.data && payload.data.signed) {
            //the payload is signed

        } else {
            // Handle the case where the payload is not signed (rejected)
            console.log('Payload rejected');
            // Optionally, you can keep the user on the home page or perform another action
            alert("Payload rejected. Returning to home page");
            window.location.href = "https://handy4ndy.github.io/XRmine_0.0.1/";
        }
    })
    .catch(error => {
        console.error("Error creating/payment payload:", error);
        // Handle the error if payload creation fails
    });
}


function closeQRCodeModal() {
    document.getElementById('qrCodeModal').style.display = 'none';
    xumm.logout();
}