// Sample script to trigger Cloudbet Odds API
// Can be run using node with the command: `node api-sample.js`
"use strict";
const _ = require("lodash");
const got = require("got");
class Sample {
  // Cloudbet Affiliate API: obtain from "API Key" section at https://affiliates.cloudbet.com/affiliate_api_token
  // Cloudbet Trading API: Please contact Cloudbet Support to obtain your Trading API Key.
  static apiKey = "<API Key>";

  static apiBaseUrl = "https://sports-api.cloudbet.com";
  static async *infoGen(type) {
    while (true) {
      // Make sure valid API Key is used
      if (Sample.apiKey === "<API Key>") {
        throw new Error("Use a valid API key and substitute into the script!");
      }

      try {
        const sports = await this.getSports();
        const competitions = _.sample(
          await Promise.all(
            sports.map((sport) => this.getCompetitionsForSport(sport.key))
          )
        );
        const competition = _.sample(competitions); // pick random competition from random sport
        switch (type) {
          case "event":
            const events = await this.getEventsForCompetition(competition);
            const event = _.sample(events); // pick random event from competition
            yield this.getEventInfo(event.id);
            break;
          case "competition":
            const competitionWithEvents = await this.getEventsForCompetition(
              competition
            );
            const eventsForCompetition = competitionWithEvents.reduce(
              (list, event) => {
                return [...list, { eventID: event.id, markets: event.markets }];
              },
              []
            );
            yield eventsForCompetition;
            break;
        }
      } catch (ex) {
        continue;
      }
    }
  }

  // getSports: Get list of sports. Sports are ordered by alphabetical order.
  // Sports are ordered by alphabetical order.
  // This corresponds to the `/sports` endpoint at https://docs.cloudbet.com
  static async getSports(sport) {
    /*
    Sample response:
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
    */
    let response;
    try {
      response = await got.get({
        url: `${Sample.apiBaseUrl}/pub/v2/odds/sports`,
        headers: { "X-API-Key": Sample.apiKey },
        responseType: "json",
      });
    } catch (ex) {
      throw new Error(`${ex.message}\nURL: ${ex.options.url.href}`);
    }
    if (sport) {
      return response.body.sports.filter((sport) => sport.key === sport);
    } else {
      return response.body.sports.filter((sport) => sport.eventCount > 0);
    }
  }

  // getCompetitionsForSport: Get competitions of a sport.
  // Competitions are grouped by categories.
  // This corresponds to the `/sports/{key}` endpoint at https://docs.cloudbet.com
  static async getCompetitionsForSport(sportKey) {
    /*
    Sample response:
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
    */
    let response;
    try {
      response = await got.get({
        url: `${Sample.apiBaseUrl}/pub/v2/odds/sports/${sportKey}`,
        headers: {
          "X-API-Key": Sample.apiKey,
        },
        responseType: "json",
      });
    } catch (ex) {
      throw new Error(`${ex.message}\nURL: ${ex.options.url.href}`);
    }
    const { categories } = response.body;
    if (categories.length > 0) {
      return categories.reduce(
        (allCompetitions, { competitions }) =>
          allCompetitions.concat(competitions),
        []
      );
    }
  }

  // getEventsForCompetition: Get live and upcoming events for given competition key.
  // This corresponds to the `/competitions/{key}` endpoint at https://docs.cloudbet.com
  static async getEventsForCompetition(competition) {
    /*
    Sample response.
    This is a simplified sample of the response with only Event ID and markets. Refer to `api-responses.md` for detailed sample with all fields.

      [
        {
            eventID: 4597460,
            markets: {
                'basketball.handicap': { submarkets: [Object], liability: 900 },
                'basketball.moneyline': { submarkets: [Object], liability: 900 },
                'basketball.totals': { submarkets: [Object], liability: 900 }
            },
        },
        {
            eventID: 4597461,
            markets: {
                'basketball.handicap': { submarkets: [Object], liability: 900 },
                'basketball.moneyline': { submarkets: [Object], liability: 900 },
                'basketball.totals': { submarkets: [Object], liability: 900 }
            }
        }
      ]
    */
    let response;
    if (!competition) {
      throw new Error("Competition is not found!");
    }
    try {
      response = await got.get({
        url: `${Sample.apiBaseUrl}/pub/v2/odds/competitions/${competition.key}`,
        headers: {
          "X-API-Key": Sample.apiKey,
        },
        responseType: "json",
      });
    } catch (ex) {
      throw new Error(`${ex.message}\nURL: ${ex.options.url.href}`);
    }
    if (response.body.events.length === 0) {
      throw new Error("Events list is empty!");
    } else {
      return response.body.events;
    }
  }

  // getEventInfo: Get event with markets for given event ID
  // This corresponds to the `/events/{id}` endpoint at https://docs.cloudbet.com
  static async getEventInfo(eventId) {
    /*
    Sample response (refer to `api-responses.md` for detailed sample).
    This is a simplified sample of the response with only Event ID and markets. Refer to `api-responses.md` for detailed sample with all fields.

      {
          eventID: 4031413,
          markets: {
              'basketball.handicap': { submarkets: [Object], liability: 900 },
              'basketball.moneyline': { submarkets: [Object], liability: 900 },
              'basketball.totals': { submarkets: [Object], liability: 900 }
          }
      }
    */
    let response;
    try {
      response = await got.get({
        url: `${Sample.apiBaseUrl}/pub/v2/odds/events/${eventId}`,
        headers: {
          "X-API-Key": Sample.apiKey,
        },
        responseType: "json",
      });
    } catch (ex) {
      throw new Error(`${ex.message}\nURL: ${ex.options.url.href}`);
    }
    return {
      eventID: response.body.id,
      markets: response.body.markets,
    };
  }
}

(async () => {
  // Event sample response
  const gen = await Sample.infoGen("event");

  // Uncomment following and comment out line above if you want a sample competition response instead
  // const gen = await Sample.infoGen("competition");

  for await (let info of gen) {
    console.log(JSON.stringify(info, null, 4));
  }
})();
