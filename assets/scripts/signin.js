const { Sdk } = require('./assets/scripts/xumm');


const main = async () => {
  const appInfo = await Sdk.ping()
  console.log(appInfo.application.name)
  
  // This payload burns 5 XRMine tokens by sending it to the issuing account.
  const payload = Sdk.payload.createAndSubscribe({
    TransactionType: 'Payment',
    Destination: "rJBFRnbNiTskPhMdL4Q6f82tpMDmKLvVCV",///changed to marketing 
    Amount: {
      currency: "58524D696E650000000000000000000000000000",
      value: "5",
      issuer: "rfXMq3BMX2dTzJtG4pnhr49u6sHkVQXpWL"//issuing account to swap it back
    },
    Fee: "12",
    Flags: "2147483648",
  });


  const result = await payload;
    
    const qrpng = result.created.refs.qr_png;
    console.log(qrpng);

   
}

main()