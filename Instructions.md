# Getting Started

This is a sample project you can use to kick start your development or if you choose,
you can build your own project using the framework of your choice.

## Definition

You can think of this proof of concept project as a something that was left by your predecessor, but now
you are taking ownership of it. You will want to get it ready for something more than a production environment.
It works for some basic question administration use cases creating questions, reading questions but these
are just some the basic administration.

We really need these questions to be served up in our custom JS Widget to show the questions to
customers.

## Missing Requirements

1. Build an API to get specific comment and all nested replies

   1. Replies should be sorted. For more datails about sort see the section - Comments sort explanation.

2. Each comment should have moderation status. Default value for new comments - pending (available statuses: pending, approved, declined)

3. Build an API to update moderation status of a comment

4. Build an API to retrieve comments per specific thread.
   1. Endpoint should contain skip & limit parameters.
   2. Endpoint should return specified limit of root comments and all nested replies to each of root comment.
   3. Root comments and replies should be sorted. For more datails about sort see the section - Comments sort explanation.
   4. Comments with declined status should not be returned from this API.
   5. Replies that are left to comments with declined status should not be returned.

## Deliverable

1. Reorganize and refactor the code to make it easier to navigate and maintain in the long term.
   1. Important note: you can change any of the code as you desire, the code is here to help, if you don't like it
      change it.
2. Enhance the code to satisfy the missing requirements, described in the "Missing Requirements" section.
3. Pick one of the classes that exist or one of the ones you created and create a few test cases
4. Include a README.md
   1. Give details on how to run your project and install the the DB if you have changed it
   2. Comment on any security considerations
   3. Please add any notes and assumptions
   4. Include a small section on how you think this solution would scale and what you might want to think about to
      scale it to the next level.
5. Submission
   1. Do not include the instructions in your submission
   2. Use Git to manage your code, upload your code to a git repository and submit the link to your repository.

# Appendix

## POC Application Instructions

This is a NestJS boot application and can be run by `npm run start:dev` after initial installation done by `npm install`.

### Database

The application is currently using MongoDB.

#### Access the Database

Define variable MONGO_SERVER with mongo uri in .env file

## Example comments

### Creating a Sample Comments

Add root comment

> curl --header "Content-Type: application/json" \
>  --request POST \
>  --data '{"body": "He looks more like The Crow then Batman when he is out of costume lol","threadId": "acd88360-e772-11ea-bc06-6ba89fdab63e"}' \
>  http://localhost:8080/comments

id - 5f461819f5d3ef273e4cc5bf

Add a reply

> curl --header "Content-Type: application/json" \
>  --request POST \
>  --data '{"body": "I freaking loved it. Mad Batfleck vibes.","parentId": "5f461819f5d3ef273e4cc5bf","replyTo": "5f461819f5d3ef273e4cc5bf","threadId": "acd88360-e772-11ea-bc06-6ba89fdab63e"}' \
>  http://localhost:8080/comments

id - 5f461833f5d3ef273e4cc5c0

Add a nested reply

> curl --header "Content-Type: application/json" \
>  --request POST \
>  --data '{"body": "You're God damn right","parentId": "5f461819f5d3ef273e4cc5bf","replyTo": "5f461833f5d3ef273e4cc5c0","threadId": "acd88360-e772-11ea-bc06-6ba89fdab63e"}' \
>  http://localhost:8080/comments

id - 5f461833f5d3ef273e4cc5c1

---

Get all comments from thread

> curl --header "Content-Type: application/json" \
>  --request GET \
>  http://localhost:8080/comments/acd88360-e772-11ea-bc06-6ba89fdab63e

Get one comment and all its nested replies

> curl --header "Content-Type: application/json" \
>  --request GET \
>  http://localhost:8080/comments/acd88360-e772-11ea-bc06-6ba89fdab63e/5f461766f5d3ef273e4cc5bd

### Example Thread

Let's imagine comments from this example left within single day (so only time specified without date)
`[comment id, reply to comment id, time]` - `[1, null, 10:00 am]`

- I liked it, but I feel I need to go to church after viewing. Sounded like the mess he made of that baddie's mug could only be cleaned up with a sponge. `[2, null, 10:30 am]`
  - I think that was just footage of Patterson dealing with fans comparing him to the Crow. `[4, 2, 10:40 am]`
    - Do you really think so? `[6, 4, 11:10 am]`
      - Oh my ^.^ `[7, 5, 11:40 am]`
    - Damn... `[5, 4, 11:00 am]`
  - I freaking loved it. Mad Batfleck vibes. `[3, 2, 10:35 am]`
- He looks more like The Crow then Batman when he is out of costume lol `[1, null, 10:00 am]`

### Comments sort explanation

Both root and reply comments should have descending order.
In addition to that order of replies they are also affected by a comment to which reply was left to.

Replies correct order shown below:

Case 1:

- root - 8:00am
  - reply2 - 8:30am
  - reply1 - 8:15am

---

Case 2:

- root - 8:00am
  - reply2 - 8:30am
    - reply2.1 - 9:00am
  - reply1 - 8:15am

---

Case 3:

- root - 8:00am
  - reply2 - 8:30am
    - reply2.2 - 9:10am
    - reply2.1 - 9:00am
  - reply1 - 8:15am

---

Case 4:

- root - 8:00am
  - reply2 - 8:30am
    - reply2.3 - 11:00am
    - reply2.2 - 9:10am
      - reply2.2.1 - 10:00am
    - reply2.1 - 9:00am
  - reply1 - 8:15am
