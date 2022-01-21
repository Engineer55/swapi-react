import './swapi.css';
import { useState, useEffect } from 'react';
import { Menu, Search } from './components/index'
import { Content } from './content'

function App() {
  const [mainMenu, setMainMenu] = useState()
  const [category, setCategory] = useState()
  const [subMenu, setSubMenu] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState()
  const [isLoadingMainMenu, setIsLoadingMainMenu] = useState(false)
  const [isLoadingSubMenu, setIsLoadingSubMenu] = useState(false)
  // const [foundItem, setFoundItem] = useState()
  // console.log(`foundItem`, foundItem)

  const getMainMenu = () => {
    setIsLoadingMainMenu(true)
    fetch('https://swapi.dev/api')
      .then(response => response.json())
      .then(response => {
        response = Object.entries(response).reduce((acc, item) => {
          return [...acc, { name: item[0], url: item[1] }]
        }, [])
        setMainMenu(response)
      })
  }

  const getSubMenu = (page) => {
    setIsLoadingSubMenu(true)
    const url = page ? `${category}?page=${page}` : category
    fetch(url)
      .then(response => response.json())
      .then(response => {
        const subMenuList = response.results.reduce((acc, item) => {
          return [...acc, { name: (item.name || item.title), url: item.url }]
        }, [])
        setSubMenu(subMenuList)
        if (Math.ceil(response.count / 10) > 1) {
          setTotalPages(Math.ceil(response.count / 10))
        }
        else setTotalPages(1)
      })
  }

  useEffect(() => {
    getMainMenu()
  }, [])

  useEffect(() => {
    if(mainMenu){
      setIsLoadingMainMenu(false)
    }    
    if(subMenu){
      setIsLoadingSubMenu(false)
    }
  }, [mainMenu, subMenu])

  useEffect(() => {
    if (category) {
      getSubMenu()
      setCurrentPage(1)
    }
  }, [category])

  return (
    <div className="wrapper">
      <h1 className="swapi__title">The Star Wars API</h1>
      <Search categoryList={mainMenu} foundItem={setCategory}/>
      {isLoadingMainMenu && <span><strong>Loading...</strong></span>}
      <Menu
        menu={mainMenu}
        category={category}
        onItemClick={setCategory}
      />
      <Content
        subMenu={subMenu}
        totalPages={totalPages}
        onPageClick={(page) => {
          setCurrentPage(page)
          getSubMenu(page)
        }}
        currentPage={currentPage}
        isLoadingSubMenu={isLoadingSubMenu}
      />
    </div>
  )
}

export default App;