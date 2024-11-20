from zotmeal_backend import weekMenu
import pathlib
from datetime import datetime
import json

SAMPLE_WEEKLY_OUTPUT = 'sample_weekly_output.json'


#with open(pathlib.Path('sample_weekly_output.json'), 'w', encoding= 'utf-8') as f:
#    json.dump(weekMenu.week_menu_dict(datetime.today()), f, indent = 4)

with open(pathlib.Path(SAMPLE_WEEKLY_OUTPUT), 'r') as f:
    sample_weekly_output = json.load(f)


def available_items_by_day(day, time):
    schedule = sample_weekly_output['schedule']
    current_time = datetime.now().strftime('%H%M')
    items = []
    meal_type = None
    for meal in schedule:
        start = meal['start']
        end = meal['end']
        if start <= current_time <= end:
            meal_type = meal




