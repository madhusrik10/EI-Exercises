// Observer Pattern: News Notification System

// Observer Interface
interface Subscriber {
    update(news: string): void;
}

// Subject Class
class NewsAgency {
    private subscribers: Subscriber[] = [];

    subscribe(subscriber: Subscriber): void {
        this.subscribers.push(subscriber);
    }

    unsubscribe(subscriber: Subscriber): void {
        this.subscribers = this.subscribers.filter(sub => sub !== subscriber);
    }

    notify(news: string): void {
        for (const subscriber of this.subscribers) {
            subscriber.update(news);
        }
    }
}

// Concrete Observer
class UserSubscriber implements Subscriber {
    constructor(private name: string) {}

    update(news: string): void {
        console.log(`${this.name} received news: ${news}`);
    }
}

// Client Code
const newsAgency = new NewsAgency();
const user1 = new UserSubscriber('Alice');
const user2 = new UserSubscriber('Bob');

newsAgency.subscribe(user1);
newsAgency.subscribe(user2);

newsAgency.notify('Breaking News: New TypeScript Version Released!');

newsAgency.unsubscribe(user1);

newsAgency.notify('Update: TypeScript 5.1 Released!');

//created a simple notification system where subscribers can receive updates from a news agency.
// The NewsAgency class is the Subject that maintains a list of Observers (subscribers) and notifies them of any updates.
// The UserSubscriber class implements the Observer interface, receiving updates from the Subject.