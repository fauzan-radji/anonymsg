<h1 align="center">Anonymsg</h1>

<p align="center">
  An anonymous messaging platform for you to share your opinions freely without fear of other people's judgment.
</p>
<p align="center">
  <a href="https://anonymsg.vercel.app">View Demo</a>
  ·
  <a href="https://github.com/fauzan-radji/anonymsg/issues">Report Bug</a>
  ·
  <a href="https://github.com/fauzan-radji/anonymsg/issues">Request Feature</a>
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About the Project](#about-the-project)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Contributing](#contributing)
- [Contact](#contact)

## About the Project

Anonymsg is a simple and easy to use anonymous messaging service. It is a web application that allows users to send and receive messages without revealing their identity.

Feel free to share your thoughts, opinions, and feelings with others without the fear of being judged. Anonymsg is a safe space for you to express yourself freely. But remember, **with great power comes great responsibility**. Be kind and respectful to others. Express yourself, but do not hurt others.

<p align="right"><a href="#table-of-contents">⬆️ Back to table of contents</a></p>

## Features

- [ ] Send and receive anonymous messages
- [ ] React to messages
- [ ] Upvote and downvote messages
- [ ] Report messages

<p align="right"><a href="#table-of-contents">⬆️ Back to table of contents</a></p>

## Technologies

- [![Next.js][nextjs-badge]][nextjs-url]
- [![React][react-badge]][react-url]
- [![Tailwind Css][tailwindcss-badge]][tailwindcss-url]
- [![Firebase][firebase-badge]][firebase-url]
- [![Vercel][vercel-badge]][vercel-url]
- [![Multiavatar API][multiavatar-badge]][multiavatar-api-url]

<p align="right"><a href="#table-of-contents">⬆️ Back to table of contents</a></p>

## Getting Started

### Prerequisites

- Node.js
- NPM
- Firestore Database

<p align="right"><a href="#table-of-contents">⬆️ Back to table of contents</a></p>

### Installation

1. Clone the repository

   ```bash
   # https
   git clone https://github.com/fauzan-radji/anonymsg.git

   # ssh
   git clone git@github.com:fauzan-radji/anonymsg.git
   ```

2. Copy `.env.local.example` and rename to `.env.local`

   ```bash
   cp .env.local.example .env.local
   ```

3. Get your API key from [Multiavatar][multiavatar-url] and add it to your `.env.local` file

   ```env
   MULTIAVATAR_API_KEY=your_api_key
   ```

4. Install the dependencies

   ```bash
   cd anonymsg
   npm install
   ```

5. [Setup your Firebase project][firebase-console] and add your Firebase configuration to your `.env.local` file

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

6. Create a Firestore database and add the following collections:

   - **messages**

     | Field     | Type      |
     | --------- | --------- |
     | author    | string    |
     | text      | string    |
     | createdAt | timestamp |

7. Add the following rules to your Firestore database:

   ```javascript
   rules_version = '1';

   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

8. Adjust the `firebase.rc` file to your project

   ```json
   {
     "projects": {
       "default": "your-project-id"
     }
   }
   ```

9. Run the development server

   ```bash
   npm run dev
   ```

10. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<p align="right"><a href="#table-of-contents">⬆️ Back to table of contents</a></p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please [fork the repo][fork] and [create a pull request][pull-request]. You can also simply [open an issue][issue] with the tag `enhancement`.
Don't forget to give the project a star! Thanks again!

1. [Fork the Project][fork]
2. Create your Feature Branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your Changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the Branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. [Open a Pull Request][pull-request]

<p align="right"><a href="#table-of-contents">⬆️ Back to table of contents</a></p>

## Acknowledgements

- [![Next.js][nextjs-badge]][nextjs-url]
- [![React][react-badge]][react-url]
- [![Tailwind Css][tailwindcss-badge]][tailwindcss-url]
- [![Firebase][firebase-badge]][firebase-url]
- [![Vercel][vercel-badge]][vercel-url]
- [![Multiavatar API][multiavatar-badge]][multiavatar-api-url]

<p align="right"><a href="#table-of-contents">⬆️ Back to table of contents</a></p>

## Contact

Fauzan Radji - [LinkedIn](https://www.linkedin.com/in/tri-putra-fauzan-h-radji-404810257/)

Project Link: [https://anonymsg.vercel.app](https://anonymsg.vercel.app)

<p align="right"><a href="#table-of-contents">⬆️ Back to table of contents</a></p>

[fork]: https://github.com/fauzan-radji/anonymsg/fork/
[pull-request]: https://github.com/fauzan-radji/anonymsg/pulls/
[issue]: https://github.com/fauzan-radji/anonymsg/issues/
[firebase-console]: https://console.firebase.google.com/
[nextjs-url]: https://nextjs.org/
[react-url]: https://react.dev/
[tailwindcss-url]: https://tailwindcss.com/
[vercel-url]: https://vercel.com/
[firebase-url]: https://firebase.google.com/
[multiavatar-api-url]: https://api.multiavatar.com/
[multiavatar-url]: https://multiavatar.com/
[nextjs-badge]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[react-badge]: https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black
[tailwindcss-badge]: https://img.shields.io/badge/tailwind_css-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white
[vercel-badge]: https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white
[firebase-badge]: https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black
[multiavatar-badge]: https://img.shields.io/badge/multiavatar_api-000019?style=for-the-badge&logo=data:image/png;base64,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
