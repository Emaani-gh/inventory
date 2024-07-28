import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (user) => {
  const payload = {
    emailAddress: user.emailAddress,
    // userId: user.userId,
    firstName: user.firstName,
    lastName: user.lastName,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};
