
export interface KeyValuePair {
  id: number;
  name: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  roles: Role[];
  scopes: Scope[];
}

export interface Role {
  id: number;
  roleName: string;
}

export interface Scope {
  id: number;
  name: string;
}
