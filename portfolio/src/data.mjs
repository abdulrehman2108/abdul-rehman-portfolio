export const profile = {
  name: "Abdul Rehman Ansari",
  role: "Data Analyst",
  headline: "SQL | Power BI | Excel | Python",
  location: "Mumbai, India",
  email: "abdulrehmann2108@gmail.com",
  linkedin: "https://www.linkedin.com/in/abdul-rehman-ansari-22630928b/",
  github: "https://github.com/abdulrehman2108",
  intro: "I work with customer, financial and operational data to build analysis, dashboards and business reports.",
  about: "My work spans mutual funds, customer behavior, sales and airline operations. At Bluestock, I analyzed scheme, NAV and investor data, built a MySQL data layer and developed Power BI reporting. At AiVariant, I used SQL and Excel to examine passenger and flight patterns and built operational reports. I start with the business question, inspect and validate the data, then compare patterns in SQL, Python or spreadsheets before presenting the result in a dashboard or report. I am seeking entry-level Data Analyst, BI Analyst, Business Data Analyst, Reporting Analyst or Business Analyst roles.",
  tools: ["SQL", "Power BI", "Microsoft Excel", "Python", "Pandas", "MySQL", "DAX", "Power Query", "Tableau", "ETL"],
  quickProof: [
    { value: "2", label: "analytics internships" },
    { value: "5", label: "analytics project case studies" },
    { value: "40", label: "mutual fund schemes analyzed" },
    { value: "217M", label: "SIP contributions in project scope" }
  ]
};

export const experience = [
  {
    company: "Bluestock",
    role: "Financial Analyst",
    dates: "Jun 2026 - Jul 2026",
    location: "Remote",
    summary: "Analyzed mutual-fund and investor data to examine investment allocation, fund performance and behavior across segments.",
    bullets: [
      "Cleaned and analyzed mutual-fund, NAV, transaction and scheme-performance data with Python/Pandas and SQL.",
      "Built a MySQL data layer for recurring analysis and reporting; compared fund performance with NIFTY 50 data.",
      "Analyzed 40 schemes across 10 fund houses and developed Power BI dashboards for fund performance, investor activity and portfolio allocation."
    ],
    skills: ["Python", "Pandas", "SQL", "MySQL", "Power BI", "Financial analytics"]
  },
  {
    company: "AiVariant",
    role: "Data Analyst",
    dates: "Apr 2026 - Jun 2026",
    location: "Remote",
    summary: "Analyzed airline passenger and flight data to examine demand, route activity, carrier performance and load-factor patterns.",
    bullets: [
      "Worked with airline data covering 187M passengers and 3M flights across 1,152 cities and 6 operating regions.",
      "Used SQL and Advanced Excel to filter, aggregate, validate and compare carriers, regions, flight types and weekday/weekend periods.",
      "Built Power BI reports for passenger volume, flight activity, load factor, carrier performance and route trends."
    ],
    skills: ["SQL", "Advanced Excel", "Power BI", "Tableau", "Operational analysis"]
  }
];

export const projects = [
  {
    slug: "bluestock-mutual-fund-analytics",
    title: "Bluestock Mutual Fund Analytics Platform",
    category: "Financial analytics / Internship",
    deck: "Compare mutual-fund performance, investor activity and portfolio allocation across schemes and benchmark data.",
    repo: "https://github.com/abdulrehman2108/Mutual-Fund-Analytics-Platform",
    tools: ["Python", "Pandas", "SQL", "MySQL", "Power BI", "DAX"],
    scope: ["40 schemes", "10 fund houses", "217M SIP contributions", "1M+ AUM"],
    question: "How do fund performance, risk, investor segments and portfolio allocation vary across the schemes in the dataset?",
    data: "Fund master, NAV history, scheme performance, investor transactions, portfolio holdings and NIFTY 50 benchmark data.",
    approach: ["Raw data sources", "Cleaning and ETL", "MySQL data layer", "SQL and Python analysis", "Performance and risk metrics", "Power BI dashboards"],
    analysis: "Built measures including CAGR, Sharpe Ratio, Sortino Ratio, Alpha, Beta and Maximum Drawdown. Compared scheme performance with NIFTY 50 and used a composite scorecard to compare funds.",
    findings: [
      "Equity funds represented 85% of the schemes in the analysis.",
      "Lumpsum investments represented about 58.5% of transaction activity; SIP contributions represented 6.2%.",
      "Investors aged 26-35 were the largest segment, while T30 regions contributed about 66% of investments.",
      "The analysis found that higher returns did not always correspond to stronger risk-adjusted fund quality."
    ],
    takeaway: "The comparison used risk-adjusted measures alongside returns so fund performance could be reviewed across more than one metric.",
    deliverable: "Four Power BI views: Industry Overview, Fund Performance, Investor Analytics, and SIP & Market Trends."
  },
  {
    slug: "customer-behaviour-analytics",
    title: "Customer Behaviour Analytics",
    category: "Customer analytics",
    deck: "Compare shopping behavior and customer segments by product category, age group and subscription status.",
    repo: "https://github.com/abdulrehman2108/Customer-Behaviour-Analytics",
    tools: ["Python", "Pandas", "MySQL", "SQL", "Excel", "Power BI", "DAX"],
    scope: ["3.9K customers", "$59.76 average purchase", "3.75 average review rating", "73% non-subscribers"],
    question: "How do purchase patterns and customer characteristics vary across categories, age brackets and subscription status?",
    data: "Customer shopping records covering product categories, age brackets, subscription status, purchase amounts and review ratings.",
    approach: ["Clean and prepare records", "Compare segments in SQL and exploratory analysis", "Build an interactive Power BI dashboard", "Review category, age and subscription patterns"],
    analysis: "Compared revenue and purchase volume across Clothing, Accessories, Footwear and Outerwear, and examined results across age brackets and subscription status.",
    findings: [
      "Non-subscribers made up 73% of customers; subscribers made up 27%.",
      "Average purchase amount was $59.76; average review rating was 3.75.",
      "The dashboard compared category performance and customer patterns across four age brackets."
    ],
    takeaway: "The segment views provide a baseline for comparing customer spend and purchase volume across product and subscription groups.",
    deliverable: "Interactive customer behavior dashboard with KPI, category, age and subscription views."
  },
  {
    slug: "high-cloud-airlines",
    title: "Airline Operations Analytics",
    category: "Operational analytics / Internship",
    deck: "Examine passenger demand, route activity, carrier performance and load-factor patterns across airline operations data.",
    repo: "",
    tools: ["SQL", "Advanced Excel", "Power BI", "Tableau"],
    scope: ["187M passengers", "3M flights", "1,152 cities", "6 operating regions"],
    question: "Which routes, carriers and operating patterns correspond with passenger-volume and load-factor differences?",
    data: "Airline passenger and flight data compared by carrier, region, flight type, route distance and weekday/weekend period.",
    approach: ["Filter and validate operational data", "Aggregate and compare carriers and regions with SQL and Excel", "Build Power BI reports for demand and operations measures", "Review route and carrier patterns"],
    analysis: "Compared passenger volume, flight activity and load factor across carriers, routes, flight types, operating regions and weekday/weekend periods.",
    findings: [
      "The dataset covered 187M passengers and 3M flights across 1,152 cities and 6 regions.",
      "The under-500-mile distance group contained 44,437 flights.",
      "The reports tracked passenger volume, flight activity, load factor, carrier performance and route trends."
    ],
    takeaway: "The short-haul group is a defined segment for further route and carrier comparisons.",
    deliverable: "Power BI reporting for passenger demand, flight activity, load factor, carrier performance and route trends."
  },
  {
    slug: "sales-performance-analytics",
    title: "Sales Performance Analytics Dashboard",
    category: "Business intelligence / Sales analytics",
    deck: "Review revenue, profit and product performance across customer segments, countries and time trends.",
    repo: "https://github.com/abdulrehman2108/Sales-Performance-Analytics-Dashboard",
    visual: "https://github.com/abdulrehman2108/Sales-Performance-Analytics-Dashboard/blob/main/image.png?raw=1",
    visualAlt: "Sales Performance Analytics dashboard screenshot from the public project repository.",
    tools: ["Power BI", "Excel", "Sales analytics", "Data visualization"],
    scope: ["118.73M total sales", "16.89M total profit", "14% profit margin", "1.13M units sold"],
    question: "How do revenue and profitability vary by product, customer segment, country and time?",
    data: "Sales, unit, profit and margin measures, compared by customer segment, country, product and time.",
    approach: ["Review overall sales, units and profit measures", "Compare segment and country contributions", "Compare product performance", "Review the sales trend over time"],
    analysis: "The dashboard reports total sales, units sold, profit and margin, with segment, country, product and time comparisons.",
    findings: [
      "The dashboard totals 118.73M in sales, 16.89M in profit and a 14% profit margin.",
      "Government and Small Business segments contributed about 44% and 35% of sales, respectively.",
      "The United States and Canada were the top-performing countries.",
      "Paseo was the top-performing product."
    ],
    takeaway: "Government and Small Business accounted for about 79% of sales in this dataset; that mix provides a clear segment-level view for ongoing reporting.",
    deliverable: "Power BI sales dashboard with revenue, profitability, segment, country, product and time views."
  },
  {
    slug: "ferns-and-petals-business-analysis",
    title: "Ferns & Petals Business Analytics",
    category: "Sales and business analytics",
    deck: "Compare order, revenue, profit and occasion patterns across months, products and cities.",
    repo: "https://github.com/abdulrehman2108/Ferns-And-Petals-Business-Analytics",
    tools: ["Excel", "Power BI", "Business analysis", "ETL"],
    scope: ["1,000 orders", "3,521K revenue", "704K profit", "August, February and March sales peaks"],
    question: "How do sales and profit change across months, occasions, products and cities?",
    data: "Order and sales records compared by month, occasion, product and city.",
    approach: ["Prepare and summarize order data", "Compare monthly sales and profit", "Review occasion-level revenue share", "Compare city and product order patterns"],
    analysis: "Built dashboard views for order volume, revenue, profit, average delivery metrics, monthly trends, occasion mix and top cities/products.",
    findings: [
      "Across 1,000 orders, totals were 3,521K in revenue and 704K in profit.",
      "Sales peaks occurred in August, February and March.",
      "Raksha Bandhan represented 18% and Holi 16% of revenue share."
    ],
    takeaway: "The monthly peaks and occasion shares make seasonality and occasion mix visible for sales reporting.",
    deliverable: "Sales dashboard covering monthly performance, occasions, products and city comparisons."
  }
];

export const skills = [
  { title: "Core analytics", items: ["SQL", "Microsoft Power BI", "Microsoft Excel", "Python", "Pandas", "MySQL"] },
  { title: "Power BI and reporting", items: ["DAX", "Power Query", "Data Modeling", "Dashboard Development", "KPI Reporting", "Business Reporting"] },
  { title: "Analysis methods", items: ["Data Cleaning", "Exploratory Data Analysis", "ETL", "Data Transformation", "Data Visualization", "Performance Analysis"] },
  { title: "Additional tools", items: ["Tableau", "NumPy", "Jupyter Notebook", "Git", "GitHub"] }
];

export const education = [
  { institution: "HSNC University, Mumbai", degree: "Master's Degree, Business Analytics", dates: "Jul 2026 - Apr 2028" },
  { institution: "KC College", degree: "BSc-IT, Information Technology", dates: "Jul 2023 - Apr 2026", detail: "Grade: 9.18" }
];

export const certifications = [
  { name: "Data Analyst", issuer: "ExcelR", date: "Jun 2026" },
  { name: "Certificate Program in Data Analyst", issuer: "nasscom", date: "Jun 2026", detail: "Credential ID: FSP/2026/6/10305574" },
  { name: "Data Analyst - Big 4 Ready", issuer: "OneRoadmap", date: "Jun 2026", detail: "Certificate ID: CERT-003A0D99" }
];

export const training = [
  { name: "AI-Augmented Data Analysis", provider: "Department of Data Science and Business Analytics, HSNC University", detail: "2-credit, 30-hour course covering Excel analysis, data preparation, prompt design, insight generation and AI-assisted dashboards." }
];

export const leadership = [
  { role: "Technical & Logistics Head", organization: "KC College Organizing Committee", dates: "2024 - 2026", detail: "Led event operations and technical execution." },
  { role: "Placement Cell Member", organization: "KC College", dates: "2025", detail: "Managed on-campus hiring initiatives and coordinated communication between students and industry partners." }
];

export const nav = [
  ["Home", "top"], ["Projects", "projects"], ["Experience", "experience"],
  ["Skills", "skills"], ["Education", "education"], ["Contact", "contact"]
];
