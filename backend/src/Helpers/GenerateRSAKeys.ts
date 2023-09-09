const { subtle } = globalThis.crypto;
function btoa(str: string) {
  return Buffer.from(str, "binary").toString("base64");
}

/*
  Convert  an ArrayBuffer into a string
  from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
  */
function ab2str(buf: ArrayBuffer) {
  const bufView = new Uint8Array(buf);
  return String.fromCharCode.apply(null, Array.from(bufView));
}

async function exportPrivateCryptoKey(key: CryptoKey) {
  const exported = await subtle.exportKey("pkcs8", key);
  const exportedAsString = ab2str(exported);
  const exportedAsBase64 = btoa(exportedAsString);
  const pemExported = `-----BEGIN RSA PRIVATE KEY-----\n${exportedAsBase64}\n-----END RSA PRIVATE KEY-----`;
  return pemExported;
}

async function exportPublicCryptoKey(key: CryptoKey) {
  const exported = await subtle.exportKey("spki", key);
  const exportedAsString = ab2str(exported);
  const exportedAsBase64 = btoa(exportedAsString);
  let splittedKey = [];
  let lineSize = 40;
  for (let i = 0; i < exportedAsString.length; i += lineSize) {
    splittedKey.push(exportedAsBase64.slice(i, i + lineSize));
  }
  const pemExported = `-----BEGIN PUBLIC KEY-----\n${exportedAsBase64}\n-----END PUBLIC KEY-----`;
  return pemExported;
}

export async function generateKeyPair() {
  console.log(subtle);
  const keyPair = await subtle.generateKey(
    {
      name: "RSA-PSS",
      // Consider using a 4096-bit key for systems that require long-term security
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["sign", "verify"]
  );
  console.log(keyPair);
  return {
    priv: await exportPrivateCryptoKey(keyPair.privateKey),
    pub: await exportPublicCryptoKey(keyPair.publicKey),
  };
}
