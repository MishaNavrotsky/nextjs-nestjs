'use client'

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ border: '1px solid red', padding: '1rem' }}>
      <h2>Login Layout</h2>
      {children}
    </div>
  )
}