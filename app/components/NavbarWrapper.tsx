// app/components/NavbarWrapper.tsx
import Navbar from './Navbar'
import { draftMode } from 'next/headers'

export default async function NavbarWrapper() {
  const draft = await draftMode()
  return <Navbar draftModeEnabled={draft.isEnabled} />
}