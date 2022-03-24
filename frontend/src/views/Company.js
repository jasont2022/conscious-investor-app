import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import s from 'styled-components'
import Sidebar from '../components/Sidebar/Sidebar'

const Wrapper = s.div`
  width: 100%;
  box-sizing: border-box;
  margin: 20px auto 0px auto;
  max-width: 1000px;
`

const Company = () => {
  const { tick } = useParams()

  // states to keep track of
  const [basicInfo, setBasicInfo] = useState({}) // get company info
  const [esgInfo, setEsgInfo] = useState({}) // get esg info 
  const [totalScore, setTotalScore] = useState(0) // get total score
  const [articles, setArticles] = useState([]) // get the news artcles
  const [categoricalDes, setCategoricalDes] = useState([]) // get the score cat des.

  // make api calls to get info for the specific ticker
  useEffect(() => {
    const getCompanyInfo = async () => {
      try {
        const { data } = await axios.get(`https://financialmodelingprep.com/api/v3/profile/${tick}?apikey=e605026ed16aae3b084c6297f09bba6c`)
        const { data: esg } = await axios.get(`/account/esg/${tick}`)
        const { data: { score } } = await axios.get(`/account/ticker/${tick}`)
        const { data: { articles } } = await axios.get(`/account/company/news/${data[0].companyName}`)
        const { data: des } = await axios.get('/account/categories')
        console.log(data[0])
        setBasicInfo(data[0])
        console.log(esg)
        setEsgInfo(esg)
        console.log(score)
        setTotalScore(score)
        console.log(articles.slice(0, 5))
        setArticles(articles.slice(0, 5))
        console.log(des)
        setCategoricalDes(des.sort((a, b) => {
          const nameA = a['Item Code'].toUpperCase(); // ignore upper and lowercase
          const nameB = b['Item Code'].toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        }))
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
    {
      // Beta, 
      // ceo, 
      // changes, 
      // city, 
      // fulltimeemployees, 
      // industry, 
      // range (highest and lowest it’s been in the last 52 weeks),
      // sector, 
      // symbol, 
      // volAvg, 
      // website (link to name)
    }
      <Sidebar />
      <Wrapper>
        <h1>{basicInfo.companyName}</h1>
        <h3>{basicInfo.symbol}</h3>
        <img src={basicInfo.image} alt="company logo" />
        <h3>Price: {basicInfo.price}</h3>
        <h3>Market Cap: {basicInfo.mktCap}</h3>
        <h3>Changes: {basicInfo.changes}</h3>
        <h3>Industry: {basicInfo.industry}</h3>
        <a href={basicInfo.website} target="_blank" rel="noreferrer">{basicInfo.website}</a>
        <br />
        <button onClick={() => addToPortfolio()}>
          Add to Portfolio
        </button>
        <br />
        <br />
        <h2>About</h2>
        <p>{basicInfo.description}</p>
        <br />
        <h2>Scores</h2>
        {console.log(categoricalDes)}
        <h4>Personalized Total Score: {Math.round(totalScore * 100)}</h4>
        <h5>Community Score: {Math.round(esgInfo.communityscore * 100) || "None"}</h5>
        <h5>Board of Directors/Board Functions: {Math.round(esgInfo.cg_bd_bf * 100)}</h5>
        <h5>Board of Directors/Board Structure: {Math.round(esgInfo.cg_bd_bs * 100)}</h5>
        <h5>Board of Directors/Compensation Policy: {Math.round(esgInfo.cg_bd_cp * 100)}</h5>
        <h5>Integration/Vision and Strategy: {Math.round(esgInfo.cg_in_vs * 100)}</h5>
        <h5>Shareholders/Shareholder Rights: {Math.round(esgInfo.cg_sh_sr * 100)}</h5>
        <h5>Margins/Performance: {Math.round(esgInfo.ec_ma_pe * 100)}</h5>
        <h5>Profitability/Shareholder Loyalty: {Math.round(esgInfo.ec_pr_sl * 100)}</h5>
        <h5>Revenue/Client Loyalty: {Math.round(esgInfo.ec_re_cl * 100)}</h5>
        <h5>Emission Reduction: {Math.round(esgInfo.en_en_er * 100)}</h5>
        <h5>Product Innovation: {Math.round(esgInfo.en_en_pi * 100)}</h5>
        <h5>Resource Reduction: {Math.round(esgInfo.en_en_rr * 100)}</h5>
        <h5>Customer/Product Responsibility: {Math.round(esgInfo.so_cu_pr * 100)}</h5>
        <h5>Society/Community: {Math.round(esgInfo.so_so_co * 100)}</h5>
        <h5>Society/Human Rights: {Math.round(esgInfo.so_so_hr * 100)}</h5>
        <h5>Workforce/Diversity and Opportunity: {Math.round(esgInfo.so_wo_do * 100)}</h5>
        <h5>Workforce/Employment Quality: {Math.round(esgInfo.so_wo_eq * 100)}</h5>
        <h5>Workforce/Health & Safety: {Math.round(esgInfo.so_wo_hs * 100)}</h5>
        <h5>Workforce/Training and Development: {Math.round(esgInfo.so_wo_td * 100)}</h5>
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
      <h3>{publishedAt.slice(0,10)}</h3>
      <h4>{description}</h4>
      <img src={urlToImage} alt="" style={{ width: '50%' }} />
      <br />
      <a href={url} target="_blank" rel="noreferrer">Learn More</a>
    </div>
  );
};

export default Company;