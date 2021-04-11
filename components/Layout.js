import Nav from '@/components/Nav'

function Layout({ children }) {
  return (
    <>
      <Nav />

      <main className="bg-gray-50">
        {children}
      </main>
    </>
  )
}

export default Layout
