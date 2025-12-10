import NavBar from './components/NavBar'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProfilePage from './pages/ProfilePage'
import {useEffect, useState} from 'react'
import {searchCities} from './services/geocodingService'
import {useDebounce} from './hooks/useDebounce'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [searchIsLoading, setSearchIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
    if (term.length < 3) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm.length < 3) {
      setErrorMessage('');
      return;
    }

    const fetchCities = async () => {
      setSearchIsLoading(true);
      setErrorMessage('');
      try {
        const result = await searchCities(debouncedSearchTerm);
        setSearchResults(result);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
        setSearchResults([]);
      } finally {
        setSearchIsLoading(false);
      }
    };

    fetchCities();
  }, [debouncedSearchTerm]);

  return (
    <BrowserRouter>
      <NavBar setSearchTerm={handleSearchTermChange} searchIsLoading={searchIsLoading} searchResults={searchResults} errorMessage={errorMessage}/>
      <main className='container mt-3'>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
