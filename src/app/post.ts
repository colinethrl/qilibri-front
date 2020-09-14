import * as moment from 'moment';
import { User } from './user';

export class Post {
    title: string;
    body: Text;
    publishedAt: string;
    createdAt: string;
    user: User

    static apiToModel(postFromApi) {
        let post = new Post();
        post.title = postFromApi.title;
        post.body = postFromApi.body;
        post.publishedAt = postFromApi.published_at ? moment(postFromApi.published_at).format('MMMM Do YYYY, h:mm a') : null;
        post.createdAt = postFromApi.created_at ? moment(postFromApi.created_at).format('MMMM Do YYYY, h:mm a') : null;
        post.user = postFromApi.user ? User.apiToModel(postFromApi.user) : null;
        return post;
    }
}
