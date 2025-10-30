# CryptoPunks Generator - Next.js Edition

This is a Next.js migration of the original CryptoPunks Generator project.

## Project Structure

- `src/app/page.tsx`: The main page component.
- `src/components/Canvas.tsx`: The component that renders the CryptoPunk.
- `src/components/Generator.tsx`: The main component that holds the UI and logic.
- `src/lib/drawingUtils.ts`: The utility functions for drawing the CryptoPunk.
- `public/`: Static assets.
- `.github/workflows/deploy.yml`: The GitHub Actions workflow for deployment.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/crypto-punks-generator-next.git
   ```
2. Navigate to the project directory:
   ```bash
   cd crypto-punks-generator-next
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

To run the development server, use the following command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To build the application for production, use the following command:

```bash
npm run build
```

The build artifacts will be stored in the `out/` directory.

## Deployment

This project is configured for automatic deployment to GitHub Pages. Any push to the `main` branch will trigger a build and deploy the application.

## Future Improvements

- **Performance Optimization:** The current drawing logic can be optimized by using image sprites instead of drawing pixel by pixel.
- **More Attributes:** The attribute set can be expanded with more options for hair, accessories, etc.
- **Attribute Rarity:** A rarity system can be implemented to make certain attributes less likely to be randomly generated.
- **Collection Persistence:** The collection feature from the original project can be implemented using local storage to persist the user's creations.
- **Metadata Export:** A feature to export the metadata of the generated CryptoPunks as a JSON file can be added.
