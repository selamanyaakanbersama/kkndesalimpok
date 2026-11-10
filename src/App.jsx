   import Home from './Home'
   import Impact from './Impact'
   import Tim from './Tim'
   import Programs from './Programs'
   import Masuk from './Masuk'
   import Dashboard from './Dashboard'

   function App() {
     const path = window.location.pathname.replace(/\/+$/, '')
     if (path === '/dampak') return <Impact />
     if (path === '/tim') return <Tim />
     if (path === '/program') return <Programs />
     if (path === '/masuk') return <Masuk />
     if (path === '/dashboard') return <Dashboard />
     return <Home />
   }

   export default App