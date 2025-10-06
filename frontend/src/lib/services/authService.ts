import Cookies from 'js-cookie';

class AuthService {
  private baseUrl = 'http://localhost:8080';

  async login(username: string, password: string) {
    const res = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await res.json();

    // Store the token in a browser cookie (NOT httpOnly)
    if (data.token) {
      Cookies.set('JWT_TOKEN', data.token, { expires: 1 }); // expires in 1 day
    }

    return data;
  }

  logout() {
    Cookies.remove('JWT_TOKEN');
  }

  getToken() {
    return Cookies.get('JWT_TOKEN');
  }

  async getProfile() {
    const token = this.getToken();
    if (!token) throw new Error('No token found');

    const res = await fetch(`${this.baseUrl}/api/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error('Unauthorized');
    return await res.json();
  }
}

export const authService = new AuthService();
