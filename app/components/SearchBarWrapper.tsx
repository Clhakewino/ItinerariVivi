// app/components/SearchBarWrapper.tsx
import SearchBar from './SearchBar'
import { draftMode } from 'next/headers'

export default async function SearchBarWrapper() {
  const draft = await draftMode()
  return <SearchBar draftModeEnabled={draft.isEnabled} />
}