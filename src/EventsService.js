const mockEvents = [{}];

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
