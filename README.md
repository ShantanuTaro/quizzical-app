# Quizzical

Quizzical is a simple React quiz app that fetches trivia questions from the [Open Trivia Database](https://opentdb.com/) API. Users can test their knowledge, select answers, submit to see their score, and start a new quiz at any time.

## Features

- Fetches 5 random trivia questions per quiz session
- Multiple choice questions with shuffled options
- Highlights selected answers
- Shows correct (green) and incorrect (red) answers after submission
- Displays your score
- "New Quiz" button to reset and play again

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/quizzical-app.git
    cd quizzical-app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

### Running the App

Start the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Building for Production

```bash
npm run build
```

This will create a production-ready build in the `build` folder.

## Project Structure

```
src/
  App.js         # Main React component
  App.css        # Styles
  index.js       # Entry point
  ...
```

## Dependencies

- [React](https://reactjs.org/)
- [he](https://github.com/mathiasbynens/he) (for decoding HTML entities)

## Customization

- You can change the number of questions by editing the API URL in `App.js`.
- Styles can be modified in `App.css`.

## License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ using React.
