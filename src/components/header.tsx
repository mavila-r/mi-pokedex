import styles from "./header.module.css";
type HeaderProps = {
    query: string;
    setQuery: (query: string) => void;
}

const Header = ({ query, setQuery }: HeaderProps) => {
    return (
<header className={styles.header}>
    <input value={query} 
    className={styles.input} 
    type="text" 
    placeholder="Search a Pokemon"
    onChange={(e) => setQuery(e.target.value)}/>
</header>
    );
};

export default Header;