import queryString from 'query-string';

const mockResponse = {
    "statusCode": 200,
    "body": [
        {
            "id": "meetup-zllzrlywfbpb",
            "time": 1489258800000,
            "url": "https://www.meetup.com/San-Francisco-Womens-Basketball-Meetup/events/237387070/",
            "name": "Let's Play!",
            "latlng": {
                "lat": 37.802715,
                "lng": -122.412384
            },
            "assistants": 5,
            "avgRating": 5,
            "source": "MEETUP"
        },
        {
            "id": "meetup-237669207",
            "time": 1489258800000,
            "url": "https://www.meetup.com/MAXSanFrancisco/events/237669207/",
            "name": "Hike & Picnic on Angel Island",
            "latlng": {
                "lat": 37.808613,
                "lng": -122.412537
            },
            "assistants": 45,
            "avgRating": 5,
            "source": "MEETUP"
        },
        {
            "id": "meetup-237919613",
            "time": 1489258800000,
            "url": "https://www.meetup.com/MMS-SF/events/237919613/",
            "name": "Sacred Geometry 2- Reading, Gridding, and Healing with Crystals!",
            "latlng": {
                "lat": 37.948394,
                "lng": -122.063878
            },
            "assistants": 5,
            "avgRating": 5,
            "source": "MEETUP"
        },
        {
            "id": "meetup-237646779",
            "time": 1489260600000,
            "url": "https://www.meetup.com/East-Bay-Happily-Single-Gay-Men/events/237646779/",
            "name": "Playland Not at The Beach, Albany, CA",
            "latlng": {
                "lat": 37.917245,
                "lng": -122.312794
            },
            "assistants": 10,
            "avgRating": 5,
            "source": "MEETUP"
        }
    ]
};

const getEventType = (event, desertLimit, averageLimit) => {
    if (event.assistants > averageLimit) {
        return 'busy';
    } else if (event.assistants > desertLimit) {
        return 'average';
    }
    return 'desert';
};


export default class EventsService {
    getEvents({
        initialDate,
        endDate,
        lat,
        lon
    }) {
        return fetch('https://1qkzhufsm1.execute-api.us-east-1.amazonaws.com/dev/events?' + queryString.stringify({
                lat,
                lng: lon,
                startTime: initialDate,
                endTime: endDate
            }))
            .then(response => response.json())
            // return Promise.resolve(mockResponse.body)
            .then(json => {
                const events = (json || []).map(event => ({
                    id: event.id,
                    name: event.name,
                    time: event.time,
                    latitude: Number(event.latlng.lat).toFixed(8),
                    longitude: Number(event.latlng.lng).toFixed(8),
                    assistants: event.assistants,
                    rating: event.avgRating,
                    source: event.source,
                    address: event.address,
                    url: event.url
                }));

                const totalAssistants = events.reduce((data, event) => (data + event.assistants), 0);
                const averageAssistants = Math.floor(totalAssistants / events.length);
                const desertLimit = 10;
                const averageLimit = Math.floor(1.2 * averageAssistants);
                const eventsWithTypes = events.map(event => ({
                    ...event,
                    type: getEventType(event, desertLimit, averageLimit)
                }));

                return Promise.resolve(eventsWithTypes);
            });
    }
}
