// Strategy Pattern: Payment System

// Strategy Interface
interface PaymentStrategy {
    pay(amount: number): void;
}

// Concrete Strategies
class CreditCardPayment implements PaymentStrategy {
    pay(amount: number): void {
        console.log(`Paid $${amount} using Credit Card.`);
    }
}

class PayPalPayment implements PaymentStrategy {
    pay(amount: number): void {
        console.log(`Paid $${amount} using PayPal.`);
    }
}

// Context
class PaymentProcessor {
    constructor(private strategy: PaymentStrategy) {}

    setStrategy(strategy: PaymentStrategy): void {
        this.strategy = strategy;
    }

    executePayment(amount: number): void {
        this.strategy.pay(amount);
    }
}

// Client Code
const paymentProcessor = new PaymentProcessor(new CreditCardPayment());
paymentProcessor.executePayment(100);

paymentProcessor.setStrategy(new PayPalPayment());
paymentProcessor.executePayment(200);

// created a payment system where different payment methods can be used interchangeably without altering the client code.
// The PaymentStrategy interface defines a common interface for all supported algorithms (payment methods).
// CreditCardPayment and PayPalPayment are concrete implementations of the strategy interface.
// The PaymentProcessor class is the Context that maintains a reference to the current strategy and allows switching between different strategies