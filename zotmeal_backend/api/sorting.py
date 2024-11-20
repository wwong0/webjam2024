ORDERINGS = [
    'Home',# anteatery main dish
    'The Oven',# anteatery pizza
    'Fire And Ice',# anteatery main dish 2
    'Fire & Ice',
    'Grubb',# brandywine main dish
    'Compass',# brandywine main dish 2
    'Hearth',# brandywine pizza
    "The Farmer's Market (Deli)",# anteatery sandwiches
    'Noodle Bar'
    'The Crossroads',# brandywine 3rd entree
    'Saute' 
    'Sizzle Grill',# anteatery burgers
    'Ember',# brandywine burgers
    'The Twisted Root',# both vegan
    'The Bakery',# anteatery dessert
    'Honeycakes',# brandywine dessert
    "Farmer's Market (Soups)" #anteatery soup
    'The Farm Stand (Soups)',# both soup
    "Farmer's Market",# anteatery salad
    'The Farm Stand (Salad)'# brandywine salad
]

def station_ordering_key(station_name: str) -> int:
    '''
    Returns an integer used to sort station names by relevance (basically Eric's personal preferences 😋)
    '''
    try:
        return ORDERINGS.index(station_name)
    except ValueError:# if 
        print(f"ValueError (NON-BREAKING) on station orderings. Key {station_name} is not in list")
        return -1