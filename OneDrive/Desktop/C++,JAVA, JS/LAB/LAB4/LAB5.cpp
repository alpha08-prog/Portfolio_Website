#include<bits/stdc++.h>
using namespace std;

class Theater
{
public:
    string choose[3] = {"Platinum", "Gold", "Silver"};
    int amount[3] = {200, 150, 120};   
    int seats[3] = {20, 30, 50};        
    static int remaining[3]; 
};

int Theater::remaining[3] = {20, 30, 50};

class User : public Theater
{
public:
    int i;
    int num;
    char stopping;
    
    void book()
    {
        do
        {
            cout << "Enter the type of the seat (0 for Platinum, 1 for Gold, 2 for Silver): ";
            cin >> i;
            if (i < 0 || i > 2)
            {
                cout << "Invalid option! Please select a valid seat type." << endl;
                continue;
            }

            cout << "Remaining seats in that type: " << remaining[i] << endl;
            cout << "Amount per seat: " << amount[i] << endl;

            cout << "Enter the number of seats to book: ";
            cin >> num;

            if (num > remaining[i])
            {
                cout << "No sufficient seats available, please check remaining seats." << endl;
            }
            else
            {
                remaining[i] -= num;
                cout << "Your tickets have been booked. Total cost: Rs. " << num * amount[i] << endl;
            }

            cout << "Do you wish to continue booking (Y/N)? ";
            cin >> stopping;
        } 
        while (stopping == 'Y' || stopping == 'y');
    }

    void check()
    {
        cout << "Enter the type of the seat to check the number of seats(0 for Platinum, 1 for Gold, 2 for Silver): ";
        cin >> i;

        if (i < 0 || i > 2)
        {
            cout << "Invalid option! Please select a valid seat type." << endl;
            return;
        }

        cout << "Remaining seats in that type: " << remaining[i] << endl;
        cout << "No. of seats booked: " << seats[i] - remaining[i] << endl;
    }
};

int main()
{
    User a;
    User b;
    cout<<"User A check for tickets"<<endl;
    a.check();  
    a.book();
    cout<<"User B checks for tickets"<<endl;
    b.check();  
    b.book();
    return 0;
}
