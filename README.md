# Carplace

This site is for users who wants to buy a car or sell their cars. Users can posts their cars and try to sell it to other users or buy a car from other users. you can make a bid or leave a comment to a car.

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
