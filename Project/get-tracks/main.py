import json
import gpxpy
import folium
import os
import requests
from bs4 import BeautifulSoup
import re
import urllib.request
import os
from models.AllTracks import AllTracks
from models.Track import Track
import concurrent.futures
from itertools import repeat 

def get_tracks(peak_url, tracks_inst):
    base = 'https://www.peakbagger.com/'
    url=base+peak_url
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    # The line below isolates the tags that include an href for a gpx file
    tags=soup.find_all('a', text=re.compile('[\WA-Za-z\d\.\s]*..GPS Track.'))
    # This line uses multi-threading to pull tracks concurrently
    with concurrent.futures.ThreadPoolExecutor() as executor:
        executor.map(extract_tag_info, tags, repeat(tracks_inst))

def extract_tag_info(tag, tracks_inst):
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
        tracks_inst.tracks.append(new_track)

def get_gps_url(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    # The line below isolates the tag that contains the href for the gpx file
    tag = soup.find('a', text='Download this GPS track as a GPX file')
    gps_track = tag['href'] 
    base = 'https://www.peakbagger.com/climber/'
    full_url = base+gps_track # Full URL of gps track 
    return full_url

def save_track(tag, id, name):
    urllib.request.urlretrieve(tag.gps_url,f"tracks/{id}_{name}/{tag.name}_{tag.date}.gpx")
    return 

def check_folder_existance(id, name):
    try:
        os.mkdir('tracks')
    except FileExistsError:
        print("This folder already exists")
    try:
        os.mkdir(f'tracks/{id}_{name}')
    except FileExistsError:
        print("This folder already exists")

def create_map(id, name):
    color_list = ['red', 'blue', 'green', 'purple', 'orange', 'darkred'
                'lightred', 'beige', 'darkblue', 'darkgreen', 'cadetblue', 
                'darkpurple', 'white', 'pink', 'lightblue', 'lightgreen', 
                'gray', 'black', 'lightgray','red', 'blue', 'green', 'purple', 
                'orange', 'darkred', 'lightred', 'beige', 'darkblue', 
                'darkgreen', 'cadetblue', 'darkpurple', 'white', 'pink', 
                'lightblue', 'lightgreen', 'gray', 'black', 'lightgray']

    directory = f'tracks/{id}_{name}'
    print(directory)
    # base_path = os.getcwd()

    for index, file_name in enumerate(os.listdir(directory)):
        establish_map = False
        file_path = os.path.join(directory,file_name)
        print(file_name)
        print(file_path)
        gpx_file = open(file_path, 'r')
        gpx = gpxpy.parse(gpx_file)
        points = []
        for track in gpx.tracks:
            for segment in track.segments:        
                for point in segment.points:
                    points.append(tuple([point.latitude, point.longitude]))
        if establish_map == False:
            try:
                latitude = sum(p[0] for p in points)/len(points) 
                print(latitude)
                longitude = sum(p[1] for p in points)/len(points)
                print(longitude)
                myMap = folium.Map(location=[latitude,longitude],zoom_start=14)
                establish_map = True
            except ZeroDivisionError:
                print('There was a zero division error')
        try:
            myMap.add_child(folium.PolyLine(points, color=color_list[index], weight=2.5, opacity=1))
        except ValueError:
            print("There was an error in this gpx, location is empty")
        except UnboundLocalError:
            print("No data")
    try:
        myMap.save(f"{id}_{name}.html")
    except:
        print(f"There was an error saving map for {id}: {name}")

def get_links():
    f = open('peak_data.json')
    data = json.load(f)
    all_peak = []
    for i in range(1, len(data)+1):
        peak_list=[]
        peak_list.append(str(i))
        peak_list.append(data[str(i)]['name'])
        peak_list.append(data[str(i)]['link'])
        print(peak_list)
        all_peak.append(peak_list)
    f.close()
    return all_peak

if __name__ == "__main__":
    peak_data = get_links()
    all_tracks_objs = [AllTracks() for i in range(100)]
    for index, peak in enumerate(peak_data):
        if index == 25:
            id = peak[0]
            name = peak[1].replace(" ","")
            link = peak[2]
            all_tracks_obj = all_tracks_objs[index]
            get_tracks(link, all_tracks_obj)
            check_folder_existance(id, name)
            with concurrent.futures.ThreadPoolExecutor() as executor:
                executor.map(save_track, all_tracks_obj.tracks, repeat(id), repeat(name))
            create_map(id, name)