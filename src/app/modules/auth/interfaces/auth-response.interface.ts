import { User } from "@auth/interfaces/user.interface";
export interface AuthResponse {
    user: User | null;
    csrfToken: string;
}

