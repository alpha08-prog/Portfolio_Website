#include<bits/stdc++.h>
using namespace std;

class Bus{
    public:
    string types[3] = {"Local", "Express", "Luxury"}; 
    int prices[3] = {50, 100, 150};                   
    int seats[3] = {40, 30, 20};
    static int rem[3];                                
};

int Bus::rem[3] = {40, 30, 20};  // Initialize remaining seats

class user : public Bus {
    public:
    int i;      
    int num;    
    char stop; 

  
    void book(){
        do {
            cout << "Enter the type of seat to be booked (0 for Local, 1 for Express, 2 for Luxury): ";
            cin >> i;

            
            if (i < 0 || i > 2) {
                cout << "Invalid option!! Select the right one." << endl;
                continue;
            }

           
            cout << "Remaining seats available in the " << types[i] << " bus: " << rem[i] << endl;
            cout << "Amount per seat is: Rs. " << prices[i] << endl;

           
            cout << "Enter the number of seats to be booked: ";
            cin >> num;

          
            if (num > rem[i]) {
                cout << "Sufficient seats not available. Please choose fewer seats or a different type." << endl;
            } else {
                rem[i] -= num;  
                cout << "Your tickets have been booked. Total cost: Rs. " << num * prices[i] << endl;
            }

            
            cout << "Do you wish to continue booking (Y/N)? ";
            cin >> stop;
        } 
        while (stop == 'Y' || stop == 'y');
    }

    // Function to check remaining seats for each bus type
    void check() {
        cout << "Enter the type of the seat to check (0 for Local, 1 for Express, 2 for Luxury): ";
        cin >> i;

        // Check for valid input (0, 1, or 2)
        if (i < 0 || i > 2) {
            cout << "Invalid option! Please select a valid seat type." << endl;
            return;
        }

        // Display remaining and booked seats for the selected bus type
        cout << "Remaining seats in the " << types[i] << " bus: " << rem[i] << endl;
        cout << "No. of seats booked: " << seats[i] - rem[i] << endl;
    }
};

int main() {
    user a, b;

    // First user checks seats
    cout << "User A checking the seats: " << endl;
    a.check();

    // First user books seats
    a.book();

    // Second user checks seats after first user's booking
    cout << "User B checking the seats: " << endl;
    b.check();

    // Second user books seats
    b.book();

    return 0;
}
