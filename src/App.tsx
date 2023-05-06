import Header from "./components/Header"
import PersonalAccount from "./components/PersonalAccount"
import Products from "./components/Products"

const App = () => {
  return (
    <div className="w-full min-h-screen font-montserrat text-gray-1 bg-white bg-background-texture dark:bg-black dark:bg-background-texture-dark">
      <div className="px-9 py-8">
        <Header />
        <main className="flex justify-between gap-20">
          <PersonalAccount />
          <Products />
        </main>
      </div>
    </div>
  )
}

export default App
