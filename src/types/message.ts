export interface Message {
    id: number;
    name: string;
    email: string;
    message: string;
    is_read: number | boolean;
    created_at: string | Date;
}
