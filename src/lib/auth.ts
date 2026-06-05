// Simple auth system using localStorage
export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
  createdAt: string;
}

const ADMIN_EMAIL = "admin@cvpro.sy";
const ADMIN_PASSWORD = "admin123";
const USERS_KEY = "cvpro_users";
const SESSION_KEY = "cvpro_session";

function getUsers(): User[] {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); } catch { return []; }
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser(): User | null {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch { return null; }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function login(email: string, password: string): { success: boolean; error?: string; user?: User } {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const admin: User = { id: "admin", name: "المدير", email: ADMIN_EMAIL, role: "admin", createdAt: new Date().toISOString() };
    localStorage.setItem(SESSION_KEY, JSON.stringify(admin));
    return { success: true, user: admin };
  }
  const users = getUsers();
  const user = users.find(u => u.email === email);
  if (!user) return { success: false, error: "البريد الإلكتروني غير مسجل" };
  // In real app: compare hashed password
  const stored = localStorage.getItem(`pwd_${email}`);
  if (stored !== password) return { success: false, error: "كلمة المرور غير صحيحة" };
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return { success: true, user };
}

export function register(name: string, email: string, password: string): { success: boolean; error?: string; user?: User } {
  const users = getUsers();
  if (users.find(u => u.email === email)) return { success: false, error: "البريد الإلكتروني مسجل مسبقاً" };
  const user: User = { id: Date.now().toString(), name, email, role: "user", createdAt: new Date().toISOString() };
  users.push(user);
  saveUsers(users);
  localStorage.setItem(`pwd_${email}`, password);
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return { success: true, user };
}

export function loginWithGoogle(): { success: boolean; user?: User } {
  // Simulate Google login — in production use Firebase/Google OAuth
  const mockUser: User = {
    id: `google_${Date.now()}`,
    name: "مستخدم Google",
    email: `user${Date.now()}@gmail.com`,
    role: "user",
    avatar: "https://lh3.googleusercontent.com/a/default-user",
    createdAt: new Date().toISOString(),
  };
  const users = getUsers();
  if (!users.find(u => u.id === mockUser.id)) { users.push(mockUser); saveUsers(users); }
  localStorage.setItem(SESSION_KEY, JSON.stringify(mockUser));
  return { success: true, user: mockUser };
}

export function getAllUsers(): User[] {
  return getUsers();
}
