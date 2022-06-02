DROP DATABASE IF EXISTS petters_socials;

CREATE DATABASE petters_socials;

creat a table user(
    id(INT)auto-incrment primary key
    email
    username
    password);
 DROP DATABASE IF EXISTS pet;

creat a table pet (
    id (int)primary key
    name
    breed-type
    animal-type 
    age
    color 
    user-id 
);
DROP DATABASE IF EXISTS post;

creat a table post (
    id (int) auto_increament (primary key)
    title(int)
    body
    pet-id(int));

    DROP DATABASE IF EXISTS comment;

    creat a table comment(
        id (int) auto_increament (primery key)
        post_id(INT)
    creat a table likes creat a category