const Layout = ({children}) => {
    return (
      <>
        <div className="App">
              <div className="header">
                  <h1>Expense Tracker</h1>
              </div>
  
              <div className="main">
                <div className="container">
                  {children}
                </div>   
              </div>
  
              <div className="footer">&copy;2022 </div>
         </div>
      </>
    )
  }
  
  export default Layout