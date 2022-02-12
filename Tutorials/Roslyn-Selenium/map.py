from selenium import webdriver
from selenium.webdriver.common.by import By
import gpxpy
import pandas as pd
import folium
import os
import webbrowser

color_list = ['red', 'blue', 'green', 'purple', 'orange', 'darkred'
            'lightred', 'beige', 'darkblue', 'darkgreen', 'cadetblue', 
            'darkpurple', 'white', 'pink', 'lightblue', 'lightgreen', 
            'gray', 'black', 'lightgray','red', 'blue', 'green', 'purple', 
            'orange', 'darkred', 'lightred', 'beige', 'darkblue', 
            'darkgreen', 'cadetblue', 'darkpurple', 'white', 'pink', 
            'lightblue', 'lightgreen', 'gray', 'black', 'lightgray']

directory = 'tracks/'
base_path = '/Users/roslynmelookaran/Documents/Code/04_Adas/Capstone/C16-Capstone-BulgerProject/Tutorials/Roslyn-Selenium/tracks/'

for index, file_name in enumerate(os.listdir(directory)):
    file_path = os.path.join(base_path,file_name)
    gpx_file = open(file_path, 'r')
    gpx = gpxpy.parse(gpx_file)
    points = []
    for track in gpx.tracks:
        for segment in track.segments:        
            for point in segment.points:
                points.append(tuple([point.latitude, point.longitude]))
    if index==0:
        latitude = sum(p[0] for p in points)/len(points) 
        print(latitude)
        longitude = sum(p[1] for p in points)/len(points)
        print(longitude)
        myMap = folium.Map(location=[latitude,longitude],zoom_start=14)
    myMap.add_child(folium.PolyLine(points, color=color_list[index], weight=2.5, opacity=1))

myMap.save("map_combined.html")
