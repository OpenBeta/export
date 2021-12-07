# Export tool for OpenBeta content catalog

You can export a single US state or the entire [catalog](https://github.com/OpenBeta/opentacos-content).

**Download weekly dumps:** [GitLab artifacts](https://gitlab.com/openbeta/exporter/-/pipelines)

Output file is in [Jsonlines](https://jsonlines.org/) format.  PRs for other formats are welcome!

**Usage**

```
# Install dependencies
yarn install

# yarn openbeta-export -d <content dir> -o <output_file>
```

See the [build file](.gitlab-ci.yml) for a real world example.

# Data format

##  Walls
```json
{
    "area_name": "Quirky Combat Wall",
    "metadata": {
        "lng": -121.568433,
        "lat": 45.405378,
        "area_id": "200bb0e7-62dd-43c3-b1de-3110e1b7f675",
        "mp_id": ""
    },
    "desc": [
        "Keep going left of K9 Shangai for about 150 yards. The faint trail follows the edge of the wall until you get to the next group of scrubbed routes.",
        "The trail is on slopping very soft dirt and it does not take much to trigger a slide. Thread lightly.",
        "All these routes are fairly new and even though great care was take to remove obvious loose rocks, some more may still be present. Helmets are strongly recommended. Some of these new routes might be in need of a light re-scrubbing. You should find brushes in the tree-mounted box along the trail. You are welcome to take one with you during your visit."
    ],
    "src": "Oregon/Mt. Hood/Petes Pile/Quirky Combat Wall/index.md"
}

```

View file on [Open-Tacos](https://tacos.openbeta.io/usa/oregon/mt-hood/petes-pile/quirky-combat-wall) or raw markdown on [GitHub](https://github.com/OpenBeta/opentacos-content/blob/develop/content/USA/Oregon/Mt.%20Hood/Petes%20Pile/Quirky%20Combat%20Wall/index.md)


## Climbs

TBD

Open-Tacos
# License
- Code in this repo: MIT
- Data files: CC0
