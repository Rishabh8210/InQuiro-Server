import User from "./user";
import Post from "./post";

User.hasMany(Post, {
    foreignKey: 'user_id',
    as: 'posts'
})

Post.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
})