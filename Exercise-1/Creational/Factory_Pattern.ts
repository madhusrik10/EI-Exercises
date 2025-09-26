// Factory Pattern: Vehicle Factory

// Product Interface
interface Vehicle {
    drive(): void;
}

// Concrete Products
class Car implements Vehicle {
    drive(): void {
        console.log('Driving a car.');
    }
}

class Bike implements Vehicle {
    drive(): void {
        console.log('Riding a bike.');
    }
}

// Factory
class VehicleFactory {
    static createVehicle(type: string): Vehicle | null {
        switch (type) {
            case 'car':
                return new Car();
            case 'bike':
                return new Bike();
            default:
                console.log('Error: Unknown vehicle type.');
                return null;
        }
    }
}

// Client Code
const car = VehicleFactory.createVehicle('car');
car?.drive(); // Output: Driving a car.

const bike = VehicleFactory.createVehicle('bike');
bike?.drive(); // Output: Riding a bike.

// created a factory that creates different types of vehicles based on user input.
// The VehicleFactory class is responsible for creating instances of Vehicle products (Car and Bike). This pattern encapsulates the creation logic, allowing the client code to request objects without knowing the exact class of the product.
