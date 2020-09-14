export class User {
    id: number;
    name: string;

    static apiToModel(userFromApi) {
        let user = new User();
        user.id = userFromApi.id;
        user.name = userFromApi.name;
        return user;
    }
}
