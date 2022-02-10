import requests
from bs4 import BeautifulSoup
import re
import urllib.request
import os
from models.AllTracks import AllTracks
from models.Track import Track
import time
import concurrent.futures

URL='https://www.peakbagger.com/peak.aspx?pid=2296' # Main Rainier Webpage
all_tracks = AllTracks()

def get_tracks(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    # The line below isolates the tags that include an href for a gpx file
    tags=soup.find_all('a', text=re.compile('[\WA-Za-z\d\.\s]*..GPS Track.'))
    # This line uses multi-threading to pull tracks concurrently
    with concurrent.futures.ThreadPoolExecutor() as executor:
        executor.map(extract_tag_info, tags)


def extract_tag_info(tag):
    new_track = None
    if 'Unsuccessful' not in tag.string: # only want to save tracks from successful summits
        try:
            #Using a try block here because some of the 'climber_url' pages no longer include a 'gps_url'
            date_search_pattern = "\d{4}.\d{2}.\d{2}" 
            date = re.match(date_search_pattern,tag.string).group()
            name = str(tag.string).replace(date+' by ',"").replace(" (GPS Track)","").replace(" ","")
            climber_url = 'https://www.peakbagger.com/'+tag["href"]
            gps_url = get_gps_url(climber_url)
            # If all of the above code can successfully be extracted, then an instance will be created
            # If something errors out above, then it will print an unsuccessful error
            new_track = Track(date, name, climber_url, gps_url)
        except TypeError:
            print(f"the following track could not be accessed: {tag}")
    if new_track:
        all_tracks.tracks.append(new_track)
    # return new_track

def get_gps_url(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    # The line below isolates the tag that contains the href for the gpx file
    tag = soup.find('a', text='Download this GPS track as a GPX file')
    gps_track = tag['href'] 
    base = 'https://www.peakbagger.com/climber/'
    full_url = base+gps_track # Full URL of gps track 
    return full_url

def save_track(tag):
    urllib.request.urlretrieve(tag.gps_url,f"tracks/{tag.name}_{tag.date}.gpx")
    return 

def check_folder_existance():
    try:
        os.mkdir('tracks')
    except FileExistsError:
        print("This folder already exists")

t1 = time.perf_counter()

get_tracks(URL)
check_folder_existance()
with concurrent.futures.ThreadPoolExecutor() as executor:
    executor.map(save_track, all_tracks.tracks)

t2 = time.perf_counter()

# With no threading, time to run: Finished in 31.352695756 seconds
# Using threading for just the saving files process: Finished in 27.464144794000003 seconds
# Using threading for the scrape and saving files: Finished in 3.9130214350000005 seconds
print(f'Finished in {t2-t1} seconds')