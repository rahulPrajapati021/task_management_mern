# Task Management App

Task -
Simple Task Management System Requirements:   
1. Task Creation: Develop a form to allow users to create new tasks. Tasks should have a 
title, description, and due date also add tasks to the respective priority lists. 
2. Task List: Display a list of all tasks with the help of pagination and Ajax,  
showing the title, due date, and status (e.g., "pending," "completed").   
3. Task Details: Implement a page to view the details of a specific task, including its 
description and due date.   
4. Task Editing: Allow users to edit the details of an existing task, including 
updating the title, description, and due date.  
5. Task Deletion: Provide an option to delete a task. Implement a confirmation 
dialogue before deletion.   
6. Task Status Update: Allow users to mark tasks as completed or change their status.  
7. User Authentication: Implementing a basic user authentication system ensures that 
only authorised users can create, view, edit, and delete tasks, add/remove users, and 
assign tasks to the user. When a user logs in, they can view their assigned task 
8. Priority Management: Move tasks between priority lists. 
9. Visual Representation: Each priority list is color-coded for quick identification. 


## Approach 
I used MERN stack to create this application. 
In this repository there are 2 folder backend & frontend which have respective code bases inside. 

## Backend
To create backend I used express framework & mongodb as database. For ODM I have used mongoose. 
For user authentication I have used JWT stateless authentication. 

List of routes available - 

* User Routes
    * /api/v1/user/login ~ Post
    * /api/v1/user/register ~ Post

* Task Routes 
    * /api/v1/task/createTask ~ Post
    * /api/v1/task/getTask/:id ~ Get
    * /api/v1/task/getTaskList ~ Get
    * /api/v1/task/markComplete/:id ~ Patch
    * /api/v1/task/updateTask/:id ~ Put
    * /api/v1/task/deleteTask/:id ~ Delete


## Frontend 
To create frontend I used react js, vite as bundler, for styling tailwind css, for routing react-router, for icons used lucide-react 

List of pages - 

* / ~ Homepage for logged in user (lists task)
* /login ~ for login
* /register ~ for registring a user
* /editTask/:id ~ to edit a task
* /task/:id ~ to read a task