// Decorator Pattern: Coffee Maker

// Component Interface
interface Coffee {
    getCost(): number;
    getDescription(): string;
}

// Concrete Component
class SimpleCoffee implements Coffee {
    getCost(): number {
        return 5;
    }

    getDescription(): string {
        return 'Simple coffee';
    }
}

// Decorator
class CoffeeDecorator implements Coffee {
    constructor(protected coffee: Coffee) {}

    getCost(): number {
        return this.coffee.getCost();
    }

    getDescription(): string {
        return this.coffee.getDescription();
    }
}

// Concrete Decorators
class MilkDecorator extends CoffeeDecorator {
    getCost(): number {
        return super.getCost() + 1;
    }

    getDescription(): string {
        return `${super.getDescription()}, Milk`;
    }
}

class SugarDecorator extends CoffeeDecorator {
    getCost(): number {
        return super.getCost() + 0.5;
    }

    getDescription(): string {
        return `${super.getDescription()}, Sugar`;
    }
}

// Client Code
let coffee: Coffee = new SimpleCoffee();
console.log(`${coffee.getDescription()} costs $${coffee.getCost()}`); // Output: Simple coffee costs $5

coffee = new MilkDecorator(coffee);
console.log(`${coffee.getDescription()} costs $${coffee.getCost()}`); // Output: Simple coffee, Milk costs $6

coffee = new SugarDecorator(coffee);
console.log(`${coffee.getDescription()} costs $${coffee.getCost()}`); // Output: Simple coffee, Milk, Sugar costs $6.5

// created a decorator that adds additional behavior to a coffee-making process.
// The Coffee interface defines the basic methods getCost and getDescription.
// The SimpleCoffee class implements the Coffee interface as a simple coffee without any additives.
// The CoffeeDecorator class implements the Coffee interface and is used as a base class for concrete decorators.
// The MilkDecorator and SugarDecorator classes extend the CoffeeDecorator class to add additional behavior to the getCost and getDescription methods.
