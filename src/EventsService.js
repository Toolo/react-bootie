const mockEvents = [{}];

export default class EventsService {
    getEvents(date) {
        return Promise.resolve(mockEvents);
    }
}
