#include <bits/stdc++.h>
using namespace std;

class Date {
public:
    int day;
    int month;
    int year;

    void display() const {
        cout << day << "." << month << "." << year << endl;
    }
};

class HospitalData {
public:
    string name;
    Date DOA;  
    string disease;
    Date DOD;  

    void input(const string &n, const Date &a, const string &d, const Date &b) {
        name = n;
        DOA = a;
        disease = d;
        DOD = b;
    }

    void display() const {
        cout << "Name : " << name << endl;
        cout << "Disease : " << disease << endl;
        cout << "Date of Admission : ";
        DOA.display();
        cout << "Date of Discharge : ";
        DOD.display();
    }
};

class NewDatabase : public HospitalData {
public:
    int age;

    void show_age() const {
        cout << "Age : " << age << endl;
    }
};

int main() {
    int n;
    cout << "Number of patients = ";
    cin >> n;

    vector<NewDatabase> arr(n);

    Date admission;
    Date discharge;
    string name;
    string disease;

    for (int i = 0; i < n; ++i) {
        cout << "Enter the name of patient " << i + 1 << ": " << endl;
        cin.ignore();  // Ignore the newline character left in the buffer
        getline(cin, name);

        cout << "Enter the date of admission (day month year) of patient " << i + 1 << ": " << endl;
        cin >> admission.day >> admission.month >> admission.year;

        cout << "Enter the disease of patient " << i + 1 << ": " << endl;
        cin.ignore();  
        getline(cin, disease);

        cout << "Enter the date of discharge (day month year) of patient " << i + 1 << ": " << endl;
        cin >> discharge.day >> discharge.month >> discharge.year;

        arr[i].input(name, admission, disease, discharge);

        cout << "Enter the age of patient " << i + 1 << ": " << endl;
        cin >> arr[i].age;
    }

    cout << "\nPeople having Pediatric disease and age under 12 are:\n";
    for (int i = 0; i < n; ++i) {
        if (arr[i].disease == "Pediatric" && arr[i].age < 12) {
            arr[i].display();
            arr[i].show_age();
        }
    }

    return 0;
}
