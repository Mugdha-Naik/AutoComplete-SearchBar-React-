import React, { useEffect, useState } from 'react'

function App() {

  const [input, setInput] = useState("")
  const [results, setResults] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [cache, setCache] = useState({})

  const fetchData = async() => {

    if(cache[input]){
      console.log("Cache Resturned: ", input)
      setResults(cache[input])
      return;
    }
    console.log("API call", input)
    const data = await fetch("https://dummyjson.com/recipes/search?q="+input)
    const json = await data.json()
    setResults(json?.recipes);
    setCache(prev=> ({...prev, [input]: json?.recipes}))
  }

  useEffect(() => {

    const timer = setTimeout( fetchData, 300)
    //only after 300 sec the fetchData will be called this is called DEBOUNCING

    //if the input box changes before 300 sec clear the timer
    return () => {
      clearTimeout(timer);
    }
    //the component now unmounts ( a cleanup function )

  }, [input])
  return (
    <>
    <div className='font-sans text-center'>
      <h1>AutoComplete Search Bar</h1>
      <div>
    
    <input type="text"
    className='p-[5px] w-[500px] border border-gray-600 rounded-2xl'
    value={input}
    placeholder='Enter any search'
    onChange={(e) => setInput(e.target.value)} 
    onFocus={() => setShowResult(true)}
    onBlur={() => setShowResult(false)}/>
    {showResult && (
      <div className='w-[500px] m-auto overflow-y-scroll max-h-[454px] flex flex-col border-gray-600 rounded-2xl border-[2px] p-[5px] text-left '>
        {results.map((r)=>(
          <span className='cursor-pointer hover:bg-gray-100 display-block p-[4px]' key={r.id}>{r.name}</span>
        ))}
      </div>
    )}
    </div>
    </div>

    </>
  )
}

export default App