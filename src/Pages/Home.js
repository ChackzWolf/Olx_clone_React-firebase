import React, { useState } from 'react';

import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';

import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Footer/Footer';

function Home() {

    const [searchData,setSearchData] = useState("")

    const handleSearch = (searchText)=>{
        setSearchData(searchText)
    }    
console.log(searchData,"kkkkkkkkkkkkkkkiiiiiiiiiiiiiiiii")
  return (
    <div className="homeParentDiv">
      <Header onHandleSearch={handleSearch} />
      <Banner />
      <Posts searchResult={searchData}/>
      <Footer />
    </div>
  );
}

export default Home;
 