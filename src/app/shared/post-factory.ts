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
        return {
            ...p,
            created: p.created.toDateString()
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
