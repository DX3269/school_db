import Link from 'next/link';

export default function Header() {
  return (
    <header style={{
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #dee2e6',
      textAlign: 'center'
    }}>
      <Link href="/" style={{
        padding: '8px 16px',
        backgroundColor: '#6c757d',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        fontWeight: 'bold'
      }}>
        Home
      </Link>
    </header>
  );
}