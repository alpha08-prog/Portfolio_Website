#include <bits/stdc++.h>
using namespace std;

class Tollbooth
{
public:
    unsigned int total_cars;
    double money_collected;

    Tollbooth()
    {
        this->money_collected = 0;
        this->total_cars = 0;
    }

    void PayingVehicles()
    {
        total_cars++;
        money_collected += 50.0;
    }

    void NonPayingVehicles()
    {
        total_cars++;
    }
    void DisplayCashCollected()
    {
        cout << "Total no. of vehicles passed: " << total_cars << endl;
        cout << "Total cash collected: " << money_collected << endl;
    }
};

int main()
{

    Tollbooth t;
    int choice;
    while (true)
    {
        cout << "Enter 0 for paying vehicle, 1 for non-paying vehicle, 2 to exit:" << endl;
        cin >> choice;

        if (choice == 0)
        {
            t.PayingVehicles();
        }
        else if (choice == 1)
        {
            t.NonPayingVehicles();
        }
        else if (choice == 2)
        {
            break;
        }
        else
        {
            cout << "Invalid choice." << endl;
        }
    }
    t.DisplayCashCollected();

    return 0;
}