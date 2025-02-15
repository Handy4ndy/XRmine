document.addEventListener('DOMContentLoaded', function () {

    //loadVideoCheck();
    loadLoginCheck();
    
});

window.addEventListener('beforeunload', function (event) {
    xumm.logout();
  });

/*function loadVideoCheck() {
    let videoPopupCheck = sessionStorage.getItem("watchedVideo");

    if (!videoPopupCheck){
    const videoContainer = document.getElementById('video-container');
    videoContainer.style.display = 'flex';
    sessionStorage.setItem("watchedVideo", "true");
    }
    
}*/

function loadLoginCheck() {
    let checkLoggedIn = sessionStorage.getItem('isLoggedIn');

    if (checkLoggedIn) {
        // User is logged in, perform any necessary cleanup
        console.log("User logged out");
        xumm.logout();
    };

}

var xumm = new Xumm('66285bb2-33b7-406b-83de-9ccfcc2103cd');

xumm.on("ready", () => console.log("Ready -Awaiting user sign in"));

xumm.on("logout", async () => {
    window.location.href = "index.html";
  });
 
 xumm.on("success", async () => {
     xrmineTrustline();
     sessionStorage.setItem('isLoggedIn', 'true');
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
            return eventMessage;
        
        }
        if (Object.keys(eventMessage.data).indexOf('signed') > -1) {
            document.getElementById('qrCodeModal').style.display = 'none';
            return eventMessage;
        }
        if (Object.keys(eventMessage.data).indexOf('closed') > -1) {
            document.getElementById('qrCodeModal').style.display = 'none';
            xumm.logout();
            return eventMessage;
        }
    })
    .then(({payload, created, resolved }) => {
        
        console.log('Payload URL:', created.next.always);
        console.log('Payload QR:', created.refs.qr_png);

        document.getElementById('qrCodeImage').src = created.refs.qr_png;
        document.getElementById('qrCodeDeepLink').href = `xumm.xapp://${created.next.always}`;
        document.getElementById('qrCodeModal').style.display = 'block';
        xumm.xapp.openSignRequest(payload);
        
        return resolved;
        

    })
    .then(payload => {
        
        if (payload.data && payload.data.signed) {
            //the payload is signed
            console.log('XRMine Trustline added');
            // Optionally, you can keep the user on the home page or perform another action
            alert("XRMine Trustline has been set");
            document.getElementById('qrCodeModal').style.display = 'none';
            xumm.logout();
            sessionStorage.removeItem('isLoggedIn');
            

        } else {
            // Handle the case where the payload is not signed (rejected)
            console.log('XRMine Trustline rejected');
            // Optionally, you can keep the user on the home page or perform another action
            alert("Error setting Trustline - user logged out");
            xumm.logout();
            document.getElementById('qrCodeModal').style.display = 'none';
            sessionStorage.removeItem('isLoggedIn');
        }
    })
    .catch(error => {
        console.error("Error creating/payment payload:", error);
        // Handle the error if payload creation fails
    });
}


function closeQRCodeModal() {
    document.getElementById('qrCodeModal').style.display = 'none';
    alert("Error setting Trustline - user logged out");
    xumm.logout();
}

/*function closeVideoPopup() {
    const videoContainer = document.getElementById('video-container');
    videoContainer.style.display = 'none';
  }

//function mobileDeepLink() {
    // Replace 'your-deep-link' with the actual deep link you want to use
  //  var deepLink = `"xumm.xapp://${created.next.always}"`;

    //window.location.href = deepLink;
//}*/



