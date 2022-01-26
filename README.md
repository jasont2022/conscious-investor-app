# conscious-investor-app

# Database

## NoSQL Version of ER Model
### Collection #1: Users
The documents within this collection are structured as follows:
```
  User: {
    _id: string,
    email: string,
    full_name: string,
    username: string,
    password: string,
    portfilio: [ 
                 cusip: string, 
                 cusip: string, 
                 cusip: string, 
                 ... 
               ],
    preferences: { 
      array,
      'default': [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    }
  }
```

### Collection #2: Complete_Companies
The documents within this collection are structured as follows:
```
  Complete_Company: {
      orgid: Number,
      orgname: String,
      cusip: String,
      symbol: String
  }
```

### Collection #3: ESG_Scores
The documents within this collection are structured as follows:
```
  ESG_Score: {
    orgid: Number,
    fisyear: Number,
    cdflag: Number,
    feeddate: String, 
    fyenddate: String,
    cg_bd_bfNumber,
    cg_bd_bs: Number,
    cg_bd_cp: Number,
    cg_in_vs: Number,
    cg_sh_sr: Number,
    ec_ma_pe: Number,
    ec_pr_sl: Number,
    ec_re_cl: Number,
    en_en_er: Number,
    en_en_pi: Number,
    en_en_rr: Number,
    so_cu_pr: Number,
    so_so_co: Number,
    so_so_hr: Number,
    so_wo_do: Number,
    so_wo_eq: Number,
    so_wo_hs: Number,
    so_wo_td: Number,
    score: Number,
    cscore: Number,
    controversiesscore: Number,
    resourceusescore: Number,
    emissionsscore: Number,
    innovationscore: Number,
    workforcescore: Number,
    humanrightsscore: Number,
    communityscore: Number,
    productrespscore: Number,
    managementscore: Number,
    shareholdersscore: Number,
    csrstrategyscore: Number
  }
```

### Collection #4: 1000_Company
The documents within this collection are structured as follows:
```
  1000_Company: {
    symbol: String
    description: String
    category2: String
    category3: String
    GICS Sector: String
    Market cap: String
    Dividend yield: String
    Country: String
    Action: String
  }
```

### Collection #5: Category_to_Description
The documents within this collection are structured as follows:
```
Category_to_Description: {
    s_number: Number
    item_code: String
    hierarchy_of_data_points: String
    title_of_data_point: String
    data_type: String
    description: String
    current_status_in_asset4: String
  }
```

## Next Steps
We will be using MongoDB Atlas as our cloud database service provider
