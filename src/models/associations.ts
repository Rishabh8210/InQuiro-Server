import User from "./user";
import Post from "./post";
import Hashtag from "./hashtag";

// User -> Post  -- 1: N
User.hasMany(Post, {
    foreignKey: 'user_id',
    as: 'posts'
})

Post.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
})

// User -> Hashtag -- N:M
User.belongsToMany(Hashtag, {through: 'HashtagsByUser'})
Hashtag.belongsToMany(User, {through: 'HashtagsByUser'})

// User -> Post -- N:M
Hashtag.belongsToMany(Post, {through: 'HashtagsByPost'})
Post.belongsToMany(Hashtag, {through: 'HashtagsByPost'})