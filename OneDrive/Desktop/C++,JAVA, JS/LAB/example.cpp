#include<bits/stdc++.h>
using namespace std;

class Company {
    public:
    string employee, dept;
    int salary;
    Company();
    Company(int y);
    Company(string dept);
    ~Company();
    void print();
    
};



void Company::print(){
    cout<<"The name of the employee is "<<employee<<endl;
     cout<<"The salary of the employee is:"<<salary<<endl;
     cout<<"The name of the department is:"<<dept<<endl
}

int main(){

    Company s1;
    s1.employee = "Rohan";
    s1.salary = 23453;
    s1.dept = "Accounts";
    s1.print();
    
    return 0;
}