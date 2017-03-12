import moment from 'moment';

const mockEvents = [
    {
        id: 1,
        name: 'Reactathon 2017',
        latitude: 37.7821151,
        longitude: -122.3915132,
        startDateTime: moment('2017-03-11 09:00:00').format('x'),
        endDateTime: moment('2017-03-12 21:00:00').format('x'),
        url: 'https://react-bootie.com',
        assistants: 20,
        type: 'busy'
    },
    {
        id: 2,
        name: 'St Patricks Day parade',
        latitude: 37.767997,
        longitude: -122.3921315,
        startDateTime: moment('2017-03-11 13:00:00').format('x'),
        endDateTime: moment('2017-03-11 18:00:00').format('x'),
        url: 'https://react-bootie.com',
        assistants: 50,
        type: 'desert'
    },
    {
        id: 3,
        name: 'Bay to breakers',
        latitude: 37.7794921,
        longitude: -122.5036183,
        startDateTime: moment('2017-04-11 09:00:00').format('x'),
        endDateTime: moment('2017-04-11 21:00:00').format('x'),
        url: 'https://react-bootie.com',
        assistants: 1,
        type: 'average'
    },
    {
        id: 4,
        name: 'Bootie',
        latitude: 37.7601465,
        longitude: -122.4315568,
        startDateTime: moment('2017-03-11 21:00:00').format('x'),
        endDateTime: moment('2017-03-12 05:00:00').format('x'),
        url: 'https://react-bootie.com',
        assistants: 2,
        type: 'busy'
    }
];

export default class EventsService {
    getEvents({
        initialDate,
        endDate,
        mapCenterX,
        mapCenterY
    }) {
        console.log(initialDate, endDate);
        return Promise.resolve(mockEvents);
    }
}
