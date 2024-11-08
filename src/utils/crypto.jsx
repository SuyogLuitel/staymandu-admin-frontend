import CryptoJS from "crypto-js";
const secretPass = import.meta.env.VITE_CRYPTO_SECRET_KEY;

export const encryptData = (plainText) => {
  const cipherText = CryptoJS.AES.encrypt(
    JSON?.stringify(plainText),
    secretPass
  ).toString();
  return cipherText;
};

export const decryptedData = (cipherText) => {
  const plainText =
    cipherText &&
    JSON?.parse(
      CryptoJS.AES.decrypt(cipherText.toString(), secretPass).toString(
        CryptoJS.enc.Utf8
      )
    );
  return plainText;
};
