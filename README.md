# Strive Life Fitness

A Full-Stack AI-Powered Fitness Tracker App.

Strive Life is a fitness tracker and social media site that lets gym goers learn new workouts, ask AI for recommendations, and share their achievements with friends.

## Table of Contents

1. [Project Description](#project-description)
2. [Technologies Used](#technologies-used)
3. [Demo](#demo)
4. [How to Install and Run this Project](#how-to-install-and-run-this-project)
5. [Future Enchancements](#future-enhancements)

# Project Description

This project began as an ambitious 1-week sprint to create an MVP for a fitness tracking and social media application. The project was a team effort, aimed at delivering a functional product for an external user. As a part of this team, I was responsible for developing the chat functionality.

During this sprint, my work on the chat feature was closely intertwined with the authentication component, which was handled by another team member. Recognizing the challenge and the importance of collaboration, I maintained regular communication with my teammate to track progress and ensure alignment. My goal was to ensure my chat component was prepared for seamless integration with the auth component upon its completion.

However, we encountered a significant hurdle as the auth component faced delays and could not be completed within our tight deadline. This setback highlighted the importance of contingency planning and adaptive strategies in software development.

Reflecting on these challenges post-sprint, I identified key learnings and strategies for future projects:

Effective Project Management: In a professional setting, I would proactively seek assistance from a project manager to realign deadlines and resources, ensuring that critical dependencies are addressed promptly.

Team Support and Collaboration: I learned the value of offering hands-on support to teammates facing challenges. Techniques like pair programming could be a practical approach to tackle complex problems together and keep the project on track.

Adaptability in Technical Choices: Lastly, I realized the importance of flexibility in technical decisions. For instance, instead of building an auth system from scratch under time constraints, utilizing reliable third-party services like Clerk or other up-to-date technologies could expedite development without compromising functionality.

# Technologies Used

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![DaisyUI](https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

# Demo

Please see this demo (https://recordit.co/ta1D32Surc) of the prototype for the website and the description below.

## Login and Auth

![Login-and-Auth](img/Screenshot_2024-01-12_at_16.33.34.png)

The authentication component allows users to securely create an account and provide information about their fitness level to generate a curated user experience.

## Workout Planner

![Workout-Planner](img/assets/Screenshot_2024-01-12_at_16.33.34.png)

The Workout Planner allows users to quickly select a type of workout like lifting weights, cardio, or plyometrics and then receive a list of possible workouts with detailed explanations.

## Progress Tracker

![Progress-Tracker](img/assets/Screenshot_2024-01-12_at_16.34.21.png)

The Progress Tracker enables users to monitor their fitness journey. Users can see workouts that they saved in the Planner component as well as search an exercise API for alternative workouts.

## Chat

![Chat](img/assets/Screenshot_2024-01-12_at_16.38.34.png)

The Chat component serves as a hub for community interaction and support within our fitness app. It allows users to connect by directly messaging one another via the app.

## Social Feed

![Social-Feed](img/assets/Screenshot_2024-01-12_at_16.38.15.png)

The Social Feed lets users can share their fitness milestones, experiences, and daily activities with friends and peers via posts. Similarly, users can comment on one another's posts.

## AI Chat

![AI-Chat](img/assets/Screenshot_2024-01-12_at_16.39.47.png)

The AI chat is an innovative feature providing personalized workout suggestions and guidance. Interface with a Chat GPT based personal training assistant with knowledge of your fitness background.

# How to Install and Run this Project

1. Clone the repo to your computer in your desired folder

`git clone git@github.com:meadDashSolomon/strive-life.git`

2. Install all dependencies by running

`npm install`

3. It's time to start your development server and vite server! Run

`npm run dev`

in your command line, and check out the project at localhost:5173 in your browser. Have fun!

# Future Enhancements

Given the extremely tight turnaround I faced and the high standards I hold for myself, there are a few things I would love to improve when time allows:

- Robust unit testing
- Optimization testing
- Oauth
- Transitioning to a more advanced authentication system like Clerk.

# Ticketing Guidelines

1. Always make or claim a ticket before doing any work
2. Ticket naming pattern: `[scope]: [feature/task]`
   - Ticket scopes: `global`, `auth`, `chat`, `planner`, `social`, `tracker`
3. Try to create tickets with a clear "done" condition - use a checklist if applicable
4. Add yourself to a ticket to claim it
5. Before starting work, move the ticket to the "In progress" board
6. After submitting a pull request, move the ticket to the "Staged for review" board
7. If changes are requested, move the ticket to the "Changes requested" board
8. After making changes, move the ticket back to the "Staged for review" board

# Git Workflow

1. Claim a ticket
2. Update your local master branch, and then create a new feature branch
   - `git checkout master`
   - `git pull`
   - `git checkout -b [feature-branch]`
3. Make changes (try to keep them within the scope of your ticket)
   - `git add .`
   - `git commit`
4. Before making a pull request, rebase your feature branch on the upstream master to avoid conflicts
   - `git checkout master`
   - `git pull`
   - `git checkout [feature-branch]`
   - `git rebase master`
   - Run your code again to confirm that it still functions
5. Make a pull request
   - Use the name of your trello ticket in your PR title and move the ticket to the "Staged for review" list
   - Put any additional notes (potential conflicts, scoping comments, compatibility issues) in the PR body

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tson', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
