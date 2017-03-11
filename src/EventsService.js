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
        assistants: 20
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
