export interface IPost {
    id: string,
    user_id: string,
    title: string,
    description: string,
    status: 'todo' | 'in_progress' | 'done',
    priority: 'low' | 'medium' | 'high',
    position: number,
    created_at: string,
    updated_at: string,
}

export interface IAddPost {
    title: string;
    description: string;
    status: '' | 'todo' | 'in_progress' | 'done';
    priority: '' | 'low' | 'medium' | 'high';
    position: number;
    user_id: string;
}