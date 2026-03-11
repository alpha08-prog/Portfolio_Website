#include<bits/stdc++.h>
using namespace std;

class Account{
    string accountNumber;
    string holderName;
    double balance;

    public:
    Account(){

    }

    Account(string accNum,string Name,double bal){
        this->accountNumber=accNum;
        this->holderName=Name;
        this->balance=bal;
    }

    void deposit(double amount){
        balance= balance+5000;
    }

    void withdraw(double amount){
        balance=balance - 4000;
    }

    double getbalance(){
        return balance;
    }

    void displayAccountInfo(){
        cout<<"Account Number is: "<<accountNumber<<endl;
        cout<<"Account Holder Name is: "<<holderName<<endl;
        cout<<"Balance left : "<<balance<<endl;
    }
};

int main(){
    Account A1;
    Account A2("423729123", "Rohan", 393825.33);

    A2.withdraw(31000);
    A2.deposit(100000);

    cout << "A1 :" << endl;
    A1.displayAccountInfo();

    cout << "A2 :" << endl;
    A2.displayAccountInfo();
    return 0;
}