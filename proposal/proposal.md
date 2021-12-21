# Project Proposal

## Project Name
Well Weathered or Weathering Heights

## Individual/Group

Group:

-Lia Gaetano

-Roslyn Melookaran

-Areeba Rashid

## Learning Goals

- Learn datascraping
- Learn to use a NoSQL database (Firebase)
- Learn web automation
- User authentication
- Working with APIs

## Project Description

Background- The Bulger list is comprised of the top 100 peaks in WA based on prominence. Many climbers in the PNW attempt to complete the list by summiting all 100 mountians. In many cases, this task can take many years or even decades.
 
Project (High-Level)- Climbers can get a weather overview of peaks from the list, sorted based on best weather conditions. Ultimately allowing climber to find peaks with best weather prospects for a given day.

## Project Type

Web Application

## Main Front-End Technology

React

## Additional Front-End Technologies

None

## Back-End Technologies

- Google Firebase
- BeautifulSoup
- MultiThreading
- Regular Expressions

## Additional Back-End Technologies

- NOAA API
- Google Calendar API
- Login with google
- Selenium

## Database

- Firebase

## Deployment 

- Elastic Beanstalk

## Wireframes

- Outline - https://docs.google.com/document/d/1KDGsq6TCEaM64inJfv_tPP0fUu5g_BCQAarbTcWJ-ZE/edit
- Wireframe - https://drive.google.com/drive/folders/1Z7nsMtxynBDaeszw6lBxhxr1Y0zDsQI3

## MVP Feature Set

1.  Initialize database with peak info
    - Scrape data from peakbaggers: rank, name, elevation, link, coordinates, mtn range, indigenous name
    - Store in database? This data does not change → This data scrape will happen 1 time to initialize the database 
2.  User logs in
    - Create a username and password
    - Login, store profile info 
3.  Pull weather data
    - NOAA as primary weather pull
    - Store in database? This data will change every time the user visits site
4. Sort peaks by weather 
    - Sort peaks based on temperature pulled from NOAA



### Potential Additional Features

1.  Scrape tracks for a given peak and generate a combined map
2.  Create Google Calendar Event, invite a friend
3.  Pull more than just temp data, wind speed and chance of precip 
        -Be able to sort on any of these attributes
4.  Mark complete the peaks you have summited, earn badges when all the peaks of a given range have been summited
