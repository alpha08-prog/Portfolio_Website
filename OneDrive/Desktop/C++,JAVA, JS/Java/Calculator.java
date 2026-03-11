package Java;
import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        double num1, num2;
        char operator;

        // Taking input from the user
        System.out.println("Enter first number: ");
        num1 = scanner.nextDouble();

        System.out.println("Enter an operator (+, -, *, /): ");
        operator = scanner.next().charAt(0);

        System.out.println("Enter second number: ");
        num2 = scanner.nextDouble();

        // Performing the operation based on the operator
        switch (operator) {
            case '+':
                System.out.println("Result: " + (num1 + num2));
                break;
            case '-':
                System.out.println("Result: " + (num1 - num2));
                break;
            case '*':
                System.out.println("Result: " + (num1 * num2));
                break;
            case '/':
                if (num2 != 0) {
                    System.out.println("Result: " + (num1 / num2));
                } else {
                    System.out.println("Error: Division by zero is not allowed.");
                }
                break;
            default:
                System.out.println("Invalid operator.");
                break;
        }

        scanner.close();
    }
}
