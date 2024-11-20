from zotmeal_backend import weekMenu
import pathlib
from datetime import datetime
import json

with open(pathlib.Path('sample_weekly_output.txt'), 'w', encoding= 'utf-8') as f:
    json.dump(weekMenu.week_menu_dict(datetime.today()), f)
