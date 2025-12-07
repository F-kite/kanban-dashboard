export interface IPost {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    position: number;
    created_at: string;
    updated_at: string;
}

export interface IAddPost {
    title: string;
    description: string;
    status: string;
    priority: string;
    position: number;
    user_id: string;
}