import * as moment from 'moment';
import { User } from './user';

export class Post {
    id: number;
    title: string;
    body: Text;
    publishedAtString: string;
    publishedAtDate: Date;
    createdAt: string;
    user: User

    static apiToModel(postFromApi) {
        let post = new Post();
        post.id = postFromApi.id;
        post.title = postFromApi.title;
        post.body = postFromApi.body;
        post.publishedAtString = postFromApi.published_at ? moment(postFromApi.published_at).format('MMMM Do YYYY, h:mm a') : null;
        post.publishedAtDate = postFromApi.published_at ? new Date(postFromApi.published_at) : null;
        post.createdAt = postFromApi.created_at ? moment(postFromApi.created_at).format('MMMM Do YYYY, h:mm a') : null;
        post.user = postFromApi.user ? User.apiToModel(postFromApi.user) : null;
        return post;
    }
}
