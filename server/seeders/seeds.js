// import faker
const faker = require('faker');

// import db
const db = require('../config/connection');
// import models
const { Post, User } = require('../models');

db.once('open', async () => {
    await Post.deleteMany({});
    await User.deleteMany({});

    // create users
    const userData = [];

    for (let i = 0; i < 5; i++) {
        const username = faker.internet.userName()
        const email = faker.internet.email(username)
        const password = faker.internet.password()

        // add username, email, and password to userData array
        userData.push({ username, email, password });
    }
    const createdUsers = await User.insertMany(userData);
    // console.log('createdUsers', createdUsers);

    // create posts
    let createdPosts = [];
    for (let i = 0; i < 10; i++) {
        // create post of random words with length between 5-15
        const postText = faker.lorem.words(Math.floor(Math.random() * 20) + 2)
        // console.log(postText)
        // returns the index of a user randomly
        const randomUserIndex = Math.floor(Math.random() * createdUsers.length)
        // destructure username and _id from user at index of randomUserIndex
        const { username, _id: userId } = createdUsers[randomUserIndex]
        // create a post with created text and username
        const createdPost = await Post.create({ postText, username })
        // update a user
        const updatedUser = await User.updateOne(
            { _id: userId }, 
            { $push: { posts: createdPost._id } }
        )
        //add createdPost to createdPosts array
        createdPosts.push(createdPost);
    }
    // console.log('createdPosts', createdPosts)
    // console.log('createdusers', createdUsers);
    // console.log('createdusers.ops', createdUsers.ops);
    // create replies
    for (let i = 0; i < 10; i++) {
        // create reply of random words with length between 5-15
        const replyBody = faker.lorem.words(Math.floor(Math.random() * 10) + 5)
        // returns the index of a user randomly
        const randomUserIndex = Math.floor(Math.random() * createdUsers.length)
        // destructure username and _id from selected user
        const { username} = createdUsers[randomUserIndex]
        // return random number between 0 and length of createdPosts array and saves in randomPostIndex
        const randomPostIndex = Math.floor(Math.random() * createdPosts.length)
        // destructure _id from post found at randomPostIndex value in createdPosts array
        const { _id: postId } = createdPosts[randomPostIndex]

        // update a Post with the reply
        await Post.updateOne(
            { _id: postId },
            { $push: { replies: { replyBody, username } } },
            { runValidators: true }
        );
        // console.log('randomPostIndex',randomPostIndex)
    }
    
    // console.log('createdUsers', createdUsers);
    console.log('Seeding complete!')
    process.exit(0)
})