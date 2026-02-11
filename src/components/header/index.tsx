import { LanguageSelector } from "../language-selector";

export function Header() {
  return (
    <header className="flex w-full items-center justify-between h-24 p-10">
      <nav>
        <h1>Accounted</h1>
      </nav>
      <div>
        <LanguageSelector />
      </div>
    </header>
  );
}
