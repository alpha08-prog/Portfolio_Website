#include <iostream>
using namespace std;

int main()
{
    int num1, num2;
    cout << "Enter two numbers: ";
    cin >> num1 >> num2;

    if (num2 == 0)
    {
        cout << "division by zero is not allowed.";
    }
    else if (num1 % num2 == 0)
    {
        cout << num1 << " is divisible by " << num2;
    }
    else
    {
        cout << num1 << " is not divisible by " << num2;
    }

    return 0;
}