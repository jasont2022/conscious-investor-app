import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import s from 'styled-components'
import Sidebar from '../components/Sidebar/Sidebar'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MuiGrid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button, CardActionArea, CardActions } from '@mui/material'
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
  const [value, setValue] = React.useState('1') // change Tab UI value

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
      <Wrapper style={{marginLeft:"500px"}}>
        <div style={{textAlign:'center'}}>
          <Typography variant="h3" gutterBottom component="div">
            <a style={{ 'color': 'black' }} href={basicInfo.website} target="_blank" rel="noreferrer">{basicInfo.companyName}</a>
          </Typography>
          <Typography variant="h3" gutterBottom component="div">
            Symbol: {basicInfo.symbol}
          </Typography>
          <a style={{ 'color': 'black' }} href={basicInfo.website} target="_blank" rel="noreferrer">
            <img src={basicInfo.image} alt="company logo" />
          </a>
          <Typography variant="h5" gutterBottom component="div">
            Price: {basicInfo.price}
          </Typography>
          <Typography variant="h5" gutterBottom component="div">
            Industry: {basicInfo.industry}
          </Typography>
          <Typography variant="h5" gutterBottom component="div">
            Sector: {basicInfo.sector}
          </Typography>
          <Button variant="outlined" size="large" color={alreadyHere ? "error" : "primary"} onClick={() => portfolioLogic()}>
            {alreadyHere ? "Remove" : "Add"}
          </Button>
        </div>
        <br />
        <br />
        <Typography variant="h4" gutterBottom component="div">
          Company Information
        </Typography>
        <br />
        <Card sx={{ maxWidth: "100%" }}>
          <CardActionArea>
            <CardContent>
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={(event, newValue) => setValue(newValue)} aria-label="lab API tabs example">
                      <Tab label="About" value="1" />
                      <Tab label="Financial" value="2" />
                      <Tab label="ESG" value="3" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <Typography variant="body1" gutterBottom>
                      {basicInfo.description}
                    </Typography>
                    <br />
                    <Grid container>
                      <Grid item xs>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          CEO: {basicInfo.ceo}
                        </Typography>
                      </Grid>
                      <Grid item xs>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          Employees: {basicInfo.fullTimeEmployees}
                        </Typography>
                      </Grid>
                      <Grid item xs>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          Headquarters: {basicInfo.city}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel value="2">
                    <List sx={style} component="nav">
                      <ListItem button divider>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          Market Cap: {basicInfo.mktCap}
                        </Typography>
                      </ListItem>
                      <ListItem button divider>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          Changes: {basicInfo.changes > 0 ? `+${basicInfo.changes}` : `${basicInfo.changes}`}
                        </Typography>
                      </ListItem>
                      <ListItem button divider>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          Beta: {basicInfo.beta}
                        </Typography>
                      </ListItem>
                      <ListItem button divider>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          Average Volume: {basicInfo.volAvg}
                        </Typography>
                      </ListItem>
                      <ListItem button>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          Range (Lowest, Highest) in Last 52 Weeks: {basicInfo.range}
                        </Typography>
                      </ListItem>
                    </List>
                  </TabPanel>
                  <TabPanel value="3">
                    <Typography variant="h6" gutterBottom component="div">
                      Personalized Total Score: {Math.round(totalScore * 100)}
                    </Typography>
                    <Typography variant="h6" gutterBottom component="div">
                      Community Score: {Math.round(esgInfo.communityscore * 100) || "None"}
                    </Typography>
                    <List sx={style} component="nav">
                      <ListItem button divider>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          Board of Directors/Board Functions: {Math.round(esgInfo.cg_bd_bf * 100)}
                        </Typography>
                      </ListItem>
                      <ListItem button divider>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          Board of Directors/Board Structure: {Math.round(esgInfo.cg_bd_bs * 100)}
                        </Typography>
                      </ListItem>
                      <ListItem button divider>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          Board of Directors/Compensation Policy: {Math.round(esgInfo.cg_bd_cp * 100)}
                        </Typography>
                      </ListItem>
                      <ListItem button divider>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          Integration/Vision and Strategy: {Math.round(esgInfo.cg_in_vs * 100)}
                        </Typography>
                      </ListItem>
                      <ListItem button divider>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          Shareholders/Shareholder Rights: {Math.round(esgInfo.cg_sh_sr * 100)}
                        </Typography>
                      </ListItem>
                      <ListItem button divider>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          Margins/Performance: {Math.round(esgInfo.ec_ma_pe * 100)}
                        </Typography>
                      </ListItem>
                      <ListItem button divider>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          Profitability/Shareholder Loyalty: {Math.round(esgInfo.ec_pr_sl * 100)}
                        </Typography>
                      </ListItem>
                      <ListItem button divider>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          Revenue/Client Loyalty: {Math.round(esgInfo.ec_re_cl * 100)}
                        </Typography>
                      </ListItem>
                      <ListItem button divider>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          Emission Reduction: {Math.round(esgInfo.en_en_er * 100)}
                        </Typography>
                      </ListItem>
                      <ListItem button divider>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          Product Innovation: {Math.round(esgInfo.en_en_pi * 100)}
                        </Typography>
                      </ListItem>
                      <ListItem button divider>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          Resource Reduction: {Math.round(esgInfo.en_en_rr * 100)}
                        </Typography>
                      </ListItem>
                      <ListItem button divider>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          Customer/Product Responsibility: {Math.round(esgInfo.so_cu_pr * 100)}
                        </Typography>
                      </ListItem>
                      <ListItem button divider>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          Society/Community: {Math.round(esgInfo.so_so_co * 100)}
                        </Typography>
                      </ListItem>
                      <ListItem button divider>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          Society/Human Rights: {Math.round(esgInfo.so_so_hr * 100)}
                        </Typography>
                      </ListItem>
                      <ListItem button divider>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          Workforce/Diversity and Opportunity: {Math.round(esgInfo.so_wo_do * 100)}
                        </Typography>
                      </ListItem>
                      <ListItem button divider>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          Workforce/Employment Quality: {Math.round(esgInfo.so_wo_eq * 100)}
                        </Typography>
                      </ListItem>
                      <ListItem button divider>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          Workforce/Health & Safety: {Math.round(esgInfo.so_wo_hs * 100)}
                        </Typography>
                      </ListItem>
                      <ListItem button>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          Workforce/Training and Development: {Math.round(esgInfo.so_wo_td * 100)}
                        </Typography>
                      </ListItem>
                    </List>
                    {console.log(categoricalDes)}
                  </TabPanel>
                </TabContext>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
        <br />
        <br />
        <Typography variant="h4" gutterBottom component="div">
          News
        </Typography>
        <div style={{ marginBottom: '50px' }}>
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
    <div>
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

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

const style = {
  width: '100%',
  maxWidth: '100%',
  bgcolor: 'background.paper',
};

export default Company;