#include <bits/stdc++.h>
using namespace std;

int main() 
{
    int n;
    cout << "Enter the number = ";
    cin >> n;

    vector<int> binary;

    while (n > 0) {
        binary.push_back(n % 2);
        n = n / 2;
    }

    for (int i = 0; i < binary.size(); ++i) 
    {
        binary[i] = 1 - binary[i];
    }
    reverse(binary.begin(), binary.end());

    cout << "One's complement: ";
    for (int bit : binary) 
    {
        cout << bit;
    }
    cout << endl;

   
    int ones_complement_number = 0;
    int base = 1;  

    for (int i = binary.size() - 1; i >= 0; --i) 
    {
        ones_complement_number += binary[i] * base;
        base *= 2;
    }

    cout << "Decimal number after one's complement: " << ones_complement_number << endl;

    return 0;
}