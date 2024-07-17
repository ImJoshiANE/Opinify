# Opinify

Opinify is a dynamic web platform that provides users with a space to voice their thoughts, share ideas, and connect with a diverse community through vibrant discussions.

## Features

- **Customized Feed**: Personalized content based on user preferences.
- **Infinite Scrolling**: Smooth, continuous content loading.
- **Advanced Search**: Find communities easily.
- **Community Interaction**: Create and join communities, post text, images, videos, and hybrid content.
- **Engagement**: Comment on discussions and upvote/downvote posts and comments.

## Technologies

- **Frontend**: TypeScript, Next.js, React.js, Tailwind CSS
- **Backend**: Prisma, Redis, PostgreSQL
- **Cloud-Storage**: Uploadthing (Based on AWS S3)

## Getting Started

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/ImJoshiANE/Opinify.git
    cd Opinify
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables (create a `.env` file):
    ```plaintext
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret

    DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
    NEXTAUTH_SECRET=your_nextauth_secret

    UPLOADTHING_SECRET=your_uploadthing_secret
    UPLOADTHING_APP_ID=your_uploadthing_app_id

    REDIS_URL=your_redis_url
    REDIS_SECRET=your_redis_secret
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

## Usage

Visit [http://localhost:3000](http://localhost:3000) to see the application in action.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [Redis](https://redis.io/)
- [PostgreSQL](https://www.postgresql.org/)
