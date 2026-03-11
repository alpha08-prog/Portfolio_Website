#include <bits/stdc++.h>
using namespace std;

string decimalToBinary(int decimal)
{
    string binary;
    if (decimal == 0)
        return "0";
    while (decimal > 0)
    {
        binary += (decimal % 2) ? '1' : '0';
        decimal /= 2;
    }
    reverse(binary.begin(), binary.end());
    return binary;
}

int main()
{
    int decimal;
    cout << "Enter a decimal number: ";
    cin >> decimal;

    string binary = decimalToBinary(decimal);
    cout << "Binary representation: " << binary << std::endl;

    return 0;
}