# NASA Data Explorer

Welcome to the NASA Data Explorer application! This web application allows users to explore and interact with NASA's vast array of space data through a React frontend and a Node.js backend. The application showcases various endpoints from NASA's Open APIs, providing an engaging and informative experience.
## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Data Visualization](#data-visualization)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
## Features

- User-friendly interface to explore space-related data
- Integration with multiple NASA API endpoints:
  - **Astronomy Picture of the Day (APOD)**: Displays the daily featured image or video from NASA along with a detailed explanation.
  - **Mars Rover Photos**: Fetches and displays photos taken by Mars rovers, showcasing the Martian landscape.
  - **Earth Polychromatic Imaging Camera (EPIC)**: Provides images of Earth captured by the EPIC camera onboard the DSCOVR satellite.
  - **Near Earth Object Web Service (NeoWs)**: Retrieves data about asteroids and other near-Earth objects.
  - **NASA Image and Video Library**: Accesses a comprehensive library of NASA's images and videos.
- Interactive data visualizations
- Responsive design for various screen sizes
- Error handling and loading states
- Search and filter functionalities for enhanced user experience
## Technologies

- **Frontend:** 
  - **React.js**: A JavaScript library for building user interfaces.
  - **CSS**: For styling the application.
  - **Bootstrap**: (or any other styling framework used)
  - **Axios**: For making HTTP requests to the backend API.

- **Backend:** 
  - **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
  - **Express.js**: A minimal and flexible Node.js web application framework.
  - **Dotenv**: For environment variable management.
  - **Axios**: For making HTTP requests to NASA APIs.
  - **Jest**: A testing framework for running unit and integration tests.
## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/fahisak/nasa-data-explorer.git
2. **Navigate to the project directory:**
cd nasa-data-explorer

3. **Install dependencies for the backend:**

cd backend
npm install

4 .**Install dependencies for the frontend:**

cd ../frontend
npm install

5. **Set up environment variables for the backend:**

Create a .env file in the backend directory and add your NASA API key and any other necessary configuration.
6.**Run the backend:**

Open a terminal and navigate to the backend directory, then run:

node index.js
Run the frontend:

Open a new terminal, navigate to the frontend directory, then run:
npm start

## Usage

- Navigate to the frontend application to explore various NASA data endpoints.
- Use the search and filter options to customize your data exploration experience.
## Data Visualization

- The application provides various interactive data visualizations to enhance user engagement and understanding.
## Project Structure

nasa-data-explorer/
├── frontend/
│   └── src/  # Contains React components, CSS, etc.
├── backend/
│   └── src/  # Contains server logic, API routes, etc.
└── README.md


## Challenge Overview

In this challenge, you will create a web application that utilizes NASA's Open APIs (https://api.nasa.gov/) to showcase space-related data. Your task is to build a React frontend that communicates with a Node.js backend running Express. The application should allow users to explore and interact with NASA's vast array of space data in a creative and engaging way.


## Deployment
**Frontend Deployment on Netlify**
1. Go to Netlify and log in or sign up.
2. Click on "New site from Git."
3. Connect your GitHub account and select the nasa-data-explorer repository.
4. Choose the branch you want to deploy (typically main or master).
5. Set the build command to:
npm run build
And the publish directory to:
frontend/build
6. Click "Deploy site." After a few moments, your site will be live!

**Backend Deployment on Render**
1. Go to Render and log in or sign up.
2. Click on "New" and select "Web Service."
3. Connect your GitHub account and choose the nasa-data-explorer repository.
4. Set the environment to Node.
5. Specify the start command as:
node backend/index.js
6. Set the branch to deploy (usually main or master) and click "Create Web Service."
7. After a few moments, your backend will be deployed and accessible.

### Parts of the Task

1. **React Frontend**: Create a user interface that allows users to interact with NASA data.
2. **Node.js Backend**: Develop a server using Node.js and Express that acts as an intermediary between your frontend and the NASA API.
3. **Data Visualization**: Process the information received from your backend and present it to the user in an intuitive and visually appealing manner.

### NASA API

You will be working with NASA's Open APIs, available at https://api.nasa.gov/. NASA offers a wide range of endpoints, including but not limited to:
- **Astronomy Picture of the Day (APOD)**
- **Mars Rover Photos**
- **Earth Polychromatic Imaging Camera (EPIC)**
- **Near Earth Object Web Service (NeoWs)**
- **NASA Image and Video Library**

