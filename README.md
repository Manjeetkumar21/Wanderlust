# WanderLust

WanderLust is an immersive full-stack web application inspired by the renowned Airbnb platform. This project enables users to listing the accommodations and leverages a combination of modern web technologies to deliver a seamless experience.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Contributing](#contributing)



## Technologies

- **Frontend:** EJS, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **APIs:** RESTful APIs for communication between frontend and backend
## Features

- User authentication and authorization
- Browsing and Listing accommodations
- Review and Leave comment on other listings
- User-friendly and immersive interface
- Responsive design
## Installation

1. **Clone the repository:**

```bash
   git clone https://github.com/Manjeetkumar21/Wanderlust.git
```
2. **Navigate the project directory:**
```bash
    cd wanderlust
```

3. **Install the required dependencies:**
```bash
   npm install

```

4. **Setup the enviornment variable:**
Create a `.env` file in the root directory and add the following variables:
```bash
  PORT=3000
  MONGODB_URI=your_mongodb_connection_string
  SESSION_SECRET=your_session_secret
  CLOUD_NAME=your_cloud_name
  CLOUD_API_KEY=your_cloud_api_key
  CLOUD_API_SECRET=your_cloud_api_secret
  MAP_TOKEN=your_map_token
  CLIENT_ID=your_google_client_id
  CLIENT_SECRET=your_google_client_secret
  CALLBACK_URL=your_callback_url
```


5. **Start the application**
```bash
   nodemon index.js
```
## Usage

1. Open your browser and go to `http://localhost:3000`.
2. Register a new account or log in with an existing account.
3. Browse available accommodations and make bookings.

## File Structure

- `views/`: Contains EJS templates for the frontend
- `public/`: Contains static assets such as CSS and JavaScript files
- `routes/`: Contains route definitions for the application
- `models/`: Contains Mongoose schemas for MongoDB
- `controllers/`: Contains logic for handling requests
- `app.js`: Main application file
## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch`
5. Open a pull request.
