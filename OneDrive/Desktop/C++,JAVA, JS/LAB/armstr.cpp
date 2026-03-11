#include<iostream>
#include <cmath>
using namespace std;

int main(){
    int num,sum;
    sum = 0;
    cout << "Enter the number: ";
    cin >> num;
    while (num > 0) {
        sum += pow(num%10,3);
        num = num/10;
    }
    
    if (sum == num){
        cout << num<<" is an armstrong number";
    }
    else{
        cout << num<<" is not an armstrong number";
    }
}
