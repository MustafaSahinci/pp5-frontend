# Carplace

This site is for users who wants to buy or sell their cars. Users can posts their cars and try to sell it to other users or buy a car from other users. you can make a bid or leave a comment to a car.

for the live website click
[here](https://frontend-pp5.herokuapp.com/)

for the backend click
[here](https://github.com/MustafaSahinci/pp5-backend)

![Am I Responsive](src/assets/responsive.png)

<hr>

## 1. User Experience (UX)

Unregistered users can see the cars, profiles, comments and biddings. but can't place a post(car), comment or bid.

Registered users can create, read, update and delete their posts(cars), commments and biddings. They can follow their favorite sellers and only see their posts(cars) in feed. They can also save the posts(cars) which they interested in and find it easy later. The users can also edit their profile, username and password.

### First Time Visitor Goals
- as a first time visitor, I would like to see a clear home page
- As a first time visitor, I would like to easily navigate through the website.
- As a first time visitor, I would like to see the posts(cars)
- as a first time visitor, I would like to see the profile of the users.
- as a First Time visitor, I would like to register.

### Returning Visitor Goals
- As a returning visitor, I would like to login.
- As a returning visitor, I would like to save posts(cars). 
- As a returning visitor, I would like to comment on posts(cars).
- As a returning visitor, I would like to create, read, edit and delete my own comments.
- As a returning visitor, I would like to create, read, edit and delete my own posts (cars).
- As a returning visitor, I would like to create, read, edit and delete my own bid
- As a returning visitor, I would like to edit my own profile, username and password
- As a returning visitor, I would like to see al my own post(cars) in my profile page
- As a returning visitor, I would like to logout when I want.

## agile
Agile is an approach to project management that centers around incremental and iterative steps to completing projects. The incremental parts of a project are carried out in short-term development cycles

I used the Canban board in github projects and issues which you can see 
[here](https://github.com/users/MustafaSahinci/projects/1/views/1)

And I used the github Milestones for the sprints which you can see
[here](https://github.com/MustafaSahinci/pp5-frontend/milestones)

### Scope
For the scope of this project the following key points were determined.

- Create a webpage application using React.
- Use bootstrap to make the site responsive.
- Allow the user to create an account so that they can create their own post(cars) profile, comments and biddings.
- Allow logged in users add comments and biddings so they can communicate with each other
- Allow users to Crud(Create, Read, Update and Delete) their posts, comment, biddings and profile.
- The website should be easy to navigate and everything should be clear

### NAME OF THIS?
![Lucid App](src/assets/table.png)

## Front End
### React
<br>
React is a declarative, efficient, and flexible JavaScript library for building user interfaces. Its primary goal is to make it easy to reason about an interface and its state at any point in time, by dividing the UI into a collection of independent and reusable components.

I used React for this application for several reasons:

- Speed - applying React significantly increases the page loading speed and reducing the wait, which affects user experience and satisfaction
- Flexibility - the React code is easier to maintain and is flexible due to its modular structure, compared to other front-end frameworks
- React Bootstrap - excellent choice for improving user experience, used for styling and responsiveness. It comes with ready-to-use React built components. They are implemented with accessibility in mind, which is a vital factor when creating a front-end application. I used plain Bootstrap in my previous projects, so it was an easy choice to use React Bootstrap in this app.
- Most used library for developing social networking and media content applications - e.g. Meta (formerly Facebook), Instagram, Netflix, Airbnb, etc.
- Reusability of components - no need to write various codes for the same features

There were various components created and reused across this application.

`<Asset.js />` - multipurpose reusable compontent which displays different versions of the component depending on the props we pass to it:

loading gif (spinner) when content is being loaded

image with src and alt attribute

paragraph with a message

`<Avatar.js />` - reusable component, used to render profile images in the UI. Passed props allow for setting image source and size and adjust image dimensions depending on where the component is rendered. Example of use include the `<NavBar.js />` component, Car page or the Profile page. On mobile screens Avatar component within the Profile Page will be significantly bigger than on other screen sizes.

`<BiddingModal.js>` component for displaying a modal on small screens with the biddings section in it.

`<Car.js>` component for displaying the Car card in the CarPage

`<Car2.js>` component for displaying the Car card in the ProductPage

`<MoreDropdown.js />` - reusable component, used to render the dropdown menu which allows user to edit or delete their own cars, biddings or comments, and also edit their profile or change profile password.

?<FeedbackMsg.js /> - component for displaying feedback messages to the user upon editing/deleting comments, deleting post, updating profile information or a password.?

`<NavBar.js />` - reusable component with the content depending on the login status of the user. For logged in user it shows icon link to the main posts page and user avatar/picture. For those who are not logged in, it displays icon links to sign up or log in instead of the avatar. The component is used on each page of the app.

?<PageNotFound.js /> - specific component for displaying a 404 graphic error message with a return to menu button when user enters the url which does not exist.?


## Back End
### Django REST Framework
The API for this Front-End application was built with the Django REST Framework.

## 2. Features
<details>
<summary>Home page</summary>
<br>

The home page is kept simple. it consists of a navigation, search bar, the posts(cars) and the most followed profiles.

In the search bar the user can filter on profile names and titles of the posts(cars)

The Car card on the home page is different from the card on the Carpage. This card don't have the content and Carousel of images, But only 1 image which you can click to go to the post(car)

![Home](src/assets/home.png)
![Home](src/assets/home2.png)
</details>

<details>
<summary>Navigation</summary>
<br>

![Home](src/assets/nav.png)
![Home](src/assets/nav2.png)
![Home](src/assets/nav3.png)
![Home](src/assets/nav5.png)
![Home](src/assets/nav6.png)
![Home](src/assets/nav7.png)
</details>

<details>
<summary>feed and save page</summary>
<br>

![Home](src/assets/feed.png)
![Home](src/assets/feed2.png)
![Home](src/assets/saves.png)
![Home](src/assets/saves2.png)

</details>

<details>
<summary>carpage</summary>
<br>

![Home](src/assets/car.png)
![Home](src/assets/car2.png)
![Home](src/assets/car3.png)
![Home](src/assets/car4.png)
![Home](src/assets/car5.png)
![Home](src/assets/car6.png)
![Home](src/assets/car7.png)
![Home](src/assets/car8.png)

</details>

<details>
<summary>profile</summary>
<br>

![Home](src/assets/profile.png)
![Home](src/assets/profile2.png)

</details>

<details>
<summary>Create car</summary>
<br>

![Home](src/assets/create.png)
![Home](src/assets/create2.png)
![Home](src/assets/create3.png)

<details>

<details>
<summary>Create car</summary>
<br>

![Home](src/assets/fav.png)
![Home](src/assets/fav1.png)
![Home](src/assets/fav2.png)

</details>

<details>
<summary>Create car</summary>
<br>

![Home](src/assets/signinn.png)
![Home](src/assets/signinn1.png)
![Home](src/assets/signupp.png)
![Home](src/assets/signupp1.png)

</details>

## 3. Technologies used
- HTML5 used for markup
- CSS3 used for style
- JavaScript
- react Used for building components that collectively form the front end of the application.
- React-Bootstrap Used for styling the site.
- ElephantSQL Used as database for this project
- Ludichart Used to create the site map.
- amiresponsive Used to see how responsive the site is on different devices. 
- Cloudinary used to storing images and static files.
- Django used to build the backend database, that serves as an API for the front end part of the project
- Font Awesome used for icons
- Git used for version control, using the terminal to commit - to Git and Push to GitHub
- GitHub is used to store the projects code after being pushed from Git.
- Gitpod to write my code.
- Google Chrome Dev tools used for debugging.
-Google Lighthouse used for audits to measure the quality of web pages.
- Heroku used to deploy this app.
- Favicon used for making the site favicon

## 4. Testing
Manual testing occurred regularly throughout local development and this project has been tested manually after deployment on Heroku

## 5.Bugs
- 
- 
- 

## 6. deployments
### Forking the GitHub Repository
1. Go to the GitHub repository
2. Click on Fork button in top right corner
3. You will then have a copy of the repository in your own GitHub account.

### Making a Local Clone
1. Go to the GitHub repository
2. Locate the Code button above the list of files and click it
3. Highlight the "HTTPS" button to clone with HTTPS and copy the link
4. Open commandline interface on your computer
5. Change the current working directory to the one where you want the cloned directory
6. Type git clone and paste the URL from the clipboard

$ git clone https://github.com/MustafaSahinci/pp5-frontend.git

7. Press Enter to create your local clone

### Deployment

This project was created on GitHub and Edited in GitPod by carrying out the following:

- A new repository was created
- A meaningful name was given to the new repository and 'Create Repository' was selected
- The repository was then opened on GitHub by clicking - - the 'Gitpod' button to build the GitPod workspace which would allow me to build and edit the code used to make the PROJECT NAME HERE website/application
- Version control was used throughout the project using the following commands in the terminal using Bash
git add . OR git add "file name" - to stage the changes and get them ready for being committed to the local repo.
- git commit -m "Description of the update" - to save the change and commit the change to the local repo
- git push - to push all committed changes to the GitHub repo associated with the GitPod workspace

This project was deployed via Heroku by carrying out the following:

- Create the gitpod repo from the template via the gitpod button in github.
- Log in to Heroku and create a new app.
- Add the heroku-postgres add-on
- Complete the config vars section
- Link Heroku and GitHub accounts together
- Select the repo (via Heroku) that you want to make an app of and give it a name in Heroku.
- Click on deploy.

## 7. Credits
- Moments project from Code Institute
- My mentor Rohit Sharma
- Code institute slack community
- Stackoverflow
- React-Bootstrap documentation

### media
- images from google