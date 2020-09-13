import * as moment from 'moment';

export class Post {
    title: string;
    body: Text;
    userId: number;
    publishedAt: string;
    createdAt: string;

    static apiToModel(postFromApi) {
        let post = new Post();
        post.title = postFromApi.title;
        post.body = postFromApi.body;
        post.publishedAt = postFromApi.published_at ? moment(postFromApi.published_at).format('MMMM Do YYYY, h:mm a') : null;
        post.createdAt = postFromApi.created_at ? moment(postFromApi.created_at).format('MMMM Do YYYY, h:mm a') : null;
        post.userId = postFromApi.user_id;
        return post;
    }
}
