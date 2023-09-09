import jwt from "jsonwebtoken";

export const generateJWT = async (
  uid: string,
  userName: string,
  role: string
) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, userName, role };
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
