import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import s from 'styled-components'
import Sidebar from '../components/Sidebar/Sidebar'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
var htmlparser = require('htmlparser2');

const Wrapper = s.div`
  width: 100%;
  box-sizing: border-box;
  margin: 20px auto 0px auto;
  max-width: 1000px;
`

const Company = () => {
  const { tick } = useParams()

  // states to keep track of
  const [portfolio, setPortfolio] = useState([]) // get user's portfolio
  const [basicInfo, setBasicInfo] = useState({}) // get company info
  const [esgInfo, setEsgInfo] = useState({}) // get esg info 
  const [totalScore, setTotalScore] = useState(0) // get total score
  const [articles, setArticles] = useState([]) // get the news artcles
  const [categoricalDes, setCategoricalDes] = useState([]) // get the score cat des.

  // make api calls to get info for the specific ticker
  useEffect(() => {
    const getCompanyInfo = async () => {
      try {
        const { data: { portfolio } } = await axios.get('/account/user')
        const { data } = await axios.get(`https://financialmodelingprep.com/api/v3/profile/${tick}?apikey=e605026ed16aae3b084c6297f09bba6c`)
        const { data: esg } = await axios.get(`/account/esg/${tick}`)
        const { data: { score } } = await axios.get(`/account/ticker/${tick}`)
        const { data: { articles } } = await axios.get(`/account/company/news/${data[0].companyName}`)
        const { data: des } = await axios.get('/account/categories')
        console.log(portfolio)
        setPortfolio(portfolio)
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

  // button logic
  let alreadyHere = false
  try {
    alreadyHere = portfolio.includes(tick)
  } catch (e) {
    console.log(e)
  }

  // button portfolio logic add/remove a user portfolio
  const portfolioLogic = async () => {
    if (!alreadyHere) {
      try {
        const res = await axios.post(`/account/add-portfolio/${tick}`, {})
        console.log(res)
        console.log("Successfully Added")
        window.location.reload()
      } catch (err) {
        alert("Could Not Update, Try Again")
        console.log(err);
      }
    } else {
      try {
        const res = await axios.post(`/account/remove-portfolio/${tick}`, {})
        console.log(res)
        console.log("Successfully Removed")
        window.location.reload()
      } catch (err) {
        alert("Could Not Update, Try Again")
        console.log(err);
      }
    }
  }

  return (
    <>
      <Sidebar />
      <Wrapper>
        <h1>
          <a href={basicInfo.website} target="_blank" rel="noreferrer">{basicInfo.companyName}</a>
        </h1>
        <h3>Symbol: {basicInfo.symbol}</h3>
        <img src={basicInfo.image} alt="company logo" />
        <h3>Price: {basicInfo.price}</h3>
        <h3>Industry: {basicInfo.industry}</h3>
        <h3>Sector: {basicInfo.sector}</h3>
        <Button variant="outlined" size="medium" onClick={() => portfolioLogic()}>
          {alreadyHere ? "Remove" : "Add"}
        </Button>
        <br />
        <h2>About</h2>
        <p>{basicInfo.description}</p>
        <h4>CEO: {basicInfo.ceo}</h4>
        <h4>Employees: {basicInfo.fullTimeEmployees}</h4>
        <h4>Headquarters: {basicInfo.city}</h4>
        <br />
        <h2>Financials</h2>
        <h3>Market Cap: {basicInfo.mktCap}</h3>
        <h3>Changes: {basicInfo.changes}</h3>
        <h3>Beta: {basicInfo.beta}</h3>
        <h3>Average Volume: {basicInfo.volAvg}</h3>
        <h3>Range (Lowest, Highest) in Last 52 Weeks: {basicInfo.range}</h3>
        <br />
        <h2>ESG</h2>
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

{/* 
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ESG Score Name</TableCell>
                <TableCell align="right">Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}


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
  var result = [];

  var parser = new htmlparser.Parser({
    ontext: function (text) {
      result.push(text);
    }
  }, { decodeEntities: true });

  parser.write(description);
  parser.end();

  result.join('');

  return (
    <div style={{ margin: '20px' }}>
      <Card sx={{ maxWidth: "100%", marginTop: "40px" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={urlToImage}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {title}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {author}
            </Typography>
            <Typography gutterBottom variant="h8" component="div">
              {publishedAt.slice(0, 10)}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {result}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" href={url} target="_blank">
            Go To Article
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Company;