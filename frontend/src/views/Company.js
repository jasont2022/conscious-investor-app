import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import s from 'styled-components'
import Navbar from '../NavbarC';
import Sidebar from '../components/Sidebar/Sidebar'

const Wrapper = s.div`
  width: 100%;
  box-sizing: border-box;
  margin: 20px auto 0px auto;
  max-width: 1000px;
`

const Company = () => {
  const navigate = useNavigate()
  const { tick } = useParams()

  // states to keep track of
  const [activeUser, setActiveUser] = useState('') // keep track of user
  const [count, setCount] = useState(0) // to trigger the useEffect
  const [basicInfo, setBasicInfo] = useState({}) // get company info
  const [esgInfo, setEsgInfo] = useState({}) // get esg info 
  const [totalScore, setTotalScore] = useState(0) // get total score
  const [articles, setArticles] = useState([]) // get the news artcles

  // reload the page based on active user
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { username } } = await axios.get('/account/user')
        username ? setActiveUser(username) : setActiveUser('')
      } catch (err) {
        setActiveUser('')
        navigate('/')
      }
    }
    getUser()
  }, [count])

  // make api calls to get info for the specific ticker
  useEffect(() => {
    const getCompanyInfo = async () => {
      try {
        const { data } = await axios.get(`https://financialmodelingprep.com/api/v3/profile/${tick}?apikey=e605026ed16aae3b084c6297f09bba6c`)
        const { data: esg } = await axios.get(`/account/esg/${tick}`)
        const { data: { score }} = await axios.get(`/account/ticker/${tick}`)
        const { data: { articles }} = await axios.get(`/account/company/news/${data[0].companyName}`)
        console.log(data[0])
        setBasicInfo(data[0])
        console.log(esg)
        setEsgInfo(esg)
        console.log(score)
        setTotalScore(score)
        console.log(articles.slice(0, 5))
        setArticles(articles.slice(0, 5))
      } catch (err) {
        // TODO: handle errors
        console.log(err)
      }
    }
    getCompanyInfo()
  }, [])

  // add this company to user's portfolio
  const addToPortfolio = async () => {
    try {
      const res = await axios.post(`/account/add-portfolio/${tick}`, {})
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Navbar
        user={activeUser}
        count={count}
        setCount={setCount}
      />
      <Sidebar />
      <Wrapper>
        <h1>{basicInfo.companyName}</h1>
        <h3>{basicInfo.symbol}</h3>
        <h3>{basicInfo.price}</h3>
        <h3>Market Cap: {basicInfo.mktCap}</h3>
        <h3>Changes: {basicInfo.changes}</h3>
        <h3>Industry: {basicInfo.industry}</h3>
        <a href={basicInfo.website} target="_blank" rel="noreferrer">{basicInfo.website}</a>
        <br />
        <button onClick={() => addToPortfolio()}>
          Add to Portfolio
        </button>
        <br/>
        <br/>
        <h2>About</h2>
        <p>{basicInfo.description}</p>
        <br />
        <h2>Scores</h2>
        <h4>Total Score: {Math.round(totalScore * 100)}</h4>
        <h5>Community Score: {Math.round(esgInfo.communityscore * 100)}</h5>
        <h5>Controversies Score: {Math.round(esgInfo.controversiesscore * 100)}</h5>
        <h5>C Score: {Math.round(esgInfo.cscore * 100)}</h5>
        <h5>Csrstrategy Score: {Math.round(esgInfo.csrstrategyscore * 100)}</h5>
        <h5>Emissions Score: {Math.round(esgInfo.emissionsscore * 100)}</h5>
        <h5>Humanrights score: {Math.round(esgInfo.humanrightsscore * 100)}</h5>
        <h5>innovation score: {Math.round(esgInfo.innovationscore * 100)}</h5>
        <h5>management score: {Math.round(esgInfo.managementscore * 100)}</h5>
        <h5>productresp score: {Math.round(esgInfo.productrespscore * 100)}</h5>
        <h5>resource use score: {Math.round(esgInfo.resourceusescore * 100)}</h5>
        <h5>shareholders score: {Math.round(esgInfo.shareholdersscore * 100)}</h5>
        <h5>workforce score: {Math.round(esgInfo.workforcescore * 100)}</h5>
        <br />
        <h2>News</h2>
        <div>
          {articles.map((article, i) => <News key={i} article={article} />)}
        </div>
      </Wrapper>
    </>
  );
}

const News = ({ article }) => {
  const { author, description, publishedAt, title, url, urlToImage } = article || {}
  return (
    <div style={{ margin: '50px' }}>
      <h1>{title}</h1>
      <h3>{author}</h3>
      <h3>{publishedAt}</h3>
      <h4>{description}</h4>
      <img src={urlToImage} alt="" style={{width: '50%'}}/>
      <br />
      <a href={url} target="_blank" rel="noreferrer">{url}</a>
    </div>
  );
};

export default Company;