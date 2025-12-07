export interface IPost {
    id: string,
    user_id: string,
    title: string,
    description: string,
    status: 'todo' | 'in_progress' | 'done',
    priority: 'low' | 'medium' | 'high',
    position: number,
    created_at: Date,
    updated_at: Date,
}

export interface IAddPost {
    title: string;
    description: string;
    status: string;
    priority: string;
    position: number;
    user_id: string;
}