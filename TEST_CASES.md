# 🧪 Simple News — API Test Cases

All API test cases were executed and recorded in **Postman**.  

## Features Tested

1. **Authentication**
   - Login existing user
   - Login with invalid credentials
   - Login with not complete data
   - Register new user
   - Register with existing user data
   - Register with invalid/ not complete data

2. **Posts**
   - Create a post
   - Unauthorized post creation attempt
   - Create a post with invalid content

3. **Feed**
   - Fetch feed for logged-in user
   - Fetch feed with no token/ invalid token

4. **Follow**
   - Follow new user
   - Follow already followed user
   - Follow with no token/ invalid token
   - Follow not existing user
   - Follow invalid user id
   - Unfollow followed user
   - Unfollow non-followed user
   - Unfollow with no token/ invalid token
  
5. **Search**
   - Search another user
   - Search with no token/ invalid token
   - Search with invalid username

## Postman Documentation

View the full test cases and recorded results here:

> 🔗 [Postman API Documentation](https://documenter.getpostman.com/view/6095804/2sB3WtqxrH)
