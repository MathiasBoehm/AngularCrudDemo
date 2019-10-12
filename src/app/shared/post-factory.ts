import { Post } from './post';
import { PostRaw } from './post-raw';

export class PostFactory {

    static fromRaw(p: PostRaw): Post {
        return {
            ...p,
            created: new Date(p.created)
        };
    }
}
