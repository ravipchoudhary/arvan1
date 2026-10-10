import bcrypt from "bcryptjs";

export type DemoUser = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  passwordHash: string;
  role: string;
};

export const demoUsers = new Map<string, DemoUser>();

const defaultUser: DemoUser = {
  id: "demo-user",
  name: "Aarav Shah",
  email: "trader@arvan.app",
  mobile: "+91 98765 43210",
  passwordHash: bcrypt.hashSync("Arvan@123", 10),
  role: "trader",
};

demoUsers.set(defaultUser.email, defaultUser);
