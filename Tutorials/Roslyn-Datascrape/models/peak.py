class Peak():

    def __init__(self, rank, name, elevation, link, coordinates, peak_range, indigenous_name):
        self.name = name
        self.rank = rank
        self.elevation = elevation
        self.link = link
        self.coordinates = coordinates
        self.peak_range = peak_range
        self.indigenous_name = indigenous_name
    
    def __str__(self):
        return f"{self.rank} {self.name} | {self.elevation}ft | {self.coordinates} (Dec Deg) | Link:{self.link} | Peak Range: {self.peak_range} | Indigenous Name: {self.indigenous_name}"