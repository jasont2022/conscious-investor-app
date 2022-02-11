import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import s from 'styled-components';
import Navbar from '../NavbarC';

const Company = () => {
  const navigate = useNavigate();
  const { tick } = useParams();

  // states to keep track of
  const [activeUser, setActiveUser] = useState('')
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
        const { data: { articles }} = await axios.get(`/account/company/news/${tick}`)
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

  return (
    <>
      <Navbar
        user={activeUser}
        count={count}
        setCount={setCount}
      />
      <div>
        <h1>{basicInfo.companyName}</h1>
        <h3>{basicInfo.symbol}</h3>
        <h3>{basicInfo.price}</h3>
        <h3>{basicInfo.mktCap}</h3>
        <h3>{basicInfo.changes}</h3>
        <h3>{basicInfo.industry}</h3>
        <a href={basicInfo.website} target="_blank" rel="noreferrer">{basicInfo.website}</a>
        <img src={basicInfo.img} alt="" />
        <br/>
        <h2>About</h2>
        <p>{basicInfo.description}</p>
        <br />
        <h2>Scores</h2>
        <h4>Total Score: {totalScore}</h4>
        <h5>Community Score: {esgInfo.communityscore}</h5>
        <h5>Controversies Score: {esgInfo.controversiesscore}</h5>
        <h5>C Score: {esgInfo.cscore}</h5>
        <h5>Csrstrategy Score: {esgInfo.csrstrategyscore}</h5>
        <h5>Emissions Score: {esgInfo.emissionsscore}</h5>
        <h5>Humanrights score: {esgInfo.humanrightsscore}</h5>
        <h5>innovation score: {esgInfo.innovationscore}</h5>
        <h5>management score: {esgInfo.managementscore}</h5>
        <h5>productresp score: {esgInfo.productrespscore}</h5>
        <h5>resource use score: {esgInfo.resourceusescore}</h5>
        <h5>shareholders score: {esgInfo.shareholdersscore}</h5>
        <h5>workforce score: {esgInfo.workforcescore}</h5>
        <br />
        <h2>News</h2>
        <div>
          {articles.map((article, i) => <News key={i} article={article} />)}
        </div>
      </div>
    </>
  );
}

const News = ({ article }) => {
  const navigate = useNavigate();
  const { author, description, publishedAt, title, url, urlToImage } = article  || {}
  return (
    <div style={{ margin: '50px' }}>
      <h1>{title}</h1>
      <h3>{author}</h3>
      <h3>{publishedAt}</h3>
      <h4>{description}</h4>
      <img src={urlToImage} alt="" />
      <a href={url} target="_blank" rel="noreferrer">{url}</a>
    </div>
  );
};

export default Company;