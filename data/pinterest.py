import os
import requests
import json
from lxml import html
from bs4 import BeautifulSoup

class Recipe:
    # title, ingredients, image, link, original
    # tags

    def __init__(self, title, ingredients, image, link):
        self.title = title
        self.ingredients = ingredients
        self.image = image
        self.link = link
    
    def tag(self):
        pass


def scrape():
    recipes = []

    # build the URL
    url = "https://www.pinterest.com/samcomeauu/recipeapi/"
    parameters = {}
    headers    = {}
    
    # activities
    activities = []

    # results
    response = requests.get(url, params=parameters, headers=headers)

    if response.status_code == 200:
        # success
        soup = BeautifulSoup(response.text, features="lxml")

        initial = str(soup.find("script", {"id": "initial-state"}))
        initial = initial.replace('</script>', '')
        initial = initial.replace('<script id="initial-state" type="application/json">', '')

        data = json.loads(initial)

        with open("page.html", "w") as outfile:
            outfile.write(soup.prettify())

        objs = data["resourceResponses"][1]["response"]["data"]

        for obj in objs:
            ingredients = []

            to_parse = obj["rich_metadata"]["recipe"]["categorized_ingredients"]

            #import pdb; pdb.set_trace()


            # add to list
            recipe = Recipe(obj["grid_title"], ingredients, obj["images"]["orig"]["url"], obj["link"])

            recipes.append(recipe)

        print(len(recipes))


scrape()