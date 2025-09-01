import Link from 'next/link';

const InstructionText = ({ children }) => (
  <p style={{ color: '#555', lineHeight: '1.6' }}>{children}</p>
);

export default function HomePage() {
  return (
    <main style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '4rem auto', padding: '2rem', textAlign: 'center' }}>
      
      <header>
        <h1 style={{ fontSize: '2.5rem', color: '#333' }}>
          Welcome to the School Management Project
        </h1>
        <InstructionText>
          This is a mini-project designed to manage a list of schools. You can add new schools to a database and view all the schools that have been added.
        </InstructionText>
      </header>

      <section style={{ marginTop: '3rem', textAlign: 'left', borderTop: '1px solid #eee', paddingTop: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', color: '#333', textAlign: 'center', marginBottom: '1.5rem' }}>
          How to Use This App
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h3>Step 1: Add a New School</h3>
            <InstructionText>
              {'To begin, navigate to the "Add a School" page. You can get there by clicking the blue button below or typing /add-school in the URL. On that page, you will find a form to enter the school\'s details, including its name, address, and an image.'}
            </InstructionText>
          </div>
          <div>
            <h3>Step 2: View All Schools</h3>
            <InstructionText>
              {'After you have added one or more schools, go to the "Show All Schools" page. This page will fetch the data from the database and display every school in a responsive grid format, similar to an e-commerce website.'}
            </InstructionText>
          </div>
        </div>
      </section>
      
      <nav style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <Link href="/add-school" style={{ padding: '12px 24px', backgroundColor: '#0070f3', color: 'white', textDecoration: 'none', borderRadius: '5px', fontSize: '1rem' }}>
          {'Go to "Add a School"'}
        </Link>
        <Link href="/show-schools" style={{ padding: '12px 24px', backgroundColor: '#333', color: 'white', textDecoration: 'none', borderRadius: '5px', fontSize: '1rem' }}>
          {'Go to "Show All Schools"'}
        </Link>
      </nav>

    </main>
  );
}