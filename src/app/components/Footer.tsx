// src/components/Footer.tsx
export default function Footer() {
    return (
      <footer className="bg-gray-100 py-4 mt-4 footer">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} Restaurant App. All rights reserved.
        </div>
      </footer>
    );
  }
