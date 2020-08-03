<div style="text-align: justify; font-size: 1.0em">

![WishUponLogo](./docs/logo/WishUponLogo.png)

# URL of Deployed Site

https://wishupon.netlify.app/

backend api site : https://wishupon.herokuapp.com/

# Repositories

## Rails backend api

https://github.com/DannyField/WishUpon_api

## React front end client

https://github.com/Lanzhou-J/WishUpon_client

# Requirements and Setup

## Rails backend api setup

Please download the following and extract onto your local machines. Also note that Rails 2.7.0 was used and therefore your version should be the same.

```
git clone http://github.com:DannyField/WishUpon_api.git
```

Running bundle install will install the dependencies needed. Afterwards, it's ideal to set up the database with the create, migrate commands and followed by running the seed file so that the database is populated with data.

```
bundle install
rails db:create
rails db:migrate
rails db:seed
```

To check if everything is running, you can check whether the database has been populated.

```
rails c
User.all
Wish.all
Keyword.all
exit
```

Running 'rails s' will start the rails server

```
rails s
```

Locally, Rails can be found at localhost:3000.
React found at localhost:8080.

## React front end setup

For the React front-end, we can acquire from the following repo

```
git clone https://github.com/Lanzhou-J/WishUpon_client.git
```

Running 'yarn install' will install the dependencies. Once completed, you can run 'yarn start' to start the app. You will also want to run 'rails s' in the rails directory to start the backend service as well.

```
yarn install
yarn start
```

In some cases, we've found

A .env file may be needed to be created. Create a new file and name it .env

Copy the following into it and save.

```
PORT=8080
```

This will set the server of React to run on localhost:8080, and allow Rails to run on localhost:3000

# Test Users

Some users have been created with the seed file.

Adam |
admin@wishupon.com |
password

Ming |
user1@wishupon.com |
password

A user was created that exists on the production site

Jack | jacklogless@gmail.com | password

# Description of the website

## Purpose

Wish Upon… is an online web application where users can enter their wish and can be matched with other users wishing a similar thing. Due to COVID19 people may have a lot of wishes but are not able to fulfil them. This site allows users to be matched with other users based on keywords gathered from their wish. It also allows a user to submit a public wish where other users can see and fulfil. Its purpose is to provide a friendly atmosphere where users can meet over chat and have fun, it allows for people that want to give joy back to their community.

## Functionality / features

Features include the ability for users to sign up and log in. A user is able to create, edit, or delete their own wishes. They can also view public wishes. They are not able to view private wishes unless they are matched with that user. A logged on user can also comment or 'like' on public wishes.

The user dashboard shows the current active wishes. They will be able to see their wishes, whether private or public. The main page will show the public wishes that people have made.

We use flip cards to organize and show the public wishes.

There is an instant message system in place, where a user can communicate with another user if matched. A user's dashboard should contain the active wishes, and any that have been completed.

A search engine is able to display public wishes based on keywords. It is possible to filter through the wishes based on location and hobbies of the users.

For public wishes, users can write comments and gives 'likes' to the wishes. This creates a community engagement that fosters good will.

## Internal Site Rules

- A wish can be public or private. A wish can be anonymous or not.

- A user signing up must include their name, email address, password and country of residence. A user can see their own wishes whether public or private via their dashboard. They can see other users' public wishes on the wishes page.

- If a user wants to help others to fulfil a wish, then they can click on a button 'I can help' to ask for a permission to start a real conversation in a dedicated chat room. In order to increase their chance to get connected with the wish-writer, they can leave a friendly comment under the wish.

- We can match private wishes by keywords that the user enters alongside their wish. One wish contains up to 3 keywords that will help match with other wishes.

## Target audience

The target audience is people from the ages of 18 to 99+

Its audience is users that like to meet new people. The site encourages people that want to interact with others and share a bit about themselves.

The issue arises with users under the age of 18, as there may be adult content on the site. While the site isn’t built like that, a system needs to be in place to prevent that. Sometimes people use technology in ways not originally planned.

## Tech stack

#### Backend

- Ruby 2.7.0
- Ruby on Rails 6.0.3
- PostgreSQL database
- Amazon AWS, S3

#### Frontend

- JavaScript 12.16.2
- JavaScript React 16.13.1
- HTML5
- CSS3

Netlify was used for deploying the front end and Heroku for deploying the backend.

# Libraries used

For Rails the following gems and Libraries were used.

For generating JWT tokens

- Knock!

AWS and image storing

- aws-sdk-s3

For handling of Cross-Origin Resource Sharing, and making cross-origin AJAX possible

- rack-cors

Testing was done with the following:

- respec-rails
- byebug
- factory-bot
- shoulda-matches
- database_cleaner
- rubocop
- simplecov

Chat was implemented using WebSockets and ActionCable.

- ActionCable
- active_model_serializers

For React, the following dependencies and Libraries were used.

- lodash
- babel
- react-router-dom

For the chat room functionality

- react-actioncable-provider
- ActionCable
- userBuilder

End to End (e2e) Testing was done by the following

- Cypress
- start-server-and-test
- cypress testing-library
- jackfranklin test-data-bot (Fake)

For Heroku, 'Redis To Go' was also needed as an add-on.

For Deployment, the Rails backend was deployed via the Heroku dashboard with the manual deployment. While this was an extra step in the process, it also allowed us to maintain when we would deploy.

React frontend was deployed by installing the Netlify CLI. The application was then built and deployed.

#### Project Management

Trello

#### Source Control

Git and GitHub. Two separate repository were created. One for the Rails backend and one for the React front end.

# Dataflow Diagram

![Dataflow Diagram](./docs/Dataflow/WishUpon_DFD.png)

The yellow/orange boxes are logic, handling the business logic of the app. For instance this might include methods, or functions.

For example, the 'Chat Service' would use the the Action Cable and integrates WebSockets.

The Dataflow Diagram can be viewed at the following:
https://app.lucidchart.com/documents/edit/953744f6-15c9-4847-8f60-937e894d4410/0_0?shared=true

# Application Architecture Diagram

![Application Architecture Diagram](./docs/AAD/AAD.png)

The AAD can be viewed at the following:
https://app.lucidchart.com/invitations/accept/1c2870d0-9f88-4106-8620-570380801ea1

# ERD

![ERD](./docs/ERD/ERD.png)

We've also provided an ERD which shows the relationships between our models.

- A user can have many wishes. A wish belongs to a user.

The ERD can be viewed here:
https://dbdiagram.io/d/5f0c17a50425da461f0495ae

# User Stories

Throughout the development, the idea of a wish changed slightly. Different cultures played a part in this. In Chinese culture, a wish is to be shouted from the mountains, whereas in Western culture, you don’t tell anyone your wish.

Because of this, our user stories evolved more to cover this and were adapted for ‘shouts’. We are also considering that a ‘shouting wish’ would only last a day or set period of time. It’s like shouting from the top of a mountain and its echo heard for a short time. Where as writing in a diary can last forever.

![Amy](./docs/user_stories/Amy.png)

Amy, 19, student at Deakin University has always wanted to go rock climbing. None of her friends want to go. She signs up with Wish Upon… and enters her wish online.

> Looking for someone to go rock climbing with

She sets the approximate date that she’d like to go, the location, and whether she wants to go with anyone gender specific. She also needs to enter a keyword. She thinks long and hard about it, but decides with ‘rock-climbing’

> “As a user I want to be able to sign up and post a wish online. I want to make friends and go rock climbing, hopefully someone with experience as this will be my first time.”

Wish Upon… matches up Amy with Ted, who is an experienced rock climber. They chat online and decide to go to 'The Hardrock Climbing Company' in Box Hill.

Amy’s wish was a public wish, a short term shout from the top of a mountain.

---

![Bridget](./docs/user_stories/Bridget.png)

Bridget, 45. Bridget has always wanted to go to Japan. However she can’t travel due to illness. She has always wanted to see the cherry blossoms during the Spring season. She posts a private wish because she’s normally a private person.

> Would love to see the cherry blossoms in Japan

> “As a user I want to be able to keep my secret private. I’m in no rush, and the idea of signing up to this site scares me to begin with. But maybe I just might meet someone that can help me with my request”

A few days later, she gets a match from a Japanese man named Hiro Nakamura. Hiro is a 24 year old photographer that loves to show of his city with his amazing photos.

They connect online. Bridget is a little concerned by the language barrier and the whole idea behind it. But Hiro sends her some beautiful images of Cherry Blossoms. After some gentle persuasion, they decide to video chat over LINE, where Hiro is able to show Bridget live footage of the cherry blossoms.

---

![Sarah](./docs/user_stories/Sarah.png)

Sarah, 18, a barista at Pages Cafe in Blackburn South is in love with builder apprentice Steven Adonis. Sarah doesn’t want her secret to be public knowledge as this is a true secret fit for a diary. She writes

> My name is Sarah J Campbell and I am soooo in love with Steven Adonis.

She doesn’t think much of it. Deep down she hopes that Steven feels the same way. Sure, they shared a smile when Steven came in for a coffee last week… but maybe….

> “As a user I want to write my deepest darkest secrets and maybe, just maybe, true love will come find me.”

A week later, Steve Adonis writes “My name is Steve Adonis and that Sarah Campbell is kinda hot”. Due to the same keywords used, it would result in a match. ‘Wish Upon…’ has yet again, created a connection.

---

Previously, Sarah was originally 14 years old. This detail caused some concerns over age and communication with a minor. There would need to be a system in place to prevent anyone under 18 from accessing content, or being contacted by people over 18. This is a system that we needed to consider.

In Australian law, we must abide by special regulations for children under the age of 13. This site would contain details such as name, date of birth, location (while broad based), images, and logged IP addresses, so we would either need to a way to manage this.

Originally anyone under 18 was able to post wishes, and having to implement a child safety feature would have been past the scope of this project. We needed to set a limit for users able to access our site.

We needed to consider cases where the wish may be completely innocent.

![Kye](./docs/user_stories/Kye.png)

Kye, 12, wants a new DSLR camera. So he might have that for his wish. Greg, 47, might want to give away his camera because he doesn’t want it anymore. So we have possible issues of an adult contacting a minor.

The easiest approach is to limit this interaction to begin with by allowing the parent to create the wish for her child.

This way, all communication is handled by adults.

---

![Troy](./docs/user_stories/Troy.png)

Troy, 31 is a gay man, yet to come out and tell his parents or friends. He too wants to keep his wish a secret for fear of backlash and horrible shaming comments from users.

> Troy: “I just wanted someone to talk to. Someone to explain to me how I can come out. I’m scared but took my first step on posting a private wish on Wish Upon…”

Troy wants to meet someone that can help him. It doesn’t need to be another gay man, but can be someone that has experience with this. Due to the subject matter, Wish Upon… needs to be careful with the matches. We don’t want disrespectful comments coming from people simply because they were looking to ‘LGBT shame’ users.

---

While some of our stories are thought provoking and serious wishes, maybe someone like Claire just wants to go shopping and make new friends.

![Claire](./docs/user_stories/Claire.png)

Claire, 24, works at ATO, just wants to get out of her office and do some shopping on Friday. She shouts “Yo ladies! Let’s go out shopping at Chaddy this Friday. Hit me up xoxo”. This would not fit the idea of a secret, more of a shout out. It’s also time limited, so shouting it would be best here.

> “As a user on the site, I just want to find new friends that can go shopping with me. I want to ideally go with girls, as shopping with boys is a nightmare! Make some new friends and shop to our heart’s content!”

![Mingzhu](./docs/user_stories/Mingzhu.png)

Mingzhu Yang, 23 wants to cook Xiaolongbao but she has no idea how to. So she shouts in hope of finding someone that matches her wish. Because it is a shout, people can search for the shouts and reply to the user.

> “As a user on the site, I want to find someone that can teach me how to cook Xiaolongbao. I miss my mother’s home cooking so much.”

# Wireframes

The wireframes were created in Balsamic. The mobile version was created first.

Main login, and sign-up pages

![mobile_wireframe](./docs/wireframes/Mobile5.png)
![mobile_wireframe](./docs/wireframes/Mobile6.png)
![mobile_wireframe](./docs/wireframes/Mobile7.png)

Public wishes are cards that the logged-in user can see. A public wish will also have comments from users.

![mobile_wireframe](./docs/wireframes/Mobile4.png)
![mobile_wireframe](./docs/wireframes/Mobile2.png)

Messages from users that have connected.

![mobile_wireframe](./docs/wireframes/Mobile1.png)
![mobile_wireframe](./docs/wireframes/Mobile3.png)

The desktop version was then created.

![desktop_wireframe](./docs/wireframes/1.png)
![desktop_wireframe](./docs/wireframes/2.png)
![desktop_wireframe](./docs/wireframes/3.png)

The user dashboard / profile page which shows active wishes. Also shown is the wishes that people have made.

![desktop_wireframe](./docs/wireframes/User_profile_web.png)
![desktop_wireframe](./docs/wireframes/wish_web.png)
![desktop_wireframe](./docs/wireframes/wishes_web.png)
![desktop_wireframe](./docs/wireframes/wishes_web2.png)

Messages between users

![desktop_wireframe](./docs/wireframes/message_web.png)
![desktop_wireframe](./docs/wireframes/4.png)

A gif animation was also created to show how the site would function on a mobile.

![desktop_wireframe](./docs/wireframes/animation/Mobile_product.gif)

A mock up of what the front page could look like was also created.

![wireframe](./docs/wireframes/mockup/Frontpage.png)
![wireframe](./docs/wireframes/mockup/wishUpon_2.png)

We also used Pinterest for mood, design and color schemes. This helped build what the wireframes would look like. Over the course of the initial project we talked about mascot such as fairy godmothers, or genies, or traditional Japanese Shinto Ema (small wooden plaques with wishes written on them)

![wireframe](./docs/wireframes/examples/Pintrest.png)
![wireframe](./docs/wireframes/examples/Pintrest2.png)

Our ideas for a simple elegant design was based on the Japanese shrines which has the public wishes on display.

# Logo

A simple logo was also created. We went with the current design as it fit the concept of people helping one another.

![Logo](./docs/logo/WishUponLogo.png)

Other designs were as follows. But they felt like there was too much focus on love.

![Logo](./docs/logo/WU_Heart.png)
![Logo](./docs/logo/WU_PC.png)

# Trello Board

The trello board can be found here:
https://trello.com/b/In2ZeaFQ/t3a2-full-stack-app

Project management was done with the use of a Trello board.

The main board looked like this. The sections included To-Do, Doing, and Done. Cards that were in the 'To-Do', section would be moved to 'Doing' and when completed would move to 'Done'.

![trello](./docs/trello/1.png)
![trello](./docs/trello/3.png)

We were able to insert images or files into the cards for reference of the progress.

![trello](./docs/trello/2.png)

As well as being able to comment on the progress of the item. Color labels were also used - green meaning Part A submission.

![trello](./docs/trello/4.png)

At 9pm each night, the Trello board was screen captured and inserted into a card. This way we could track our progress each day. It also showed us possible blockers if an item was not completed.

![trello](./docs/trello/5.png)

The trello board prior to submitting of Part A

![trello](./docs/trello/6.png)

The Trello board was used throughout Part B of the assignment

![trello](./docs/trello/partB/1.png)

The beauty about Trello was being able to add a checklist, so we could tick off tasks to complete the overall task

![trello](./docs/trello/partB/2_Checklist.png)

For some tasks we set due dates so that we could hit those sprints

![trello](./docs/trello/partB/3_calendar.png)

We were also able to add images and files, which helped explain and keep up to date with our current status

![trello](./docs/trello/partB/4_add_images.png)

Anything project management tool which might not have been considered was Discord. While primarily a video game chat system, using Discord allowed us to instant message easily.

![trello](./docs/trello/partB/5_discord.png)

This also allowed us to screen share and work through problems and to 'code along'. This was extremely helpful in cases of gitHub conflicts where we both could see what needed to stay and what needed to go.

![trello](./docs/trello/partB/6_screenShare.png)

# Development Diary

#### Day 1 - Friday 17th July

Created the Rails backend and React frontend and created repos for both. Ran Rspec tests and started with creating tests. We started the ping pong process of one writes tests and the other writes the code to beat the tests. Created local databases, and generated models and controllers.

#### Day 2 - Saturday 18th July

Created CRUD functionality for Rails. Able to retrieve data from the React front end

#### Day 3 - Sunday 19th July

Passing tests in Rspec and building out the backend. Adding User logic with JWT and Knock!

#### Day 4 - Monday 20th July

Completed user controllers and logic, and now accessible with the nav bar in React front end. JWT passing from JSON and works with Postman. Find a bug where Users needed to have Country_ID, otherwise a new users wasn't able to be created. Can also log out from nav bar

#### Day 5- Tuesday 21st July

Added styling and SASS to the Frontend. A little bit of styling helped us build features and design. It was nice to see what needed to be done or fixed, by having a little bit of CSS style.

#### Day 6 - Wednesday 22nd

Added Chat functionality to Rails. Tested with React. Sometimes it works (refreshing automatically), but for Lan sometimes she'd need to refresh the page for new comments to be added. Included keyword functionality, so users can add keywords to their wishes now.

#### Day 7 - Thursday 23rd

AWS was added and working correctly with React. Users are now able to upload images and is stored on AWS. CSS animations for the home page, login and sign-up pages were finished.

#### Day 8 - Friday 24th July

Rails backend was deployed to Heroku at 8:52am. It was and still currently deployed manually from the GitHub source. This gave us control over when to push changes, instead of Heroku automatically grabbing the latest source. Flip card effects were also finished.

#### Day 9 - Saturday 25th July

Maintenance and checking of code. Chat system alluding Danny. Trying to set private chats to function correctly. Currently they are rooms and anyone can join the room.

#### Day 10 - Sunday 26th July

Added like buttons to the wishes, so now users can 'like' a wish.

#### Day 11 - Monday 27th July

Changed the fetch requests to point to the Heroku backend api server. Wishes can now be secret or private, and also can be anonymous. Radio buttons were also added

#### Day 12 - Tue 28th July

Deployed to Netfliy and checked if working with Heroku. Completed documents for submission. Started the first manual tests. Sign Up form was fixed, as tests found that you needed to enter a integer to sign up. This was based on join tables relating to User and Country. This has been fixed, and has a lovely drop down table.

#### Day 13 - Wed 29th July

Set up redis to go on Heroku, so that it would be able to communicate without errors. Previously ActionCable was working fine locally, but when deployed had issues with security. Redis needed to be installed on Heroku to allow a connection to our front end site. Adding code comments to front end and back end where possible. Fixed bugs in wishing controller as well, as well as edit profile page.

#### Day 14 - Thursday 30th July

Final manual checks, checks with Harrison and Ed, and cleaning up of code. Working on final rspec tests. Submitted assignment.

# Manual Testing

Along with rspec and cypress manual testing was also performed. The manual test was done to check whether the site had human functionality and used in the same way that a human user would use the site.

The excel file can be found in the /doc file in both Excel and PDF

[WishUpon_Manual_Testing.xlsx](./docs/manual_testing/WishUpon_Manual_Testing.xlsx)

[WishUpon_Manual_Testing.pdf](./docs/manual_testing/WishUpon_Manual_Testing.pdf)

Screen grabs have also been included and only show a portion of the manual tests performed.

![Manual Testing](./docs/manual_testing/man1.png)
![Manual Testing](./docs/manual_testing/man2.png)

# Code Coverage

Along with manual tests we also ran rspec to maintain code coverage of our code.

[Wish Upon Code Coverage Report.html](./docs/code_coverage/index.html)

All files

![Code Coverage](./docs/code_coverage/1.png)

Controller report

![Code Coverage](./docs/code_coverage/2.png)

Models report

![Code Coverage](./docs/code_coverage/3.png)

# Thanks

- Coder Academy, Harrison Malone and Edward Deam
