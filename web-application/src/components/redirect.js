const torus = new DirectWebSdk({
    baseUrl: "http://localhost:3000/serviceworker/",
    redirectPathName: "auth",
    network: "testnet", // details for test net
    uxMode: "redirect"
  });
  await torusdirectsdk.init({ skipSw: true });

  