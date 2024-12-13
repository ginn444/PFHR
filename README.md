# Personal Family Health Researcher

A modern web application for analyzing personal health data by connecting cancer information, biomarkers, and DNA data with scientific research from SNPedia.

![Personal Family Health Researcher](https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80&w=800)

## Features

- **Cancer Information Management**
  - Input cancer type and stage
  - Structured data collection for medical history
  - Support for all cancer stages (0-IV)

- **Biomarker Tracking**
  - Add up to 11 different biomarkers
  - Record biomarker names, results, and levels
  - Dynamic form management with real-time updates

- **DNA Analysis**
  - Upload DNA genotype files
  - Supported formats: TXT, CSV, VCF
  - Drag-and-drop interface for easy file handling
  - Integration with SNPedia for scientific research correlation

## Tech Stack

- **Frontend Framework**: React 18.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Development**: Vite
- **Linting**: ESLint

## Project Structure

```
src/
├── components/           # React components
│   ├── BiomarkerForm.tsx    # Biomarker input management
│   ├── CancerForm.tsx       # Cancer information form
│   └── DNAUpload.tsx        # DNA file upload handler
├── types/               # TypeScript type definitions
│   └── index.ts            # Shared type interfaces
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd personal-family-health-researcher
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Development Guidelines

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Maintain proper type safety
- Keep components small and focused
- Use meaningful variable and function names

### Component Structure

- Each component should have a single responsibility
- Props should be properly typed using TypeScript interfaces
- Use composition over inheritance
- Implement proper error handling
- Follow React best practices for state management

### File Organization

- Keep related files close together
- Use clear, descriptive file names
- Maintain a consistent file structure
- Separate business logic from UI components
- Group related functionality in directories

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [SNPedia](https://www.snpedia.com/) for providing scientific research data
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Lucide React](https://lucide.dev/) for the icon set
- [React](https://reactjs.org/) for the frontend framework
- [Vite](https://vitejs.dev/) for the build tool

## Contact

For questions and support, please open an issue in the GitHub repository.
