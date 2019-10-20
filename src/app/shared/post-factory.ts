import { Post } from './post';
import { PostRaw } from './post-raw';

export class PostFactory {

    static fromRaw(p: PostRaw): Post {
        return {
            ...p,
            created: new Date(p.created)
        };
    }

    static toRaw(p: Post): PostRaw {
        const d = p.created != null ? p.created : new Date();
        const created = d.toISOString().split('T')[0];
        return {
            ...p,
            created: created
        }
    }

    static newPost(): Post {
        const p: Post = {
            title: '',
            author: '', 
            created: new Date()
        }
        return p;
    }
}
