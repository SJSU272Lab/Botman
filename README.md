![capture](https://cloud.githubusercontent.com/assets/15001254/19718999/d3c39948-9b1c-11e6-9241-b902892ee48e.JPG)

* #####Introduction: Develop  a framework to help users create Bots for Slack integration
In this project, we will be building a custom framework, which will help users build their own custom bots and deploy in production. Slack Bots are useful to perform important mundane tasks that a team can find useful.

A Bot User is something that has similar properties like a human slack account except password and login. Instead of interacting through a slack desktop or mobile app, their behavior is controlled by programs that we write.

Bot users can be Custom, meaning they can be designed specifically for your team on slack or they can be attached to Slack App. Attaching a bot user to a Slack App makes you able to distribute your app to other teams using slack.

The main way in which a bot can interact with people is through Real Time Messaging API. The Idea of our project is to iteratively ask questions so that we can build a bot on behalf of the user through our framework.

We will initially try to develop bots working as command line interpreters. Basically, we will be storing user entered information such as commands that he would like his bot to know then devise some way in which we can bundle these commands so that the bot knows its meaning and perform some relative bundled actions.


* #####System Design: Describe your chosen design
In the design, we are thinking of devising a simple website, which we will host as a service that will guide a user through steps in designing his own slack bot.
The website will iteratively ask questions that we will use in the program and create the bot.

* #####Technology Stack
We are thinking of using Python, node.JS, JavaScript, Slack API, Botkit, Git.

* #####Need and Advantages
This is a custom framework which will help many people who are new or are unaware of programming concepts but want to use slack and make a bot.

![architecture](https://cloud.githubusercontent.com/assets/17586634/19717520/d1afab12-9b15-11e6-8fdf-8a433c499bba.PNG)