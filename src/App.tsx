import { SetStateAction, useCallback, useState } from 'react'
import './App.scss'
import MainEditor from './components/MainEditor'

function App() {
  const [doc, setDoc] = useState<string>('')

  const handleDocChange = useCallback(() => {
    setDoc(doc)
  }, [])

  return (
    <>
      <MainEditor initialDoc={doc} onChange={handleDocChange} />
    </>
  )
}

export default App
