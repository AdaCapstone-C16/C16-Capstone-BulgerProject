from urllib.parse import urljoin
import requests
from bs4 import BeautifulSoup
from csv import writer

"""
Scrapes peak name and elevation data from "Washington State Fire Lookouts" 
from peakbagger.com. Returns JSON formatted data, as such:
[
    "peak_name" : {
        "rank": int,
        "elevation": int
    }
]

Tutorials consulted:
"Intro to Web Scraping with Python" by Traversy Media 
    https://www.youtube.com/watch?v=4UcqECQe5Kc
"Using BeautifulSoup and Python to navigate an HTML parse tree" by Programming Basics
    https://www.youtube.com/watch?v=GWXpWU3d23M
"""

URL = "https://www.peakbagger.com/list.aspx?lid=5004"
response = requests.get(URL)
soup = BeautifulSoup(response.text, "html.parser")

# Several tables, looking for the Peak info table
table_tag = soup.find_all('table')
peak_table = table_tag[5]
peak_list = peak_table.find_all('tr')[1]

# Return list
peaks = []
# Loop through each row of table to extract specific data
for row in peak_list:
    tds = row.find_all('td')

    rank = tds[0].text
    rank = rank[:-1] # removes trailing punctuation

    name = tds[1].text
    elevation = tds[2].text

    # Create JSON response
    peaks.append({
        "name": name,
        "rank": rank,
        "elevation": elevation
    })
    
    
print(peaks)






#########################################################
####### ATTEMPT AT SCRAPING TRIP REPORTS FROM WTA #######
# id="reports_target" is the last tag I can get to work..something to
#   do with it being a query?
#########################################################


# bulger_10 = ["mount-rainier", "mount-adams-south-climb",
#             "little-tahoma", "mount-baker", "glacier-peak",
#             "bonanza-peak", "mount-stuart", "mount-fernow",
#             "goode-mountain", "mt-shuksan"]

# URL = "https://www.wta.org/go-hiking/hikes/"

# for peak in bulger_10:
#     PATH = URL + peak

# response = requests.get("https://www.wta.org/go-hiking/hikes/mount-stuart")

# soup = BeautifulSoup(response.text, "html.parser")

# divs = soup.find_all("div", id="reports_target")
# print(divs)


# TODO
    # 1. Get bs4 working for trip report title
    # 2. Regex to parse date
    # 3. Convert to Datetime
    # 4. If post was within last week keep it, otherwise pass
    # 5. Print [Peak]: [Trip Report] & [Trip Report Link]