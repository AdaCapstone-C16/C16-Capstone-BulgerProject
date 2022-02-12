class Track:
    def __init__(self, date, name, climber_url, gps_url):
        self.date = date
        self.name = name
        self.climber_url = climber_url
        self.gps_url = gps_url

    def __str__(self):
        return f"Name:{self.name} | Date: {self.date} | \n\tClimber URL: {self.climber_url} | \n\tGPS URL: {self.gps_url}"






