from zotmeal_backend import weekMenu
import pathlib
from datetime import datetime, timedelta
import json
import pandas as pd

SAMPLE_WEEKLY_OUTPUT = 'sample_weekly_output.json'


#as of 11/19/2024 10:10 pm records from 11/08/24 - 11/27/24 are available
#date = datetime.today() - timedelta(days=14)
def dump_menu(start_date, end_date):
    delta = abs((start_date - end_date).days)
    with open(pathlib.Path('sample_weekly_output.json'), 'w', encoding= 'utf-8') as f:
        json.dump(weekMenu.week_menu_dict(start_date, delta), f, indent = 4)

class Weekly_Menu:
    def __init__(self, date):
        self.date = date
        with open(pathlib.Path(SAMPLE_WEEKLY_OUTPUT), 'r') as f:
            self.weekly_output = json.load(f)
        self.df = self.convert_to_df(self.weekly_output)

    @staticmethod
    def convert_to_df(weekly_output):
        rows = []
        count = 0
        for hall in weekly_output:
            for meal in hall:
                date = meal['date']
                hall_name = meal['restaurant']
                meal_type = meal['currentMeal']

                for station in meal['themed']:
                    themed = True
                    station_name = station['station']
                    for category in station['menu']:
                        category_name = category['category']
                        for item in category['items']:
                            item_name = item['name']
                            description = item['description']
                            nutrition = item['nutrition']

                            unique_id = count
                            count += 1

                            row_data = {
                                "id": unique_id,
                                "Date": date,
                                "Dining Hall": hall_name,
                                "Meal": meal_type,
                                "Station": station_name,
                                "Themed": themed,
                                "Category": category_name,
                                "Item": item_name,
                                "Description": description
                            }

                            row_data.update(nutrition)
                            rows.append(row_data)

                for station in meal['all']:
                    themed = False
                    station_name = station['station']
                    for category in station['menu']:
                        category_name = category['category']
                        for item in category['items']:
                            item_name = item['name']
                            description = item['description']
                            nutrition = item['nutrition']

                            unique_id = count
                            count += 1

                            row_data = {
                                "id": unique_id,
                                "Date": date,
                                "Dining Hall": hall_name,
                                "Meal": meal_type,
                                "Station": station_name,
                                "Themed": themed,
                                "Category": category_name,
                                "Item": item_name,
                                "Description": description
                            }

                            row_data.update(nutrition)
                            rows.append(row_data)

        df = pd.DataFrame(rows)

        df.set_index(["Date", "Dining Hall", "Meal", "Station", "Category", "Item"],
                     inplace = True)

        return df

    def _get_schedule(self, date, hall):
        date = date.strftime('%m/%d/%Y')
        hall_index = 0 if hall == 'Brandywine' else 1
        for meal in self.weekly_output[hall_index]:
            if meal['date'] == date:
                schedule = meal['schedule']
        return schedule

    def available_items_by_meal(self, date, time, hall):
        schedule = self._get_schedule(date, hall)
        current_time = time.strftime('%H%M')
        items = []
        selected_meal_type = None
        for meal_type_name, meal_type in schedule.items():
            start = meal_type['start']
            end = meal_type['end']
            if start <= current_time <= end:
                selected_meal_type = meal_type_name

        searchable_date = date.strftime('%m/%d/%Y')
        return self.df.loc(axis=0)[:, searchable_date, hall, selected_meal_type, :, :, :, :]

    def get_item_from_id(self, unique_id):
        return self.df[self.df['id'] == unique_id]

    def get_item_from_name(self, name):
        return self.df.loc(axis=0)[:, :, :, :, :, :, name, :]

if __name__ == '__main__':
    pass

