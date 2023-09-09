import jwt from "jsonwebtoken";

export const generateJWT = async (uid: string, name: string) => {
  return new Promise((resolve, reject) => {
    console.log(process.env.SECRET_KEY);
    const payload = { uid, name };
    jwt.sign(
      payload,
      process.env.SECRET_KEY || "",
      {
        expiresIn: "2h",
        algorithm: "HS256",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Error generating JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};
