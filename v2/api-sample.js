"use strict";
const _ = require("lodash");
const got = require("got");
class Sample {
  static apiKey = "<API Key>"; // obtain from "API Key" section at https://affiliates.cloudbet.com/affiliate_api_token
  static apiBaseUrl = "https://sports-api.cloudbet.com";
  static async *infoGen(type) {
    while (true) {
      try {
        const sports = await this.getSports();
        const competitions = _.sample(
          await Promise.all(
            sports.map((sport) => this.getCompetitions(sport.key))
          )
        );
        const competition = _.sample(competitions);
        switch (type) {
          case "event":
            const event = await this.getEventFromCompetition(competition);
            yield this.getEventInfo(event.id);
            break;
          case "competition":
            yield this.getCompetitionInfo(competition);
            break;
        }
      } catch (ex) {
        continue;
      }
    }
  }

  static async getSports(sport) {
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

  static async getCompetitions(sportKey) {
    let response;
    try {
      response = await got.get({
        url: `${Sample.apiBaseUrl}/pub/v2/odds/sports/${sportKey}`,
        headers: { "X-API-Key": Sample.apiKey },
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

  static async getEventFromCompetition(competition) {
    let response;
    if (!competition) {
      throw new Error("Competition is not found!");
    }
    try {
      response = await got.get({
        url: `${Sample.apiBaseUrl}/pub/v2/odds/competitions/${competition.key}`,
        headers: { "X-API-Key": Sample.apiKey },
        responseType: "json",
      });
    } catch (ex) {
      throw new Error(`${ex.message}\nURL: ${ex.options.url.href}`);
    }
    if (response.body.events.length === 0) {
      throw new Error("Events list is empty!");
    } else {
      return _.sample(response.body.events);
    }
  }

  static async getCompetitionInfo(competition) {
    /*
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
        headers: { "X-API-Key": Sample.apiKey },
        responseType: "json",
      });
    } catch (ex) {
      throw new Error(`${ex.message}\nURL: ${ex.options.url.href}`);
    }
    return response.body.events.reduce((list, event) => {
      return [...list, { eventID: event.id, markets: event.markets }];
    }, []);
  }

  static async getEventInfo(eventId) {
    /*
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
        headers: { "X-API-Key": Sample.apiKey },
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
  // Two options available - event and competition
  const gen = await Sample.infoGen("event");
  for await (let info of gen) {
    console.log(info);
  }
})();
