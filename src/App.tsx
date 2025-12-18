import NavBar from './components/NavBar'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProfilePage from './pages/ProfilePage'
import {useEffect, useState} from 'react'
import {searchCities} from './services/geocodingService'
import {useDebounce} from './hooks/useDebounce'
import CityDetailPage from "./pages/CityDetailPage.tsx";
import {useToast} from "./hooks/useToast.ts";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [searchIsLoading, setSearchIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const {toast} = useToast();

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
        const errMsg = error instanceof Error ? error.message : 'An error occurred';
        setErrorMessage(errMsg);
        toast(errMsg, "danger")
        setSearchResults([]);
      } finally {
        setSearchIsLoading(false);
      }
    };

    fetchCities();
  }, [debouncedSearchTerm, toast]);

  return (
    <BrowserRouter>
      <NavBar setSearchTerm={handleSearchTermChange} searchIsLoading={searchIsLoading} searchResults={searchResults} errorMessage={errorMessage}/>
      <main className='container mt-3'>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/profile' element={
            <ProtectedRoute>
              <ProfilePage/>
            </ProtectedRoute>
          }/>
          <Route path='/city/:id' element={<CityDetailPage/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
