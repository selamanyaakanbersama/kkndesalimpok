   import Home from './Home'
   import Impact from './Impact'
   import Tim from './Tim'
   import Programs from './Programs'

   function App() {
     const path = window.location.pathname.replace(/\/+$/, '')
     if (path === '/dampak') return <Impact />
     if (path === '/tim') return <Tim />
     if (path === '/program') return <Programs />
     return <Home />
   }

   export default App