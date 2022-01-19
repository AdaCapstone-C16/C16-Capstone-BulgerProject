class Peak():
    
    def __init__(self, rank, name, elevation, link, coordinates):
        self.name = name
        self.rank = rank
        self.elevation = elevation
        self.link = link
        self.coordinates = coordinates
    
    def __str__(self):
        return f"{self.rank} {self.name} | {self.elevation}ft | {self.coordinates} (Dec Deg) | Link:{self.link}"