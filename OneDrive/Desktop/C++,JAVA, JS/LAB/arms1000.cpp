#include <iostream>
#include <cmath>
using namespace std;

bool isArmstrong(int num)
{
    int sum = 0, temp = num, remainder, digits = 0;

    while (temp != 0)
    {
        digits++;
        temp /= 10;
    }

    temp = num;
    while (temp != 0)
    {
        remainder = temp % 10;
        sum += pow(remainder, digits);
        temp /= 10;
    }

    return sum == num;
}

int main()
{
    cout << "Armstrong numbers between 1 and 1000 are: ";
    for (int i = 1; i <= 1000; i++)
    {
        if (isArmstrong(i))
        {
            cout << i << " ";
        }
    }
    return 0;
}
