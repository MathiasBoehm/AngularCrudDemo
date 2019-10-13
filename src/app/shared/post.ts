export interface Post {
    id?: number;
    title: string;
    author: string,
    authorImageUrl?: string,
    created: Date;
    content?: string
}
