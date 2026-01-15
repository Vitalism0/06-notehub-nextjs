import css from "./SearchBox.module.css";

interface SearchBoxProps {
  query: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ query, onChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={(e) => onChange(e.target.value)}
      value={query}
    />
  );
}
