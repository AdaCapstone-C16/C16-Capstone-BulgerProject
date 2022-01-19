import requests
from bs4 import BeautifulSoup
import re
from models.peak import Peak

def inizialize_peak_data():
    peak_table = scrape_peak_info()

    for peak in peak_table:
        rank, name, link,elevation, coordinates = find_value(peak)
    # print(rank, name, link,elevation, coordinates)
        new_peak = Peak(rank, name, elevation, link, coordinates)
        print(new_peak)


def scrape_peak_info():
    response = requests.get("https://www.peakbagger.com/list.aspx?lid=5003")
    soup = BeautifulSoup(response.content, "html.parser")
    table_raw = soup.find("table", attrs={"class": "gray"})
    table_data = table_raw.find_all("tr")
    return table_data[2:]

def find_value(record):
    # get peak rank
    rank = record.td.get_text()
    # get peak name
    name = record.a.get_text()
    # get peak link
    link = record.a.get('href')
    # get peak elevation
    elevation = (record.find_all('td')[2].get_text()).replace(",","")
    # get peak coordinates 
    coordinates = get_peak_coordinates(link)
    return rank, name, link, elevation, coordinates

def get_peak_coordinates(link):
    base = "https://www.peakbagger.com/"
    full_link=base+link
    response = requests.get(full_link)
    soup = BeautifulSoup(response.content, "html.parser")
    table_raw = soup.find("table", attrs={"class": "gray"})
    table_data = table_raw.find_all("tr")
    for tr in table_data:
        coord_list = tr.find_all(string=re.compile('.*{0}.*'.format("Dec Deg")))
        if coord_list:
            coord_tup=tuple(coord_list[0].replace("(Dec Deg)","").strip().split(","))
            return coord_tup

inizialize_peak_data()



