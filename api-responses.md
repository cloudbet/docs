# Sample Response JSON payloads

Here we present partial sample JSON payloads for Cloudbet Feed API endpoints.

Please refer to [https://docs.cloudbet.com](https://docs.cloudbet.com) on instructions for how to try different endpoints using API key.

## Feed API

These samples correspond to endpoints mentioned at [https://docs.cloudbet.com](https://docs.cloudbet.com)

The Base URL for all API endpoints is `https://sports-api.cloudbet.com/pub/v2/odds`

### `/sports`

Get a list of sports. Sports are ordered by alphabetical order.

Sample response:

```json
    {
        "sports": [
            {
                "name": "American Football",
                "key": "american-football",
                "competitionCount": 2,
                "eventCount": 92
            },
            {
                "name": "Archery",
                "key": "archery",
                "competitionCount": 0,
                "eventCount": 0
            },
            .
            .
            .
            {
                "name": "Soccer",
                "key": "soccer",
                "competitionCount": 142,
                "eventCount": 1239
            }
        ]
    }
```

### `/sports/{key}`

Get competitions of a sport. Competitions are grouped by categories.

Sample response:

```json
{
    "name": "Soccer",
    "key": "soccer",
    "competitionCount": 141,
    "eventCount": 1240,
    "categories": [
    {
        "name": "England",
        "key": "england",
        "competitions": [
            {
                "name": "Premier League",
                "key": "soccer-england-premier-league",
                "eventCount": 29
            },
            {
                "name": "FA Cup",
                "key": "soccer-england-fa-cup",
                "eventCount": 3
            },
            .
            .
            .
        ]
    },
    {
        "name": "International",
        "key": "international",
        "competitions": [
            {
                "name": "UEFA Euro 2020",
                "key": "soccer-international-euro-cup",
                "eventCount": 146
            },
            {
                "name": "World Cup",
                "key": "soccer-international-world-cup",
                "eventCount": 1
            },
            .
            .
            .
        ]
    ]
}
```

### `/competitions/{key}`

Get live and upcoming events for given competition key.

Sample response:

```json
{
  "name": "NBA",
  "key": "basketball-usa-nba",
  "sport": {
    "name": "Basketball",
    "key": "basketball"
  },
  "events": [
    {
      "sequence": "97",
      "id": 6473660,
      "home": {
        "name": "Miami Heat",
        "key": "c672-miami-heat",
        "abbreviation": "MIA"
      },
      "away": {
        "name": "Los Angeles Lakers",
        "key": "c655-los-angeles-lakers",
        "abbreviation": "LAL"
      },
      "players": {
        "c4a879-jared-dudley": {
          "name": "Jared Dudley",
          "team": "AWAY",
          "position": {
            "name": "F",
            "key": "f"
          }
        },
        "c4b25d-andre-drummond": {
          "name": "Andre Drummond",
          "team": "AWAY",
          "position": {
            "name": "C",
            "key": "c"
          }
        },
        .
        .
        .
      },
      "status": "TRADING_LIVE",
      "markets": {
        "basketball.handicap": {
          "submarkets": {
            "period=ot&period=ft": {
              "sequence": "97",
              "selections": [
                {
                  "outcome": "home",
                  "params": "handicap=-8",
                  "price": 1.915,
                  "minStake": 0.0001,
                  "probability": 0.505,
                  "status": "SELECTION_ENABLED",
                  "side": "BACK"
                },
                {
                  "outcome": "away",
                  "params": "handicap=-8",
                  "price": 1.95,
                  "minStake": 0.0001,
                  "probability": 0.495,
                  "status": "SELECTION_ENABLED",
                  "side": "BACK"
                },
                {
                  "outcome": "home",
                  "params": "handicap=-10",
                  "price": 2.248,
                  "minStake": 0.0001,
                  "probability": 0.427,
                  "status": "SELECTION_ENABLED",
                  "side": "BACK"
                },
                {
                  "outcome": "away",
                  "params": "handicap=-10",
                  "price": 1.672,
                  "minStake": 0.0001,
                  "probability": 0.573,
                  "status": "SELECTION_ENABLED",
                  "side": "BACK"
                },
                .
                .
                .
              ]
            }
          },
          "liability": 1262.505
        },
        "basketball.moneyline": {
          "submarkets": {
            "period=ot&period=ft": {
              "sequence": "97",
              "selections": [
                {
                  "outcome": "home",
                  "params": "",
                  "price": 1.264,
                  "minStake": 0.0001,
                  "probability": 0.76,
                  "status": "SELECTION_ENABLED",
                  "side": "BACK"
                },
                {
                  "outcome": "away",
                  "params": "",
                  "price": 4.001,
                  "minStake": 0.0001,
                  "probability": 0.24,
                  "status": "SELECTION_ENABLED",
                  "side": "BACK"
                }
              ]
            }
          },
          "liability": 631.2525
        },
      },
      "name": "Miami Heat V Los Angeles Lakers",
      "key": "c672-miami-heat-v-c655-los-angeles-lakers",
      "cutoffTime": "2021-04-08T23:30:00Z",
      "metadata": {
        "score": [
          53,
          55
        ],
        "setScores": [
          {
            "score": [
              24,
              41
            ]
          },
          {
            "score": [
              29,
              14
            ]
          }
        ],
        "opinion": []
      },
      "startTime": "2021-04-08T23:30:00Z"
    },
    {
      "sequence": "1873",
      "id": 5030846,
      "home": null,
      "away": null,
      "players": {
          .
          .
          .
      },
      "status": "TRADING",
      "markets": {
      .
      .
      .
      },
      "name": "NBA - Awards - Coach Of The Year (reg. season)",
      "key": "nba-awards-coach-of-the-year-reg-season",
      "cutoffTime": "2021-04-08T23:30:00Z",
      "metadata": {
        "score": [
          53,
          55
        ],
        "setScores": [
          {
            "score": [
              24,
              41
            ]
          },
          {
            "score": [
              29,
              14
            ]
          }
        ],
        "opinion": []
      },
      "startTime": "2021-04-08T23:30:00Z"
    }
  ]
}
```

### `/events/{id}`

Get event with markets for given event ID.

```json
{
  "sequence": "97",
  "id": 6473660,
  "sport": {
    "name": "Basketball",
    "key": "basketball"
  },
  "competition": {
    "name": "NBA",
    "key": "basketball-usa-nba",
    "category": {
      "name": "USA",
      "key": "usa"
    }
  },
  "home": {
    "name": "Miami Heat",
    "key": "c672-miami-heat",
    "abbreviation": "MIA"
  },
  "away": {
    "name": "Los Angeles Lakers",
    "key": "c655-los-angeles-lakers",
    "abbreviation": "LAL"
  },
  "players": {
    "c4a879-jared-dudley": {
      "name": "Jared Dudley",
      "team": "AWAY",
      "position": {
        "name": "F",
        "key": "f"
      }
    },
    "c4b25d-andre-drummond": {
      "name": "Andre Drummond",
      "team": "AWAY",
      "position": {
        "name": "C",
        "key": "c"
      }
    },
    "c4b269-kentavious-caldwell-pope": {
      "name": "Kentavious Caldwell-Pope",
      "team": "AWAY",
      "position": {
        "name": "G",
        "key": "g"
      }
    },
    "c4b58e-ben-mclemore": {
      "name": "Ben McLemore",
      "team": "AWAY",
      "position": {
        "name": "G",
        "key": "g"
      }
    },
    .
    .
    .
  },
  "status": "TRADING",
  "markets": {
    "basketball.handicap": {
      "submarkets": {
        "period=ot&period=ft": {
          "sequence": "97",
          "selections": [
            {
              "outcome": "home",
              "params": "handicap=-8",
              "price": 1.915,
              "minStake": 0.0001,
              "probability": 0.505,
              "status": "SELECTION_ENABLED",
              "side": "BACK"
            },
            {
              "outcome": "away",
              "params": "handicap=-8",
              "price": 1.95,
              "minStake": 0.0001,
              "probability": 0.495,
              "status": "SELECTION_ENABLED",
              "side": "BACK"
            },
            {
              "outcome": "home",
              "params": "handicap=-10",
              "price": 2.248,
              "minStake": 0.0001,
              "probability": 0.427,
              "status": "SELECTION_ENABLED",
              "side": "BACK"
            },
            {
              "outcome": "away",
              "params": "handicap=-10",
              "price": 1.672,
              "minStake": 0.0001,
              "probability": 0.573,
              "status": "SELECTION_ENABLED",
              "side": "BACK"
            },
            .
            .
            .
          ]
        }
      },
      "liability": 1262.505
    },
    "basketball.moneyline": {
      "submarkets": {
        "period=ot&period=ft": {
          "sequence": "97",
          "selections": [
            {
              "outcome": "home",
              "params": "",
              "price": 1.264,
              "minStake": 0.0001,
              "probability": 0.76,
              "status": "SELECTION_ENABLED",
              "side": "BACK"
            },
            {
              "outcome": "away",
              "params": "",
              "price": 4.001,
              "minStake": 0.0001,
              "probability": 0.24,
              "status": "SELECTION_ENABLED",
              "side": "BACK"
            }
          ]
        }
      },
      "liability": 631.2525
    },
    "basketball.totals": {
      "submarkets": {
        "period=ot&period=ft": {
          "sequence": "97",
          "selections": [
            {
              "outcome": "over",
              "params": "total=204.5",
              "price": 1.924,
              "minStake": 0.0001,
              "probability": 0.502,
              "status": "SELECTION_ENABLED",
              "side": "BACK"
            },
            {
              "outcome": "under",
              "params": "total=204.5",
              "price": 1.942,
              "minStake": 0.0001,
              "probability": 0.498,
              "status": "SELECTION_ENABLED",
              "side": "BACK"
            },
            {
              "outcome": "over",
              "params": "total=202",
              "price": 1.682,
              "minStake": 0.0001,
              "probability": 0.57,
              "status": "SELECTION_ENABLED",
              "side": "BACK"
            },
            {
              "outcome": "under",
              "params": "total=202",
              "price": 2.228,
              "minStake": 0.0001,
              "probability": 0.43,
              "status": "SELECTION_ENABLED",
              "side": "BACK"
            },
            .
            .
            .
            .
          ]
        }
      },
      "liability": 420.83500000000004
    }
  },
  "name": "Miami Heat V Los Angeles Lakers",
  "key": "c672-miami-heat-v-c655-los-angeles-lakers",
  "cutoffTime": "2021-04-08T23:30:00Z",
  "metadata": {
    "score": [],
    "setScores": [],
    "opinion": []
  },
  "startTime": "2021-04-08T23:30:00Z"
}
```
