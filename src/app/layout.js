// app/layout.js
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <html lang="es">
      <head>
        <title>Tournament App</title>
       
      </head>
      <body style={styles.body}>
        <header style={styles.header}>
          <nav style={styles.nav}>
            <Link href="/" style={styles.navItem}>Inicio</Link>
            <Link href="/Tournament" style={styles.navItem}>Torneo</Link>
          </nav>
        </header>
        <main style={styles.main}>
          {children} 
        </main>
        <footer style={styles.footer}>
          <p>&copy; 2025 Todos los derechos reservados</p>
        </footer>
      </body>
    </html>
  );
}

const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: 0,
    backgroundColor: '#f7f7f7',
  },
  header: {
    backgroundColor: '#007BFF',
    padding: '10px 20px',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-around',
    listStyle: 'none',
  },
  navItem: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.2rem',
  },
  main: {
    padding: '20px',
  },
  footer: {
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
  },
};
