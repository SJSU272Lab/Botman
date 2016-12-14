![capture](https://cloud.githubusercontent.com/assets/15001254/19718999/d3c39948-9b1c-11e6-9241-b902892ee48e.JPG)

#PROJECT NAME: _BotMan_

##ABSTRACT

•	Introduction: Develop  a framework to help users create Bots for Slack integration

In this project, we will be building a custom framework, which will help users build their own custom bots and deploy in production. Slack Bots are useful to perform important mundane tasks that a team can find useful.

A Bot User is something that has similar properties like a human slack account except password and login. Instead of interacting through a slack desktop or mobile app, their behavior is controlled by programs that we write.

Bot users can be Custom, meaning they can be designed specifically for your team on slack or they can be attached to Slack App. Attaching a bot user to a Slack App makes you able to distribute your app to other teams using slack.

The main way in which a bot can interact with people is through Real Time Messaging API. The Idea of our project is to iteratively ask questions so that we can build a bot on behalf of the user through our framework.

We will initially try to develop bots working as command line interpreters. Basically, we will be storing user entered information such as commands that he would like his bot to know then devise some way in which we can bundle these commands so that the bot knows its meaning and perform some relative bundled actions.

•	System Design: Describe your chosen design

In the design, we are thinking of devising a simple website, which we will host as a service that will guide a user through steps in designing his own slack bot.
The website will iteratively ask questions that we will use in the program and create the bot.

•	Technology Stack

We are thinking of using Python, node.JS, JavaScript, Slack API, Botkit, Git

•	Need and Advantages

This is a custom framework which will help many people who are new or are unaware of programming concepts but want to use slack and make a bot.

##ARCHITECTURAL FLOW DIAGRAM

![architecture](https://cloud.githubusercontent.com/assets/17586634/19717520/d1afab12-9b15-11e6-8fdf-8a433c499bba.PNG)


##USER STORIES

As an office work group manager on slack I will need to maintain list of the things that need to be bought for the meeting. So the group of the office can easily maintain the things to be bought with the help of our bot. While discussing on the channel he thinks of something to be bought then instead of writing down in a separate notepad and then saving it somewhere. He can just save the list in the bot which he himself will create through our BotMan. This will reduce the overhead of maintaining mundane tasks for me.

In a project team while discussing the things sometimes someone uses words which are unknown to the others, in that case a project team can have a slack bot created through BotMan which will search those words in a dictionary and return the results to the team member. This way the communication between the team members will be efficient and productive.

##USER GUIDE
######STEPS TO MAKE BOTMAN WORKING-
-	Download or Fork the Repository
- Install all the dependencies using npm install command
- Run app.js using node cmd
- Open localhost at port 3000 in your browser
- Application will be start

######STEPS TO CREATE YOUR FIRST BOT
- Login into the application using github.
- You can find **_STEPS_** tab where all the instructions are given
- First you need to create a new heroku directory
- Next step is make that directory master using the button provided in the steps page
- Open editor type in your code for the bot
- Go to the **Upload** tab and upload your app.js and package.json files and the bot will be live within seconds on your slack channel

##FUTURE ENHANCEMENTS
- Currently we support NodeJS bots
- We are going to provide support for other languages like python soon 
