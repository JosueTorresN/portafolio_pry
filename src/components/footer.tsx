export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-300 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 py-4 px-8 sm:px-20 flex justify-between items-center">
      <span>© 2024 Your Company</span>
      <span>
        Built with{" "}
        <a
          href="https://nextjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Next.js
        </a>
      </span>
    </footer>
  );
}