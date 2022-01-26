import requests
from bs4 import BeautifulSoup
import re
from models.peak import Peak
from models.all_peaks import All_Peaks
import json
import time
import concurrent.futures


def inizialize_peak_data():
    """Initializes the peak info scrape"""
    peak_table = scrape_peak_info()
    with concurrent.futures.ThreadPoolExecutor() as executor:
        executor.map(find_value, peak_table)

def scrape_peak_info():
    """This returns a 'bs4.element.ResultSet' element with peak info"""
    response = requests.get("https://www.peakbagger.com/list.aspx?lid=5003")
    soup = BeautifulSoup(response.content, "html.parser")
    table_raw = soup.find("table", attrs={"class": "gray"})
    table_data = table_raw.find_all("tr")
    return table_data[2:]

def find_value(record):
    """ For each peak, it pulls the specific rank/name/link/elevation/coordinates information"""
    # get peak rank
    rank = int(record.td.get_text().replace(".", ""))
    # get peak name
    name = record.a.get_text()
    # get peak link
    link = record.a.get('href')
    # get peak elevation
    elevation = (record.find_all('td')[2].get_text()).replace(",","")
    # get peak coordinates 
    coordinates = get_peak_coordinates(link)
    # get mountain range
    peak_range = record.find_all('td')[3].get_text()
    # get indifenous name of peak
    indigenous_name = get_indigenous_name(link)
    new_peak = Peak(rank, name, elevation, link, coordinates, peak_range, indigenous_name)
    peaks.peaks.append(new_peak)
    create_peak_dict(rank, name, elevation, link, coordinates, peak_range, indigenous_name)

def get_peak_coordinates(link):
    """The coordinates are found by going to each peak's individual page and scraping the coordinates from there"""
    table_data = get_peak_table(link)
    for tr in table_data:
        coord_list = tr.find_all(string=re.compile('.*{0}.*'.format("Dec Deg")))
        if coord_list:
            coord_tup=tuple(coord_list[0].replace("(Dec Deg)","").strip().split(","))
            return coord_tup

def get_indigenous_name(link):
    """The indigenous name are found by going to each peak's individual page and scraping the indigenous name (if it exists) from there"""
    table_data = get_peak_table(link)
    name_raw=table_data[1].find_all('td')[1].get_text()
    indigenous_name=None
    if 'Indigenous Name' in name_raw:
        indigenous_name=name_raw.replace('Indigenous Name:', "").strip()
        indigenous_name=indigenous_name.split()[0]
    return indigenous_name

def get_peak_table(link):
    """Get the base table info from a specific peak page"""
    base = "https://www.peakbagger.com/"
    full_link=base+link
    response = requests.get(full_link)
    soup = BeautifulSoup(response.content, "html.parser")
    table_raw = soup.find("table", attrs={"class": "gray"})
    table_data = table_raw.find_all("tr")
    return table_data

def create_peak_dict(rank, name, elevation, link, coordinates, peak_range, indigenous_name):
    if indigenous_name:
        new_peak_dict = {
                        'rank': rank,
                        'name': name, 
                        'indigenous_name': indigenous_name,
                        'elevation': elevation,
                        'link': link,
                        'coordinates': coordinates,
                        'range': peak_range,
                        'temp': "empty",
                        'chance_precip': "empty",
                        'wind_speed': "empty"
                        }
    else:
        new_peak_dict = {
                        'rank': rank,
                        'name': name,
                        'elevation': elevation,
                        'link': link,
                        'coordinates': coordinates,
                        'range': peak_range,
                        'temp': "empty",
                        'chance_precip': "empty",
                        'wind_speed': "empty"
                        }
    peaks.peak_dicts.append(new_peak_dict)

def create_json_file(peak_list):
    sorted_peaks = sorted(peak_list, key=lambda x : x["rank"])
    count=1
    all_peak_dict = {}
    for peak in sorted_peaks:
        all_peak_dict[count]=peak
        count+=1
    data = all_peak_dict
    json_string = json.dumps(data)
    with open('peak_data.json', 'w') as outfile:
        outfile.write(json_string)


if __name__ == '__main__':
    peaks = All_Peaks()
    inizialize_peak_data()
    create_json_file(peaks.peak_dicts)

