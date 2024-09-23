import User from "./user";
import Post from "./post";
import Hashtag from "./hashtag";
import Like from "./like";
import Answer from "./answer";
import Comment from "./comment";

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

// User -> Post -> Like -- N : M -- We have to do it manually

User.hasMany(Like, { foreignKey: 'user_id' });
Like.belongsTo(User, { foreignKey: 'user_id' });

Post.hasMany(Like, {foreignKey: 'like_type_id', scope: { like_type: 'Post' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Like.belongsTo(Post, { foreignKey: 'like_type_id'});

Answer.hasMany(Like, { foreignKey: 'like_type_id', scope: { like_type: 'Answer' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Like.belongsTo(Answer, { foreignKey: 'like_type_id'});

// User -> Answer -- 1:N
User.hasMany(Answer, {
    foreignKey: 'user_id',
    as: 'Answers'
})
Post.hasMany(Answer, {
    foreignKey: 'post_id',
    as: 'Answers'
})
Answer.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'User'
})
Answer.belongsTo(Post, {
    foreignKey: 'post_id',
    as: 'Post'
})

// User -> Post -> Comment -- N : M -- We have to do it manually
User.hasMany(Comment, { foreignKey: 'user_id', as: 'UserComments' });
Comment.belongsTo(User, { foreignKey: 'user_id', as: 'User' });

Post.hasMany(Comment, { foreignKey: 'commentOn_id', scope: { commentOn_type: 'Post' }, as: 'PostComments', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Comment.belongsTo(Post, { foreignKey: 'commentOn_id', as: 'Post' });

Answer.hasMany(Comment, { foreignKey: 'commentOn_id', scope: { commentOn_type: 'Answer' }, as: 'AnswerComments', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
Comment.belongsTo(Answer, { foreignKey: 'commentOn_id', as: 'Answer' });

Comment.hasMany(Comment, { 
    foreignKey: 'parentComment_id', 
    as: 'Replies' 
});
Comment.belongsTo(Comment, { 
    foreignKey: 'parentComment_id', 
    as: 'Parent' 
});

// For Follow each other 
User.belongsToMany(User, {
    through: 'UserFollowers', 
    foreignKey: 'followers_id',
    as: 'Followees'
})

User.belongsToMany(User, {
    through: 'UserFollowers',
    foreignKey: 'followee_id',
    as: 'Followers'
})